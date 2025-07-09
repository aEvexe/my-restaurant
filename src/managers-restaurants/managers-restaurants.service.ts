import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateManagersRestaurantDto } from './dto/create-managers-restaurant.dto';
import { UpdateManagersRestaurantDto } from './dto/update-managers-restaurant.dto';
import { ManagersRestaurants } from './models/managers-restaurant.model';
import { UserRole } from '../user-role/models/user-role.model';
import { Role } from '../roles/models/role.model';
import { Op } from 'sequelize';
import { User } from '../users/models/user.model';

@Injectable()
export class ManagersRestaurantsService {
  constructor(
    @InjectModel(ManagersRestaurants)
    private readonly managersRestaurantsModel: typeof ManagersRestaurants,

    @InjectModel(UserRole)
    private readonly userRoleModel: typeof UserRole,

    @InjectModel(User)
  private readonly userModel: typeof User,
  ) {}

  async isUserManager(userId: number): Promise<boolean> {
  const user = await this.userModel.findByPk(userId);
  if (!user) return false;

  const roles = await user.$get('roles'); // relies on User -> Role many-to-many association

  console.log('User roles:', roles.map(r => r.name)); // helpful debug

  return roles.some(role => role.name === 'manager');
}

  async create(dto: CreateManagersRestaurantDto) {
    const isManager = await this.isUserManager(dto.userId);
    if (!isManager) {
      throw new ForbiddenException('Only users with manager role can be assigned as managers');
    }

    const exists = await this.managersRestaurantsModel.findOne({
      where: { restaurantId: dto.restaurantId },
    });

    if (exists) {
      throw new ConflictException('This restaurant already has a manager assigned');
    }

    return await this.managersRestaurantsModel.create(dto);
  }

  async findAll() {
    return this.managersRestaurantsModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const assignment = await this.managersRestaurantsModel.findByPk(id, {
      include: { all: true },
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }

    return assignment;
  }

  async update(id: number, dto: UpdateManagersRestaurantDto) {
    const isManager = await this.isUserManager(dto.userId!);
    if (!isManager) {
      throw new ForbiddenException('Only users with manager role can be assigned as managers');
    }

    const existing = await this.managersRestaurantsModel.findOne({
      where: {
        restaurantId: dto.restaurantId,
        id: { [Op.ne]: id },
      },
    });

    if (existing) {
      throw new ConflictException('This restaurant already has a manager assigned');
    }

    const assignment = await this.findOne(id);
    return await assignment.update(dto);
  }

  async remove(id: number) {
    const deleted = await this.managersRestaurantsModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }

    return { message: `Assignment #${id} deleted successfully` };
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorites } from './models/favorite.model';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/role.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites)
    private readonly favoriteModel: typeof Favorites,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  private async assertUserIsCustomer(userId: number): Promise<void> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const roles = await user.$get('roles');
    const isCustomer = roles.some((role: Role) => role.name === 'customer');

    if (!isCustomer) {
      throw new ForbiddenException(
        'Only users with customer role can manage favorites',
      );
    }
  }

  async create(createDto: CreateFavoriteDto) {
    await this.assertUserIsCustomer(createDto.userId);
    return this.favoriteModel.create(createDto);
  }

  async findAll() {
    return this.favoriteModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const favorite = await this.favoriteModel.findByPk(id);
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }
    return favorite;
  }

  async update(id: number, updateDto: UpdateFavoriteDto) {
    const favorite = await this.favoriteModel.findByPk(id);
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    await this.assertUserIsCustomer(favorite.userId);
    return await favorite.update(updateDto);
  }

  async remove(id: number) {
    const deleted = await this.favoriteModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    return { message: `Favorite #${id} deleted successfully` };
  }
}

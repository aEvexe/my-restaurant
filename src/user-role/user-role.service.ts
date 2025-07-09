import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './models/user-role.model';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../roles/models/role.model';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(UserRole) private readonly userRoleModel: typeof UserRole,
    @InjectModel(Role) private readonly roleModel: typeof Role
  ) {}


async create(createUserRoleDto: CreateUserRoleDto) {
  const { userId, roleId } = createUserRoleDto;
  const exists = await this.userRoleModel.findOne({
    where: { userId, roleId },
  });

  if (exists) {
    throw new BadRequestException("User already has this role");
  }

  const role = await this.roleModel.findByPk(roleId);
  if (!role) {
    throw new BadRequestException("Role not found");
  }

  if (role.name.toLowerCase() === "superadmin") {
    const superAdminExists = await this.userRoleModel.findOne({
      where: { roleId }, 
    });

    if (superAdminExists) {
      throw new BadRequestException("Superadmin already exists");
    }
  }

  return this.userRoleModel.create({ userId, roleId });
}


  // Get all user-role records
  async findAll() {
    return this.userRoleModel.findAll();
  }

  // Find one user-role relation
  async findOne(id: number) {
  return await this.userRoleModel.findOne({
    where: { id },
  });
}

  // Update a user-role relation
  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const userRole = await this.userRoleModel.findByPk(id);
    if (!userRole) throw new NotFoundException('UserRole not found');

    return userRole.update(updateUserRoleDto);
  }

  // Delete a user-role relation
  async remove(id: number) {
    const deleted = await this.userRoleModel.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException('UserRole not found');
    return { message: 'UserRole deleted' };
  }
}

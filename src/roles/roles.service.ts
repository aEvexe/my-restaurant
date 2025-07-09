import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly roleModel: typeof Role,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existing = await this.roleModel.findOne({ where: { name: createRoleDto.name } });
    if (existing) {
      throw new BadRequestException('Role already exists');
    }

    return this.roleModel.create(createRoleDto);
  }

  async findAll() {
    return this.roleModel.findAll();
  }

  async findOne(id: number) {
    const role = await this.roleModel.findByPk(id);
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel.findByPk(id);
    if (!role) throw new NotFoundException('Role not found');

    return role.update(updateRoleDto);
  }

  async remove(id: number) {
    const role = await this.roleModel.findByPk(id);
    if (!role) throw new NotFoundException('Role not found');

    await role.destroy();
    return { message: 'Role deleted successfully' };
  }
}

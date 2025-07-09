import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menus } from './models/menu.model';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectModel(Menus)
    private readonly menuModel: typeof Menus,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    return this.menuModel.create(createMenuDto);
  }

  async findAll() {
    return this.menuModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const menu = await this.menuModel.findByPk(id);
    if (!menu) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const [affectedCount, [updatedMenu]] = await this.menuModel.update(updateMenuDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return updatedMenu;
  }

  async remove(id: number) {
    const deleted = await this.menuModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return { message: `Menu item #${id} deleted successfully` };
  }
}

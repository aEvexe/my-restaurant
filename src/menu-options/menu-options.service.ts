import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMenuOptionDto } from './dto/create-menu-option.dto';
import { UpdateMenuOptionDto } from './dto/update-menu-option.dto';
import { MenuOptions } from './models/menu-option.model';

@Injectable()
export class MenuOptionsService {
  constructor(
    @InjectModel(MenuOptions)
    private readonly menuOptionModel: typeof MenuOptions,
  ) {}

  async create(createDto: CreateMenuOptionDto) {
    return this.menuOptionModel.create(createDto);
  }

  async findAll() {
    return this.menuOptionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const option = await this.menuOptionModel.findByPk(id);
    if (!option) {
      throw new NotFoundException(`Menu option with ID ${id} not found`);
    }
    return option;
  }

  async update(id: number, updateDto: UpdateMenuOptionDto) {
    const [affected, [updated]] = await this.menuOptionModel.update(updateDto, {
      where: { id },
      returning: true,
    });

    if (affected === 0) {
      throw new NotFoundException(`Menu option with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.menuOptionModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Menu option with ID ${id} not found`);
    }

    return { message: `Menu option #${id} deleted successfully` };
  }
}

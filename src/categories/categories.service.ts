import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories)
    private readonly categoryModel: typeof Categories,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async findAll() {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const [affectedCount, [updatedCategory]] = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return updatedCategory;
  }

  async remove(id: number) {
    const deleted = await this.categoryModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return { message: `Category #${id} deleted successfully` };
  }
}

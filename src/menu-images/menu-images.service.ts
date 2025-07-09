import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMenuImageDto } from './dto/create-menu-image.dto';
import { UpdateMenuImageDto } from './dto/update-menu-image.dto';
import { MenuImages } from './models/menu-image.entity';

@Injectable()
export class MenuImagesService {
  constructor(
    @InjectModel(MenuImages)
    private readonly menuImageModel: typeof MenuImages,
  ) {}

  async create(createMenuImageDto: CreateMenuImageDto) {
    return this.menuImageModel.create(createMenuImageDto);
  }

  async findAll() {
    return this.menuImageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const image = await this.menuImageModel.findByPk(id);
    if (!image) {
      throw new NotFoundException(`Menu image with ID ${id} not found`);
    }
    return image;
  }

  async update(id: number, updateDto: UpdateMenuImageDto) {
    const [affected, [updated]] = await this.menuImageModel.update(updateDto, {
      where: { id },
      returning: true,
    });

    if (affected === 0) {
      throw new NotFoundException(`Menu image with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.menuImageModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Menu image with ID ${id} not found`);
    }

    return { message: `Menu image #${id} deleted successfully` };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurants } from './models/restaurant.model';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurants)
    private readonly restaurantModel: typeof Restaurants,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantModel.create(createRestaurantDto);
  }

  async findAll() {
    return this.restaurantModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const restaurant = await this.restaurantModel.findByPk(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const [affectedCount, [updatedRestaurant]] = await this.restaurantModel.update(updateRestaurantDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    return updatedRestaurant;
  }

  async remove(id: number) {
    const deleted = await this.restaurantModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    return { message: `Restaurant #${id} deleted successfully` };
  }
}

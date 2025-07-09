// categories.model.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Restaurants } from '../../restaurants/models/restaurant.model';

interface ICategoriesCreationAttr {
  restaurantId: number;
  name: string;
}

@Table({ tableName: 'categories', timestamps: true })
export class Categories extends Model<Categories, ICategoriesCreationAttr> {
  @ApiProperty({ example: 1, description: 'Category ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 1, description: 'Restaurant ID this category belongs to' })
  @ForeignKey(() => Restaurants)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @ApiProperty({ example: 'Main Dishes', description: 'Category name' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @BelongsTo(() => Restaurants)
  restaurant: Restaurants;
}

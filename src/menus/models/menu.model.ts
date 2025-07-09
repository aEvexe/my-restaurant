import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Restaurants } from '../../restaurants/models/restaurant.model';
import { Categories } from '../../categories/models/category.model';
import { MenuImages } from '../../menu-images/models/menu-image.entity';
import { MenuOptions } from '../../menu-options/models/menu-option.model';
import { User } from '../../users/models/user.model';
import { Favorites } from '../../favorites/models/favorite.model';

interface IMenusCreationAttr {
  restaurantId: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

@Table({ tableName: 'menus', timestamps: true })
export class Menus extends Model<Menus, IMenusCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID of the menu item' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 1, description: 'Restaurant ID this menu item belongs to' })
  @ForeignKey(() => Restaurants)
  @Column({ type: DataType.INTEGER })
  declare restaurantId: number;

  @BelongsTo(() => Restaurants)
  restaurant: Restaurants;

  @ApiProperty({ example: 2, description: 'Category ID of this menu item' })
  @ForeignKey(() => Categories)
  @Column({ type: DataType.INTEGER })
  declare categoryId: number;

  @BelongsTo(() => Categories)
  category: Categories;

  @ApiProperty({ example: 'Cheeseburger', description: 'Name of the menu item' })
  @Column({ type: DataType.STRING})
  declare name: string;

  @ApiProperty({ example: 'Juicy grilled cheeseburger with fries', description: 'Menu item description' })
  @Column({ type: DataType.STRING})
  declare description: string;

  @ApiProperty({ example: 45000, description: 'Price of the menu item (in UZS)' })
  @Column({ type: DataType.INTEGER })
  declare price: number;

  @ApiProperty({ example: 'available', description: 'Availability status (e.g., available, out of stock)' })
  @Column({ type: DataType.BOOLEAN})
  declare available: boolean;

  @HasMany(() => MenuImages)
  menu_images: MenuImages[];

  @HasMany(() => MenuOptions)
  menu_options: MenuOptions[];

  @BelongsToMany(() => User, () => Favorites)
  favoritedBy: User[];
}

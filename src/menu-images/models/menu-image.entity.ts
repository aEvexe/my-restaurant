import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Menus } from '../../menus/models/menu.model';

interface IMenuImagesCreationAttr {
  menuId: number;
  image_url: string;
}

@Table({ tableName: 'menu_images', timestamps: true })
export class MenuImages extends Model<MenuImages, IMenuImagesCreationAttr> {
  @ApiProperty({ example: 1, description: 'Menu image ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 5, description: 'ID of the menu this image belongs to' })
  @ForeignKey(() => Menus)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare menuId: number;

  @BelongsTo(() => Menus)
  menu: Menus;

  @ApiProperty({
    example: 'https://example.com/images/cheeseburger.png',
    description: 'URL of the menu item image',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare image_url: string;
}

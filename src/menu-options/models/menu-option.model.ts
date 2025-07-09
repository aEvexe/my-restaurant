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

interface IMenuOptionsCreationAttr {
  menuId: number;
  name: string;
  extra_price: number;
}

@Table({ tableName: 'menu_options', timestamps: true })
export class MenuOptions extends Model<MenuOptions, IMenuOptionsCreationAttr> {
  @ApiProperty({ example: 1, description: 'Menu option ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 5, description: 'ID of the menu this option belongs to' })
  @ForeignKey(() => Menus)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare menuId: number;

  @BelongsTo(() => Menus)
  menu: Menus;

  @ApiProperty({
    example: 'Extra cheese',
    description: 'Name of the menu option (e.g. Extra cheese, No onion)',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({ example: 5000, description: 'Extra price for this option (in UZS)' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare extra_price: number;
}

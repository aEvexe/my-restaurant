import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Menus } from '../../menus/models/menu.model';

interface IFavoritesCreationAttr {
  userId: number;
  menuId: number;
}

@Table({ tableName: 'favorites', timestamps: true })
export class Favorites extends Model<Favorites, IFavoritesCreationAttr> {
  @ApiProperty({ example: 1, description: 'Favorite ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 4, description: 'User ID who added this to favorites' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 12, description: 'Menu item ID that was favorited' })
  @ForeignKey(() => Menus)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare menuId: number;

  @BelongsTo(() => Menus)
  menu: Menus;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Restaurants } from 'src/restaurants/models/restaurant.model';

interface IManagersRestaurantsCreationAttr {
  userId: number;
  restaurantId: number;
  assigned_at: string;
}

@Table({ tableName: 'managers_restaurants', timestamps: true })
export class ManagersRestaurants extends Model<ManagersRestaurants, IManagersRestaurantsCreationAttr> {
  @ApiProperty({ example: 1, description: 'Assignment ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 4, description: 'User ID of the manager' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 2, description: 'Restaurant ID being managed' })
  @ForeignKey(() => Restaurants)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurants)
  restaurant: Restaurants;

  @ApiProperty({
    example: '2025-07-08T15:00:00Z',
    description: 'Timestamp when the manager was assigned',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  declare assigned_at: string;
}

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
import { User } from '../../users/models/user.model';

interface IReviewsCreationAttr {
  userId: number;
  restaurantId: number;
  rating: string;
  comment: string;
}

@Table({ tableName: 'reviews', timestamps: true })
export class Reviews extends Model<Reviews, IReviewsCreationAttr> {
  @ApiProperty({ example: 1, description: 'Review ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 4, description: 'User ID who wrote the review' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 1, description: 'Restaurant ID being reviewed' })
  @ForeignKey(() => Restaurants)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurants)
  restaurant: Restaurants;

  @ApiProperty({ example: '5', description: 'Rating given to the restaurant (1–5)' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare rating: string;

  @ApiProperty({
    example: 'Great food, fast service!',
    description: 'User comment about the restaurant',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare comment: string;
}

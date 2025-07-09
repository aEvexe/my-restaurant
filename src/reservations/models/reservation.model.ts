import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Tables } from '../../tables/models/table.model';
import { User } from '../../users/models/user.model';
import { Payments } from '../../payments/models/payment.entity';

interface IReservationsCreationAttr {
  userId: number;
  tableId: number;
  date: string;
  time: string;
  guests: number;
  status: string;
}

@Table({ tableName: 'reservations', timestamps: true })
export class Reservations extends Model<Reservations, IReservationsCreationAttr> {
  @ApiProperty({ example: 1, description: 'Reservation ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 4, description: 'User ID who made the reservation' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 2, description: 'Table ID reserved' })
  @ForeignKey(() => Tables)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare tableId: number;

  @BelongsTo(() => Tables)
  table: Tables;

  @ApiProperty({ example: '2025-08-20', description: 'Reservation date (YYYY-MM-DD)' })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare date: string;

  @ApiProperty({ example: '19:30', description: 'Reservation time (HH:mm)' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare time: string;

  @ApiProperty({ example: 4, description: 'Number of guests' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare guests: number;

  @ApiProperty({ example: 'confirmed', description: 'Reservation status (pending, confirmed, cancelled)' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;

  @HasMany(() => Payments)
  payments: Payments[];
}

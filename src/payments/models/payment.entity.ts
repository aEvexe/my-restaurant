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
import { Reservations } from '../../reservations/models/reservation.model';

interface IPaymentsCreationAttr {
  userId: number;
  reservationId: number;
  amount: number;
  method: string;
  status: string;
  paid_at: string;
}

@Table({ tableName: 'payments', timestamps: true })
export class Payments extends Model<Payments, IPaymentsCreationAttr> {
  @ApiProperty({ example: 1, description: 'Payment ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 3, description: 'User who made the payment' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 5, description: 'Reservation this payment is for' })
  @ForeignKey(() => Reservations)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare reservationId: number;

  @BelongsTo(() => Reservations)
  reservation: Reservations;

  @ApiProperty({ example: 120000, description: 'Total amount paid (UZS)' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare amount: number;

  @ApiProperty({ example: 'card', enum: ['cash', 'card'], description: 'Payment method' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare method: string;

  @ApiProperty({ example: 'paid', enum: ['pending', 'paid'], description: 'Payment status' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;

  @ApiProperty({ example: '2025-07-08T18:30:00Z', description: 'Date/time when payment was made' })
  @Column({ type: DataType.DATE, allowNull: false })
  declare paid_at: string;
}

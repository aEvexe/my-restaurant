import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model } from "sequelize-typescript";
import { Table } from 'sequelize-typescript'
import { User } from "src/users/models/user.model";

interface INotificationsCreationAttr{
    userId: number
    message: string
    type: string
    sent_at: Date
    status: string
}

@Table({ tableName: "notifications", timestamps: true })
export class Notifications extends Model<Notifications, INotificationsCreationAttr> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare userId: number;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: "Welcome to the platform!" })
  @Column({ type: DataType.STRING })
  declare message: string;

  @ApiProperty({ example: "INFO" })
  @Column({ type: DataType.STRING })
  declare type: string;

  @ApiProperty({ example: "2025-07-07T15:30:00Z" })
  @Column({ type: DataType.DATE })
  declare sent_at: Date;

  @ApiProperty({ example: "SENT" })
  @Column({ type: DataType.STRING })
  declare status: string;
}

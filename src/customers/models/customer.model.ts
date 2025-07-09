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

interface ICustomersCreationAttr {
  userId: number;
  birth_date: string;
  gender: string;
}

@Table({ tableName: 'customers', timestamps: true })
export class Customers extends Model<Customers, ICustomersCreationAttr> {
  @ApiProperty({ example: 1, description: 'Customer ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 4, description: 'User ID linked to the customer' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: '2007-05-14', description: 'Birth date of the customer' })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare birth_date: string;

  @ApiProperty({ example: 'male', description: 'Gender of the customer' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare gender: string;
}

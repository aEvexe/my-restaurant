import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Restaurants } from "../../restaurants/models/restaurant.model";
import { Reservations } from "../../reservations/models/reservation.model";

interface ITablesCreationAttr {
  restaurantId: number;
  number: number;
  capacity: number;
  status: "available" | "reserved" | "occupied";
}

@Table({ tableName: "tables", timestamps: true })
export class Tables extends Model<Tables, ITablesCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID of the table" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 1, description: "Restaurant ID this table belongs to" })
  @ForeignKey(() => Restaurants)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurants)
  restaurant: Restaurants;

  @ApiProperty({ example: 4, description: "Table number" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare number: number;

  @ApiProperty({ example: 6, description: "Capacity of the table (number of people)" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare capacity: number;

  @ApiProperty({
    example: "available",
    description: "Status of the table (available, reserved, occupied)",
    enum: ["available", "reserved", "occupied"],
  })
  @Column({
    type: DataType.ENUM("available", "reserved", "occupied"),
    allowNull: false,
    defaultValue: "available",
  })
  declare status: "available" | "reserved" | "occupied";

  @HasMany(() => Reservations)
  reservations: Reservations[];
}

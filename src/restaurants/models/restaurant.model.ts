import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Tables } from "../../tables/models/table.model";
import { Categories } from "../../categories/models/category.model";
import { Menus } from "../../menus/models/menu.model";
import { Reviews } from "../../reviews/models/review.model";
import { ManagersRestaurants } from "../../managers-restaurants/models/managers-restaurant.model";
import { User } from "../../users/models/user.model";

interface IRestaurantsCreationAttr {
  name: string;
  address: string;
  phone: string;
  description: string;
}

@Table({ tableName: "restaurants", timestamps: true })
export class Restaurants extends Model<Restaurants, IRestaurantsCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID of the restaurant" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "Oqtepa Lavash",
    description: "Name of the restaurant",
  })
  @Column({ type: DataType.STRING })
  declare name: string;

  @ApiProperty({
    example: "Tashkent, Chilonzor 19",
    description: "Restaurant address",
  })
  @Column({ type: DataType.STRING })
  declare address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Phone number of the restaurant",
  })
  @Column({ type: DataType.STRING })
  declare phone: string;

  @ApiProperty({
    example: "Family-friendly fast food chain",
    description: "Description of the restaurant",
  })
  @Column({ type: DataType.STRING })
  declare description: string;

  @HasMany(() => Tables)
  tables: Tables[];

  @HasMany(() => Categories)
  categories: Categories[];

  @HasMany(() => Menus)
  menus: Menus[];

  @HasMany(() => Reviews)
  reviews: Reviews[];

  @BelongsToMany(() => User, () => ManagersRestaurants)
  managers: User[];
}

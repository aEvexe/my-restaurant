import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Role } from "../../roles/models/role.model";
import { UserRole } from "../../user-role/models/user-role.model";
import { Reviews } from "../../reviews/models/review.model";
import { Menus } from "../../menus/models/menu.model";
import { Favorites } from "../../favorites/models/favorite.model";
import { Customers } from "../../customers/models/customer.model";
import { Reservations } from "../../reservations/models/reservation.model";
import { Payments } from "../../payments/models/payment.entity";
import { ManagersRestaurants } from "../../managers-restaurants/models/managers-restaurant.model";
import { Restaurants } from "../../restaurants/models/restaurant.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  is_active?: boolean;
}

@Table({ tableName: "user", timestamps: false })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({ example: 1, description: "User ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({ example: "john@example.com", description: "Email address" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({ example: "StrongPass!123", description: "Password" })
  @Column({ type: DataType.STRING })
  declare password: string;

  @ApiProperty({ example: "+998901234567", description: "Phone number" })
  @Column({ type: DataType.STRING })
  declare phone: string;

  @ApiProperty({ example: true, description: "Is active user" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({ example: "uuid-1234-5678", description: "Activation link" })
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link: string;

  @ApiProperty({ example: "token...", description: "Refresh token" })
  @Column({ type: DataType.STRING(2000) })
  declare refresh_token: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Reviews)
  reviews: Reviews[];

  @BelongsToMany(() => Menus, () => Favorites)
  favoriteMenus: Menus[];

  @HasOne(() => Customers)
  customer: Customers;

  @HasMany(() => Reservations)
  reservations: Reservations[];

  @HasMany(() => Payments)
  payments: Payments[];

  @BelongsToMany(() => Restaurants, () => ManagersRestaurants)
  managedRestaurants: Restaurants[];
}

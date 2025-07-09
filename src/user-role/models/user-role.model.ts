import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Role } from "../../roles/models/role.model";
interface IUserRoleCreationAtrr {
  userId: number;
  roleId: number;
}

@Table({ tableName: "user_role" })
export class UserRole extends Model<UserRole, IUserRoleCreationAtrr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare userId: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  declare roleId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Role)
  role: Role;
}

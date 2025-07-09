import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { User } from "../../users/models/user.model"
import { UserRole } from "../../user-role/models/user-role.model"
import { ApiProperty } from "@nestjs/swagger"

interface IRoleCreationAtrr{
    name: string
    description: string
}

@Table({ tableName: "role", timestamps: false })
export class Role extends Model<Role, IRoleCreationAtrr> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "ADMIN" })
  @Column({ type: DataType.STRING })
  declare name: string;

  @ApiProperty({ example: "Administrator privileges" })
  @Column({ type: DataType.STRING })
  declare description: string;

  @ApiProperty({ type: () => [User], description: "Users with this role" })
  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}

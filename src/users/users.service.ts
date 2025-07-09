import { BadRequestException, Injectable, NotFoundException, ForbiddenException} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { FindOptions } from 'sequelize';
import * as bcrypt from "bcrypt";
import { Role } from "../roles/models/role.model";
import { UserRole } from "../user-role/models/user-role.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Role) private readonly roleModel: typeof Role,
  @InjectModel(UserRole) private readonly userRoleModel: typeof UserRole,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("NOt matching password");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
      is_active: ['admin', 'superadmin'].includes(createUserDto.role),

    });
    return newUser;
  }

  findAll() {
    return this.userModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async findUserByEmail(email: string, options?: any) {
  return this.userModel.findOne({
    where: { email },
    include: [Role], 
    ...options,
  });
}

  async findByIdWithRoles(id: number) {
  const user = await this.userModel.findByPk(id, {
    include: [
      {
        model: Role,
        through: { attributes: [] }, 
      },
    ],
  });

  return user;
}


  async update(id: number, updateUserDto: UpdateUserDto) {
  const { role, ...userData } = updateUserDto; 
  return this.userModel.update(userData, {
    where: { id },
    returning: true,
  });
}

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async activateUser(link: string) {
  if (!link) {
    throw new BadRequestException("Activation link not found");
  }

  const user = await this.userModel.findOne({
    where: { activation_link: link },
    include: [Role], // include roles to check them
  });

  if (!user) {
    throw new NotFoundException("User not found");
  }
  if (user.is_active) {
    throw new BadRequestException("User already activated");
  }

  const roles = await user.$get('roles'); // Get roles of user

  const hasAdminRole = roles.some((role) => role.name === 'admin');
  user.is_active = true;
  await user.save();
  if (hasAdminRole) {
    throw new BadRequestException("Admins cannot be activated via email");
  }


  user.is_active = true;
  await user.save();

  return {
    message: "User activated successfully",
    is_active: user.is_active,
  };
}


async userHasRole(userId: number, roleName: string): Promise<boolean> {
  const userRoles = await this.userRoleModel.findAll({
    where: { userId },
    include: [{ model: Role, where: { name: roleName } }],
  });
  return userRoles.length > 0;
}

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.userModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
    return updatedUser;
  }

  async assignRole(userId: number, roleName: string) {
  const role = await this.roleModel.findOne({ where: { name: roleName } });
  if (!role) {
    throw new BadRequestException(`Role '${roleName}' not found`);
  }

  if (roleName === 'superadmin') {
    const existingSuperadmin = await this.userRoleModel.findOne({
      where: { roleId: role.id }
    });

    if (existingSuperadmin) {
      throw new ForbiddenException('Superadmin already exists');
    }
  }

  return this.userRoleModel.create({
    userId: userId,
    roleId: role.id,
  });
}

async userHasAnyRole(userId: number, roles: string[]): Promise<boolean> {
  const userWithRoles = await this.userModel.findByPk(userId, {
    include: [
      {
        model: Role,
        through: { attributes: [] }, // avoid UserRole extra data
      },
    ],
  });

  if (!userWithRoles || !userWithRoles.roles) return false;
  console.log('User Roles:', userWithRoles.roles.map(r => r.name));


  return userWithRoles.roles.some(role => roles.includes(role.name));
}


}

import { Module, forwardRef } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './models/user-role.model'; 
import { Role } from '../roles/models/role.model';
import { User } from '../users/models/user.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserRole, Role, User]), 
    forwardRef(() => RolesModule),     // 🔁 fix circular dependency
    forwardRef(() => AuthModule),      // 🔁 fix circular dependency
  ],
  providers: [UserRoleService],
  controllers: [UserRoleController],
  exports: [UserRoleService],
})
export class UserRoleModule {}

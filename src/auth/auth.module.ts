import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { Role } from '../roles/models/role.model';
import { UserRole } from '../user-role/models/user-role.model';
import { RolesModule } from '../roles/roles.module';
import { UserRoleModule } from '../user-role/user-role.module';
// import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCES_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCES_TOKEN_TIME },
    }),
    SequelizeModule.forFeature([Role, UserRole]),
    forwardRef(() => UsersModule), // ✅ Fix circular dependency
    forwardRef(() => RolesModule), // ✅ Fix circular dependency
    MailModule,
    UserRoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,/*JwtStrategy*/],
  exports: [AuthService, JwtModule, /*JwtStrategy*/], // So UsersModule can use it
})
export class AuthModule {}

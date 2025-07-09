import { Module, forwardRef } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customers } from './models/customer.model';
import { AuthModule } from '../auth/auth.module';
import { UserRole } from '../user-role/models/user-role.model';
import { Role } from '../roles/models/role.model';
import { User } from '../users/models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Customers, UserRole, Role, User]), forwardRef(() => AuthModule), JwtModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [SequelizeModule]
})
export class CustomersModule {}

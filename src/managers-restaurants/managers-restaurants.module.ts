import { Module, forwardRef } from '@nestjs/common';
import { ManagersRestaurantsService } from './managers-restaurants.service';
import { ManagersRestaurantsController } from './managers-restaurants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ManagersRestaurants } from './models/managers-restaurant.model';
import { AuthModule } from '../auth/auth.module';
import { UserRole } from '../user-role/models/user-role.model';
import { Role } from '../roles/models/role.model';
import { User } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([ManagersRestaurants, UserRole, Role, User]), forwardRef(() => AuthModule),],
  controllers: [ManagersRestaurantsController], 
  providers: [ManagersRestaurantsService],
})
export class ManagersRestaurantsModule {}

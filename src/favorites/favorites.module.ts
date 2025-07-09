import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorites } from './models/favorite.model';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CustomersModule } from '../customers/customers.module';
import { Customers } from '../customers/models/customer.model';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/role.model';
import { UserRole } from '../user-role/models/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([Favorites, UserRole, Role, User]), JwtModule, CustomersModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

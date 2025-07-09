import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reservations } from './models/reservation.model';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UserRole } from '../user-role/models/user-role.model';
import { Role } from '../roles/models/role.model';
import { User } from '../users/models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Reservations, UserRole, Role, User]), UsersModule, JwtModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}

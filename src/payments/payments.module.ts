import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payments } from './models/payment.entity';
import { Reservations } from '../reservations/models/reservation.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Payments, Reservations]), JwtModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}

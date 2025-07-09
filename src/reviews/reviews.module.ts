import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reviews } from './models/review.model';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/role.model';
import { UserRole } from '../user-role/models/user-role.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Reviews, UserRole, Role, User]), JwtModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}

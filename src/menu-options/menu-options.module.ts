import { Module } from '@nestjs/common';
import { MenuOptionsService } from './menu-options.service';
import { MenuOptionsController } from './menu-options.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuOptions } from './models/menu-option.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([MenuOptions]), JwtModule],
  controllers: [MenuOptionsController],
  providers: [MenuOptionsService],
})
export class MenuOptionsModule {}

import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Menus } from './models/menu.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Menus]), JwtModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}

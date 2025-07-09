import { Module } from '@nestjs/common';
import { MenuImagesService } from './menu-images.service';
import { MenuImagesController } from './menu-images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuImages } from './models/menu-image.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([MenuImages]), JwtModule],
  controllers: [MenuImagesController],
  providers: [MenuImagesService],
})
export class MenuImagesModule {}

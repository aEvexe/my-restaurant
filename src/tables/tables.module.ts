import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tables } from './models/table.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Tables]), JwtModule],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}

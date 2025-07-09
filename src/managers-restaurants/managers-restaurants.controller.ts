import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ManagersRestaurantsService } from './managers-restaurants.service';
import { CreateManagersRestaurantDto } from './dto/create-managers-restaurant.dto';
import { UpdateManagersRestaurantDto } from './dto/update-managers-restaurant.dto';
import { Roles } from '../common/decorators/cookie-getter.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('managers-restaurants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ManagersRestaurantsController {
  constructor(private readonly managersRestaurantsService: ManagersRestaurantsService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateManagersRestaurantDto) {
    return this.managersRestaurantsService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.managersRestaurantsService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.managersRestaurantsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateManagersRestaurantDto,
  ) {
    return this.managersRestaurantsService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.managersRestaurantsService.remove(+id);
  }
}

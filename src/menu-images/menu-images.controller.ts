import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuImagesService } from './menu-images.service';
import { CreateMenuImageDto } from './dto/create-menu-image.dto';
import { UpdateMenuImageDto } from './dto/update-menu-image.dto';
import { Roles } from '../common/decorators/cookie-getter.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SelfOrAdminGuard } from '../common/guards/self-or-admin.guard';

@Controller('menu-images')
export class MenuImagesController {
  constructor(private readonly menuImagesService: MenuImagesService) {}

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMenuImageDto: CreateMenuImageDto) {
    return this.menuImagesService.create(createMenuImageDto);
  }

  @Get()
  findAll() {
    return this.menuImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuImagesService.findOne(+id);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuImageDto: UpdateMenuImageDto) {
    return this.menuImagesService.update(+id, updateMenuImageDto);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuImagesService.remove(+id);
  }
}

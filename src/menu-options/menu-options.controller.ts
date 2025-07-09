import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuOptionsService } from './menu-options.service';
import { CreateMenuOptionDto } from './dto/create-menu-option.dto';
import { UpdateMenuOptionDto } from './dto/update-menu-option.dto';
import { Roles } from '../common/decorators/cookie-getter.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('menu-options')
export class MenuOptionsController {
  constructor(private readonly menuOptionsService: MenuOptionsService) {}

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMenuOptionDto: CreateMenuOptionDto) {
    return this.menuOptionsService.create(createMenuOptionDto);
  }

  @Get()
  findAll() {
    return this.menuOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuOptionDto: UpdateMenuOptionDto) {
    return this.menuOptionsService.update(+id, updateMenuOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuOptionsService.remove(+id);
  }
}

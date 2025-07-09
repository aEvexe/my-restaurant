import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { Roles } from "../common/decorators/cookie-getter.decorator";
import { RolesGuard } from "../common/guards/role.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SelfOrAdminGuard } from "../common/guards/self-or-admin.guard";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Get("by-user/:userId")
  findByUserId(@Param("userId") userId: string) {
    return this.notificationsService.findByUserId(+userId);
  }
}

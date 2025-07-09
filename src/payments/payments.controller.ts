import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Roles } from "../common/decorators/cookie-getter.decorator";
import { RolesGuard } from "../common/guards/role.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SelfOrAdminGuard } from "../common/guards/self-or-admin.guard";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  // ✅ Har doim bu route yuqorida bo‘lishi kerak!
  @Get("top-range")
  getTopInRange(@Query("start") start: string, @Query("end") end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return this.paymentsService.findTopPayersInRange(startDate, endDate);
  }

  @Get("avg-revenue")
  getAverageRevenue(@Query("start") start: string, @Query("end") end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return this.paymentsService.getAverageRevenueInRange(startDate, endDate);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Get("by-user/:userId")
  findByUserId(@Param("userId") userId: string) {
    return this.paymentsService.findByUserId(+userId);
  }
}

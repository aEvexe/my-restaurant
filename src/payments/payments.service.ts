import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Reservations } from "../reservations/models/reservation.model";
import { Payments } from "./models/payment.entity";
import { Op, fn, col } from "sequelize";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payments)
    private readonly paymentModel: typeof Payments,
    @InjectModel(Reservations)
    private readonly reservationModel: typeof Reservations
  ) {}

  private async getReservation(reservationId: number) {
    const reservation = await this.reservationModel.findByPk(reservationId);
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found`
      );
    }
    return reservation;
  }

  private async validateUserMatch(reservationId: number, userId: number) {
    const reservation = await this.getReservation(reservationId);
    if (reservation.userId !== userId) {
      throw new ForbiddenException(
        `Forbidden: Reservation belongs to user #${reservation.userId}, not #${userId}`
      );
    }
  }

  async create(createDto: CreatePaymentDto) {
    await this.validateUserMatch(createDto.reservationId, createDto.userId);
    return this.paymentModel.create(createDto);
  }

  async findAll() {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id, {
      include: { all: true },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: number, updateDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    if (!updateDto.userId) {
      throw new BadRequestException("userId is required for update");
    }

    await this.validateUserMatch(payment.reservationId, updateDto.userId);

    return payment.update(updateDto);
  }

  async remove(id: number) {
    const deleted = await this.paymentModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return { message: `Payment #${id} deleted successfully` };
  }

  async findTopPayersInRange(startDate: Date, endDate: Date) {
    return this.paymentModel.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ["userId", [fn("SUM", col("amount")), "totalPaid"]],
      group: ["Payments.userId", "user.id", "reservation.id"],
      order: [[fn("SUM", col("amount")), "DESC"]],
      limit: 5,
      include: { all: true },
    });
  }

  async getAverageRevenueInRange(startDate: Date, endDate: Date) {
    const { fn, col, Op } = require("sequelize");

    const result = await this.paymentModel.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [[fn("AVG", col("amount")), "averageRevenue"]],
      raw: true,
    });

    return result[0];
  }

  async findByUserId(userId: number) {
    return this.paymentModel.findAll({
      where: { userId },
    });
  }
}

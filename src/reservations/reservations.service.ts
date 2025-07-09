import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { Reservations } from "./models/reservation.model";
import { User } from "../users/models/user.model";
import { Role } from "../roles/models/role.model";

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservations)
    private readonly reservationModel: typeof Reservations,
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  private async isUserCustomer(userId: number): Promise<boolean> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const roles = await user.$get("roles");
    return roles.some((role: Role) => role.name === "customer");
  }

  async create(createDto: CreateReservationDto) {
    const isCustomer = await this.isUserCustomer(createDto.userId);
    if (!isCustomer) {
      throw new ForbiddenException(
        "Only users with customer role can be added as customers"
      );
    }

    return this.reservationModel.create(createDto);
  }

  async findAll() {
    return this.reservationModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const reservation = await this.reservationModel.findByPk(id);
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async update(id: number, updateDto: UpdateReservationDto) {
    const customer = await this.reservationModel.findByPk(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const user = await this.userModel.findByPk(customer.userId, {
      include: { all: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${customer.userId} not found`);
    }

    const roles = await user.$get("roles");
    const isCustomer = roles.some((role) => role.name === "customer");

    if (!isCustomer) {
      throw new ForbiddenException(
        "Only users with customer role can be updated as customers"
      );
    }

    return await customer.update(updateDto);
  }

  async remove(id: number) {
    const deleted = await this.reservationModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    return { message: `Reservation #${id} deleted successfully` };
  }

  async findByUserId(userId: number) {
    return this.reservationModel.findAll({
      where: { userId },
    });
  }
}

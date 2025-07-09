import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customers } from './models/customer.model';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/role.model';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers)
    private readonly customerModel: typeof Customers,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  // Utility function to check if user has 'customer' role
  private async isUserCustomer(userId: number): Promise<boolean> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const roles = await user.$get('roles');
    return roles.some((role: Role) => role.name === 'customer');
  }

  async create(createDto: CreateCustomerDto) {
    const isCustomer = await this.isUserCustomer(createDto.userId);
    if (!isCustomer) {
      throw new ForbiddenException('Only users with customer role can be added as customers');
    }

    return this.customerModel.create(createDto);
  }

  async findAll() {
    return this.customerModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const customer = await this.customerModel.findByPk(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateDto: UpdateCustomerDto) {
  const customer = await this.customerModel.findByPk(id);
  if (!customer) {
    throw new NotFoundException(`Customer with ID ${id} not found`);
  }

  const user = await this.userModel.findByPk(customer.userId, {
    include: { all: true },
  });

  if (!user) {
    throw new NotFoundException(`User with ID ${customer.userId} not found`);
  }

  const roles = await user.$get('roles');
  const isCustomer = roles.some(role => role.name === 'customer');

  if (!isCustomer) {
    throw new ForbiddenException('Only users with customer role can be updated as customers');
  }

  return await customer.update(updateDto);
}


  async remove(id: number) {
    const deleted = await this.customerModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return { message: `Customer #${id} deleted successfully` };
  }
}

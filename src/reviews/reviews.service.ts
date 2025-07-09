import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Reviews } from './models/review.model';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/role.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews)
    private readonly reviewModel: typeof Reviews,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  private async isUserCustomer(userId: number): Promise<boolean> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const roles = await user.$get('roles');
    return roles.some((role: Role) => role.name === 'customer');
  }

  async create(createDto: CreateReviewDto) {
    const isCustomer = await this.isUserCustomer(createDto.userId);
    if (!isCustomer) {
      throw new ForbiddenException(
        'Only users with customer role can create reviews',
      );
    }

    return this.reviewModel.create(createDto);
  }

  async findAll() {
    return this.reviewModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const review = await this.reviewModel.findByPk(id, {
      include: { all: true },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: number, updateDto: UpdateReviewDto) {
    const review = await this.reviewModel.findByPk(id);
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    const user = await this.userModel.findByPk(review.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${review.userId} not found`);
    }

    const roles = await user.$get('roles');
    const isCustomer = roles.some((role) => role.name === 'customer');
    if (!isCustomer) {
      throw new ForbiddenException(
        'Only users with customer role can update reviews',
      );
    }

    return review.update(updateDto);
  }

  async remove(id: number) {
    const deleted = await this.reviewModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return { message: `Review #${id} deleted successfully` };
  }
}

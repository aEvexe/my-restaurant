import { PartialType } from '@nestjs/swagger';
import { CreateManagersRestaurantDto } from './create-managers-restaurant.dto';

export class UpdateManagersRestaurantDto extends PartialType(CreateManagersRestaurantDto) {}

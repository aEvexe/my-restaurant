import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString } from 'class-validator';

export class CreateManagersRestaurantDto {
  @ApiProperty({ example: 4, description: 'Manager user ID' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2, description: 'Restaurant ID' })
  @IsInt()
  restaurantId: number;

  @ApiProperty({
    example: '2025-07-08T15:00:00Z',
    description: 'Assigned date and time',
  })
  @IsDateString()
  assigned_at: string;
}

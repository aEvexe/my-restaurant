import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, Min } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ example: 1, description: 'Restaurant ID this table belongs to' })
  @IsInt()
  restaurantId: number;

  @ApiProperty({ example: 4, description: 'Table number' })
  @IsInt()
  @Min(1)
  number: number;

  @ApiProperty({ example: 6, description: 'Capacity of the table (number of people)' })
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({
    example: 'available',
    description: 'Status of the table',
    enum: ['available', 'reserved', 'occupied'],
    default: 'available',
  })
  @IsEnum(['available', 'reserved', 'occupied'])
  status: 'available' | 'reserved' | 'occupied';
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 1, description: 'Restaurant ID' })
  @IsInt({ message: 'restaurantId must be an integer' })
  restaurantId: number;

  @ApiProperty({ example: 'Appetizers', description: 'Name of the category' })
  @IsString({ message: 'name must be a string' })
  @MinLength(2, { message: 'name must be at least 2 characters' })
  name: string;
}

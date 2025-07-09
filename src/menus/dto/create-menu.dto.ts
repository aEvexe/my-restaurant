import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: 1, description: 'ID of the restaurant' })
  @IsInt({ message: 'restaurantId must be an integer' })
  restaurantId: number;

  @ApiProperty({ example: 2, description: 'ID of the category' })
  @IsInt({ message: 'categoryId must be an integer' })
  categoryId: number;

  @ApiProperty({ example: 'Cheeseburger', description: 'Name of the menu item' })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @ApiProperty({
    example: 'Juicy grilled cheeseburger with fries',
    description: 'Description of the menu item',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description: string;

  @ApiProperty({ example: 45000, description: 'Price of the menu item (in UZS)' })
  @IsInt({ message: 'price must be an integer' })
  @Min(0, { message: 'price must be a positive number' })
  price: number;

  @ApiProperty({
    example: 'available',
    description: 'Availability status (e.g., available, out_of_stock)',
  })
  // @IsString({ message: 'available must be a boolean' })
  // @IsNotEmpty({ message: 'available should not be empty' })
  available: boolean;
}

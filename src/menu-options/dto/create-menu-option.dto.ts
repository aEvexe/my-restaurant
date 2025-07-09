import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateMenuOptionDto {
  @ApiProperty({ example: 5, description: 'ID of the menu this option belongs to' })
  @IsInt({ message: 'menuId must be an integer' })
  menuId: number;

  @ApiProperty({ example: 'Extra cheese', description: 'Name of the option' })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @ApiProperty({ example: 5000, description: 'Extra price for this option (UZS)' })
  @IsInt({ message: 'extra_price must be an integer' })
  @Min(0, { message: 'extra_price must be 0 or greater' })
  extra_price: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsPhoneNumber } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Oqtepa Lavash', description: 'Name of the restaurant' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({ example: 'Tashkent, Chilonzor 19', description: 'Restaurant address' })
  @IsString()
  @Length(5, 200)
  address: string;

  @ApiProperty({ example: '+998901234567', description: 'Phone number of the restaurant' })
  @IsString() 
  phone: string;

  @ApiProperty({ example: 'Family-friendly fast food chain', description: 'Restaurant description' })
  @IsString()
  @Length(5, 500)
  description: string;
}

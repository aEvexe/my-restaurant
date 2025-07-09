import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, IsIn } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 4, description: 'User ID linked to the customer' })
  @IsInt({ message: 'userId must be an integer' })
  userId: number;

  @ApiProperty({ example: '2007-05-14', description: 'Birth date of the customer' })
  @IsDateString({}, { message: 'birth_date must be a valid date string (YYYY-MM-DD)' })
  birth_date: string;

  @ApiProperty({ example: 'male', description: 'Gender of the customer (male/female)' })
  @IsString({ message: 'gender must be a string' })
  @IsIn(['male', 'female'], { message: 'gender must be either "male" or "female"' })
  gender: string;
}

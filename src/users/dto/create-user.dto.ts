// create-user.dto.ts
import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass!123' })
  @IsString()
  password: string;

  confirm_password: string;

  @ApiProperty({ example: '+998901234567' })
  @IsPhoneNumber('UZ') 
  phone: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ example: 'uuid-1234-5678', required: false })
  @IsOptional()
  @IsUUID()
  activation_link?: string;

  @ApiProperty({ example: 'refresh-token...', required: false })
  @IsOptional()
  @IsString()
  refresh_token?: string;

  role: string
}

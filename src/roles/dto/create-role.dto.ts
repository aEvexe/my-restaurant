import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Administrator with full access' })
  @IsString()
  description: string;
}

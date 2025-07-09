import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  roleId: number;
}

// create-notification.dto.ts
import { IsInt, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'Your order has been shipped' })
  @IsString()
  message: string;

  @ApiProperty({ example: 'INFO' })
  @IsString()
  type: string;

  @ApiProperty({ example: '2025-07-07T15:30:00Z' })
  @IsDateString()
  sent_at: Date;

  @ApiProperty({ example: 'SENT' })
  @IsString()
  status: string;
}

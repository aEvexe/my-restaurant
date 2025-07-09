import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsIn, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 3, description: 'User ID making the payment' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 5, description: 'Reservation ID being paid for' })
  @IsInt()
  reservationId: number;

  @ApiProperty({ example: 120000, description: 'Amount paid in UZS' })
  @IsInt()
  amount: number;

  @ApiProperty({
    example: 'card',
    description: 'Payment method',
    enum: ['cash', 'card'],
  })
  @IsString()
  @IsIn(['cash', 'card'])
  method: string;

  @ApiProperty({
    example: 'paid',
    description: 'Payment status',
    enum: ['pending', 'paid'],
  })
  @IsString()
  @IsIn(['pending', 'paid'])
  status: string;

  @ApiProperty({
    example: '2025-07-08T18:30:00Z',
    description: 'Timestamp of when the payment was made',
  })
  @IsDateString()
  paid_at: string;
}

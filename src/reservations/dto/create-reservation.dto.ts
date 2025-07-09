import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, IsIn } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 4, description: 'User ID making the reservation' })
  @IsInt({ message: 'userId must be an integer' })
  userId: number;

  @ApiProperty({ example: 2, description: 'Table ID being reserved' })
  @IsInt({ message: 'tableId must be an integer' })
  tableId: number;

  @ApiProperty({ example: '2025-08-20', description: 'Reservation date (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'date must be a valid date string' })
  date: string;

  @ApiProperty({ example: '19:30', description: 'Reservation time (HH:mm)' })
  @IsString({ message: 'time must be a string' })
  time: string;

  @ApiProperty({ example: 4, description: 'Number of guests' })
  @IsInt({ message: 'guests must be an integer' })
  guests: number;

  @ApiProperty({
    example: 'confirmed',
    description: 'Reservation status',
    enum: ['pending', 'confirmed', 'cancelled'],
  })
  @IsString()
  @IsIn(['pending', 'confirmed', 'cancelled'], {
    message: 'status must be one of: pending, confirmed, cancelled',
  })
  status: string;
}

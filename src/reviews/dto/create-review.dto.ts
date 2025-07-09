import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 4, description: 'User ID who writes the review' })
  @IsInt({ message: 'userId must be an integer' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Restaurant ID being reviewed' })
  @IsInt({ message: 'restaurantId must be an integer' })
  restaurantId: number;

  @ApiProperty({
    example: '5',
    description: 'Rating (must be between 1 and 5)',
  })
  @IsString()
  @IsIn(['1', '2', '3', '4', '5'], { message: 'Rating must be between 1 and 5' })
  rating: string;

  @ApiProperty({
    example: 'Great food and fast service!',
    description: 'Optional comment about the restaurant',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment: string;
}

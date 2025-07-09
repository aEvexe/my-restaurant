import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({ example: 4, description: 'User ID who favorited this menu item' })
  @IsInt({ message: 'userId must be an integer' })
  userId: number;

  @ApiProperty({ example: 12, description: 'Menu ID being favorited' })
  @IsInt({ message: 'menuId must be an integer' })
  menuId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateMenuImageDto {
  @ApiProperty({ example: 5, description: 'ID of the menu this image belongs to' })
  @IsInt({ message: 'menuId must be an integer' })
  menuId: number;

  @ApiProperty({
    example: 'https://example.com/images/cheeseburger.png',
    description: 'URL of the image',
  })
  @IsString({ message: 'image_url must be a string' })
  @IsNotEmpty({ message: 'image_url is required' })
  @IsUrl({}, { message: 'image_url must be a valid URL' })
  image_url: string;
}

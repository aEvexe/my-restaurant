import { PartialType } from '@nestjs/swagger';
import { CreateMenuImageDto } from './create-menu-image.dto';

export class UpdateMenuImageDto extends PartialType(CreateMenuImageDto) {}

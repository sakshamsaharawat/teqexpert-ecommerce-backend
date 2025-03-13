import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/, {
    message: 'Title cannot have consecutive spaces.',
  })
  @Length(3, 100, {
    message: 'Title must be between 3 and 100 characters long.',
  })
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[\w\s,.'!?-]+$/, {
    message: 'Description cannot have consecutive spaces.',
  })
  @Length(0, 500, {
    message: 'Description cannot exceed 500 characters.',
  })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @IsString({ message: 'Image URL must be a string.' })
  @MaxLength(500, { message: 'Image URL is too long (max 255 characters).' })
  @IsUrl({}, { message: 'Invalid image URL format.' })
  @IsOptional()
  image_url: string;

  @IsNumber({}, { message: "Price must be number." })
  @IsPositive({ message: "Price must be positive value." })
  price: number;
}

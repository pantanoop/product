import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumber({}, { message: 'id must be a number' })
  @IsOptional()
  id: number;

  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price cannot be empty' })
  price: number;

  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category cannot be empty' })
  category: string;

  @IsString({ message: 'Thumbnail must be a string' })
  @IsOptional()
  thumbnail?: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsString({ message: 'Brand must be a string' })
  @IsOptional()
  brand?: string;

  @IsNumber({}, { message: 'Stock must be a number' })
  @IsOptional()
  stock?: number;

  @IsNumber({}, { message: 'Rating must be a number' })
  @IsOptional()
  rating?: number;
}

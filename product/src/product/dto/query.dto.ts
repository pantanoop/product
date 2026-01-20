import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  skip?: string;
}

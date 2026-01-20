import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';

import { CreateProductDto } from './dto/create-product.dto';
import type { FullProduct } from './product.service';
import { ProductQueryDto } from './dto/query.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product/:id')
  findById(@Param('id') id: number) {
    const productId = Number(id);
    return this.productService.findById(productId);
  }

  @Get()
  find(@Query() query: ProductQueryDto) {
    return this.productService.find(query);
  }

  @Post()
  create(@Body() newProduct: CreateProductDto): FullProduct {
    return this.productService.create(newProduct);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() productDto: CreateProductDto,
  ): FullProduct | null {
    return this.productService.update(Number(id), productDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(Number(id));
  }
}

import { Injectable } from '@nestjs/common';
import { dummyProducts } from './constants/dummyProducts';
import { queryInterface } from './interface/queryInterface';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/query.dto';

export interface FullProduct {
  id: number;
  title: string;
  price: number;
  category: string;

  thumbnail?: string;
  description?: string;
  brand?: string;
  stock?: number;
  rating?: number;

  discountPercentage: number;
  tags: any[];
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: any[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: any;
  images: string[];
}

@Injectable()
export class ProductService {
  findById(id: number) {
    return dummyProducts.products.find((p) => p.id === id);
  }

  find(query: ProductQueryDto) {
    const { title, category, limit = 10, skip = 0 } = query;

    let products = dummyProducts.products;

    if (title?.trim()) {
      const searchTitle = title.toLowerCase();
      products = products.filter((p) =>
        p.title.toLowerCase().includes(searchTitle),
      );
    }

    if (category?.trim()) {
      const searchCategory = category.toLowerCase();
      products = products.filter((p) =>
        p.category.toLowerCase().includes(searchCategory),
      );
    }

    const total = products.length;
    const paginated = products.slice(
      Number(skip),
      Number(skip) + Number(limit),
    );

    return {
      products: paginated,
      total,
      skip: Number(skip),
      limit: Number(limit),
    };
  }

  create(dto: CreateProductDto): FullProduct {
    const newProduct: FullProduct = {
      id: dto.id ?? dummyProducts.products.length + 1,
      title: dto.title,
      price: Number(dto.price),
      category: dto.category,

      thumbnail: dto.thumbnail,
      description: dto.description,
      brand: dto.brand,
      stock: dto.stock,
      rating: dto.rating,

      discountPercentage: 0,
      tags: [],
      sku: '',
      weight: 0,
      dimensions: { width: 0, height: 0, depth: 0 },
      warrantyInformation: '',
      shippingInformation: '',
      availabilityStatus: 'In Stock',
      reviews: [],
      returnPolicy: '',
      minimumOrderQuantity: 1,
      meta: { createdAt: new Date().toISOString() },
      images: dto.thumbnail ? [dto.thumbnail] : [],
    };

    dummyProducts.products.push({
      ...newProduct,
      description: newProduct.description ?? '',
      brand: newProduct.brand ?? '',
      thumbnail: newProduct.thumbnail ?? '',
      stock: newProduct.stock ?? 0,
      rating: newProduct.rating ?? 0,
    });

    return newProduct;
  }

  update(id: number, dto: CreateProductDto): FullProduct | null {
    const index = dummyProducts.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const existing = dummyProducts.products[index];

    const updated: FullProduct = {
      ...existing,
      title: dto.title ?? existing.title,
      price: dto.price !== undefined ? Number(dto.price) : existing.price,
      category: dto.category ?? existing.category,
      thumbnail: dto.thumbnail ?? existing.thumbnail,
      description: dto.description ?? existing.description,
      brand: dto.brand ?? existing.brand,
      stock: dto.stock ?? existing.stock,
      rating: dto.rating ?? existing.rating,
      images: dto.thumbnail ? [dto.thumbnail] : existing.images,
    };

    dummyProducts.products[index] = {
      ...updated,
      description: updated.description ?? '',
      brand: updated.brand ?? '',
      thumbnail: updated.thumbnail ?? '',
      stock: updated.stock ?? 0,
      rating: updated.rating ?? 0,
    };

    return updated;
  }

  delete(id: number): FullProduct | null {
    const index = dummyProducts.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const deleted = dummyProducts.products[index] as FullProduct;

    dummyProducts.products.splice(index, 1);

    return deleted;
  }
}

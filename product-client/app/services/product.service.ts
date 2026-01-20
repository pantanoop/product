import { api } from "./productApi";

export const productService = {
  getProducts: (limit: number, skip: number) => {
    return api(`/products?limit=${limit}&skip=${skip}`);
  },

  searchProducts: (title: string, category: string) => {
    return api(`/products?title=${title}&category=${category}`);
  },

  getProductById: (id: number) => {
    return api(`/products/product/${id}`);
  },
};

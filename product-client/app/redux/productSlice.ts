import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "@/app/services/product.service";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  category: string;
  brand?: string;
  stock?: number;
  rating?: number;
}

interface productState {
  productData: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
}

const initialState: productState = {
  productData: [],
  selectedProduct: null,
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 10,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (
    {
      limit,
      skip,
      searchTerm,
      searchCategory,
    }: {
      limit?: number;
      skip?: number;
      searchTerm?: string;
      searchCategory?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      let data;
      if (searchTerm || searchCategory) {
        data = await productService.searchProducts(searchTerm, searchCategory);
      } else {
        data = await productService.getProducts(limit ?? 10, skip ?? 0);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await productService.getProductById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.productData = [];
      state.total = 0;
      state.skip = 0;
      state.limit = 10;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.productData = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.productData = [];
        state.total = 0;
        state.skip = 0;
        state.limit = 10;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedProduct = null;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;

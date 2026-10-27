import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/api";

// Fetch products from backend API
export const fetchProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to fetch products");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create product via backend API
export const createProductApi = createAsyncThunk(
  "adminProducts/createProductApi",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to create product");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update product via backend API
export const updateProductApi = createAsyncThunk(
  "adminProducts/updateProductApi",
  async ({ id, ...updates }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to update product");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Toggle product status via backend API
export const toggleProductStatusApi = createAsyncThunk(
  "adminProducts/toggleProductStatusApi",
  async (product, { rejectWithValue }) => {
    try {
      const newStatus = product.status === "Active" ? "Inactive" : "Active";
      const res = await fetch(`${API_BASE}/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to update status");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete product via backend API
export const deleteProductApi = createAsyncThunk(
  "adminProducts/deleteProductApi",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to delete product");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    items: [], // 100% dynamic - no static or fallback data
    loading: false,
    error: null,
    searchQuery: "",
    categoryFilter: "All",
    statusFilter: "All",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // createProductApi
    builder.addCase(createProductApi.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });

    // updateProductApi
    builder.addCase(updateProductApi.fulfilled, (state, action) => {
      const idx = state.items.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
      }
    });

    // toggleProductStatusApi
    builder.addCase(toggleProductStatusApi.fulfilled, (state, action) => {
      const idx = state.items.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
      }
    });

    // deleteProductApi
    builder.addCase(deleteProductApi.fulfilled, (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    });
  },
});

export const { setSearchQuery, setCategoryFilter, setStatusFilter } =
  productsSlice.actions;

export default productsSlice.reducer;

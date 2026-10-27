import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/api";

// Fetch categories from backend API
export const fetchCategories = createAsyncThunk(
  "adminCategories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to fetch categories");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create category via backend API
export const createCategoryApi = createAsyncThunk(
  "adminCategories/createCategoryApi",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to create category");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update category via backend API
export const updateCategoryApi = createAsyncThunk(
  "adminCategories/updateCategoryApi",
  async ({ id, ...updates }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to update category");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete category via backend API
export const deleteCategoryApi = createAsyncThunk(
  "adminCategories/deleteCategoryApi",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to delete category");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "adminCategories",
  initialState: {
    items: [], // 100% dynamic - no static or fallback data
    loading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // createCategoryApi
    builder.addCase(createCategoryApi.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });

    // updateCategoryApi
    builder.addCase(updateCategoryApi.fulfilled, (state, action) => {
      const idx = state.items.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
      }
    });

    // deleteCategoryApi
    builder.addCase(deleteCategoryApi.fulfilled, (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
    });
  },
});

export const { setSearchQuery } = categoriesSlice.actions;

export default categoriesSlice.reducer;

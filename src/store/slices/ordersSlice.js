import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/api";

// Fetch orders from backend API
export const fetchOrders = createAsyncThunk(
  "adminOrders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to fetch orders");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update order status via backend API
export const updateOrderStatusApi = createAsyncThunk(
  "adminOrders/updateOrderStatusApi",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to update order status");
      return json.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const ordersSlice = createSlice({
  name: "adminOrders",
  initialState: {
    items: [], // 100% dynamic - no static or fallback data
    loading: false,
    error: null,
    filterStatus: "All",
  },
  reducers: {
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatusApi.fulfilled, (state, action) => {
        const idx = state.items.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      });
  },
});

export const { setFilterStatus } = ordersSlice.actions;

export default ordersSlice.reducer;

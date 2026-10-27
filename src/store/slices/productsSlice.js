import { createSlice } from "@reduxjs/toolkit";

const initialProducts = [
  {
    id: "prod-1",
    name: "Enterprise Cloud Suite Pro",
    description: "Full-scale cloud orchestration, multi-region failover, and automated scale.",
    price: 299,
    category: "Cloud",
    stock: 45,
    status: "Active",
    salesCount: 1420,
    icon: "☁️",
  },
  {
    id: "prod-2",
    name: "AI Analytics Intelligence Platform",
    description: "Deep predictive learning models, anomaly detection, and visual dashboards.",
    price: 499,
    category: "AI & ML",
    stock: 18,
    status: "Active",
    salesCount: 890,
    icon: "🧠",
  },
  {
    id: "prod-3",
    name: "Shield Cyber Security Mesh",
    description: "Zero-trust identity verification, real-time intrusion prevention & DLP.",
    price: 199,
    category: "Security",
    stock: 80,
    status: "Active",
    salesCount: 2150,
    icon: "🛡️",
  },
  {
    id: "prod-4",
    name: "High-Throughput API Gateway",
    description: "Sub-millisecond latency rate limiting, token validation & telemetry.",
    price: 149,
    category: "Infrastructure",
    stock: 35,
    status: "Active",
    salesCount: 1120,
    icon: "⚡",
  },
  {
    id: "prod-5",
    name: "Omnichannel Customer Hub",
    description: "Centralized communications, automated workflows, and CRM synchronization.",
    price: 249,
    category: "Business",
    stock: 62,
    status: "Active",
    salesCount: 760,
    icon: "📊",
  },
  {
    id: "prod-6",
    name: "Global Edge Content Delivery",
    description: "Ultra-fast global edge caching with automatic SSL & DDoS mitigation.",
    price: 89,
    category: "Infrastructure",
    stock: 120,
    status: "Active",
    salesCount: 3410,
    icon: "🌐",
  },
];

export const productsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    items: initialProducts,
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
    addProduct: (state, action) => {
      state.items.unshift({
        id: `prod-${Date.now()}`,
        salesCount: 0,
        status: "Active",
        icon: "📦",
        ...action.payload,
      });
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    toggleProductStatus: (state, action) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) {
        product.status = product.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
});

export const {
  setSearchQuery,
  setCategoryFilter,
  setStatusFilter,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} = productsSlice.actions;

export default productsSlice.reducer;

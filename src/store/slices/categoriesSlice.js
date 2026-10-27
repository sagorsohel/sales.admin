import { createSlice } from "@reduxjs/toolkit";

const initialCategories = [
  {
    id: "cat-1",
    name: "Cloud Solutions",
    slug: "cloud-solutions",
    description: "Enterprise cloud orchestration, hosting, and serverless compute infrastructure.",
    icon: "☁️",
    createdAt: "2026-01-10T08:00:00Z",
  },
  {
    id: "cat-2",
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description: "Predictive neural networks, automated computer vision, and LLM orchestration.",
    icon: "🧠",
    createdAt: "2026-01-12T09:30:00Z",
  },
  {
    id: "cat-3",
    name: "Cyber Security",
    slug: "cyber-security",
    description: "Zero-trust network architecture, penetration testing, and real-time DLP shield.",
    icon: "🛡️",
    createdAt: "2026-01-15T11:00:00Z",
  },
  {
    id: "cat-4",
    name: "Infrastructure & API",
    slug: "infrastructure-api",
    description: "Ultra low-latency gateways, telemetry proxies, and edge CDN networks.",
    icon: "⚡",
    createdAt: "2026-01-18T14:15:00Z",
  },
  {
    id: "cat-5",
    name: "Business Operations",
    slug: "business-operations",
    description: "Omnichannel customer communication, automated invoice pipelines, and CRM.",
    icon: "📊",
    createdAt: "2026-01-20T16:45:00Z",
  },
];

export const categoriesSlice = createSlice({
  name: "adminCategories",
  initialState: {
    items: initialCategories,
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addCategory: (state, action) => {
      const name = action.payload.name.trim();
      const slug =
        action.payload.slug ||
        name
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-");

      state.items.unshift({
        id: `cat-${Date.now()}`,
        name,
        slug,
        description: action.payload.description || "",
        icon: action.payload.icon || "📁",
        createdAt: new Date().toISOString(),
      });
    },
    updateCategory: (state, action) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
  },
});

export const { setSearchQuery, addCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;

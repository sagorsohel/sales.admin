import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "adminUi",
  initialState: {
    currentTab: "dashboard", // 'dashboard' | 'categories' | 'products' | 'orders' | 'api-monitor'
    sidebarCollapsed: false,
    darkMode: true,
    isAddProductModalOpen: false,
    editingProduct: null, // when editing an existing product
    isCategoryModalOpen: false,
    editingCategory: null, // when editing a category
    activeProductDetail: null, // preview modal
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setAddProductModalOpen: (state, action) => {
      state.isAddProductModalOpen = action.payload;
      if (!action.payload) {
        state.editingProduct = null;
      }
    },
    setEditingProduct: (state, action) => {
      state.editingProduct = action.payload;
      state.isAddProductModalOpen = !!action.payload;
    },
    setCategoryModalOpen: (state, action) => {
      state.isCategoryModalOpen = action.payload;
      if (!action.payload) {
        state.editingCategory = null;
      }
    },
    setEditingCategory: (state, action) => {
      state.editingCategory = action.payload;
      state.isCategoryModalOpen = !!action.payload;
    },
    setActiveProductDetail: (state, action) => {
      state.activeProductDetail = action.payload;
    },
  },
});

export const {
  setCurrentTab,
  toggleSidebar,
  toggleDarkMode,
  setAddProductModalOpen,
  setEditingProduct,
  setCategoryModalOpen,
  setEditingCategory,
  setActiveProductDetail,
} = uiSlice.actions;

export default uiSlice.reducer;

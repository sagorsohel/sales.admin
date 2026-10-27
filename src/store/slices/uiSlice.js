import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "adminUi",
  initialState: {
    currentTab: "dashboard", // 'dashboard' | 'products' | 'orders' | 'api-monitor'
    sidebarCollapsed: false,
    darkMode: true,
    isAddProductModalOpen: false,
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
    },
  },
});

export const {
  setCurrentTab,
  toggleSidebar,
  toggleDarkMode,
  setAddProductModalOpen,
} = uiSlice.actions;

export default uiSlice.reducer;

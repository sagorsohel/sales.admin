import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { DashboardView } from "./components/DashboardView";
import { CategoriesView } from "./components/CategoriesView";
import { ProductsView } from "./components/ProductsView";
import { OrdersView } from "./components/OrdersView";
import { ApiMonitorView } from "./components/ApiMonitorView";
import { AddProductModal } from "./components/AddProductModal";
import { CategoryModal } from "./components/CategoryModal";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { fetchCategories } from "./store/slices/categoriesSlice";
import { fetchProducts } from "./store/slices/productsSlice";
import { fetchOrders } from "./store/slices/ordersSlice";

export default function App() {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.ui.currentTab);
  const productsLoading = useSelector((state) => state.products.loading);
  const categoriesLoading = useSelector((state) => state.categories.loading);

  useEffect(() => {
    // 100% Dynamic data fetching from Drizzle MySQL Express backend
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-[#090d16] text-gray-100 font-sans">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          {productsLoading && categoriesLoading && (
            <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              Loading real-time dynamic records from Drizzle ORM (MySQL)...
            </div>
          )}

          {currentTab === "dashboard" && <DashboardView />}
          {currentTab === "categories" && <CategoriesView />}
          {currentTab === "products" && <ProductsView />}
          {currentTab === "orders" && <OrdersView />}
          {currentTab === "api-monitor" && <ApiMonitorView />}
        </main>
      </div>

      {/* Modals */}
      <AddProductModal />
      <CategoryModal />
      <ProductDetailModal />
    </div>
  );
}

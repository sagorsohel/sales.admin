import React from "react";
import { useSelector } from "react-redux";
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

export default function App() {
  const currentTab = useSelector((state) => state.ui.currentTab);

  return (
    <div className="flex min-h-screen bg-[#090d16] text-gray-100 font-sans">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
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

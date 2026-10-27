import React from "react";
import { useSelector } from "react-redux";
import { Bell, ShieldCheck, Zap } from "lucide-react";

export function Header() {
  const currentTab = useSelector((state) => state.ui.currentTab);
  const productsCount = useSelector((state) => state.products.items.length);
  const ordersCount = useSelector((state) => state.orders.items.length);

  const titles = {
    dashboard: "Enterprise Overview",
    products: "Product Catalog Management",
    orders: "Order Processing & Fulfillment",
    "api-monitor": "Express.js API Live Monitor",
  };

  return (
    <header className="h-16 border-b border-[#1f293d] bg-[#0d131f]/90 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold text-white tracking-tight">
          {titles[currentTab] || "Admin Console"}
        </h1>
        <p className="text-xs text-gray-400">
          WideTech Sales System • React 19 + Redux Toolkit
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* State snapshot badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151f30] border border-[#23334d] text-xs">
          <span className="flex items-center gap-1.5 text-blue-400 font-medium">
            <Zap className="w-3.5 h-3.5" />
            Redux Synced:
          </span>
          <span className="text-gray-300 font-semibold">{productsCount} products</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-300 font-semibold">{ordersCount} orders</span>
        </div>

        {/* User badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#1f293d]">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div className="hidden md:block text-left text-xs">
            <div className="font-semibold text-gray-200">Super Admin</div>
            <div className="text-[10px] text-emerald-400 font-medium">Authorized</div>
          </div>
        </div>
      </div>
    </header>
  );
}

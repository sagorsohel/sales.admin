import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Activity,
  Globe,
  Layers,
  ChevronRight,
} from "lucide-react";
import { setCurrentTab } from "../store/slices/uiSlice";

export function Sidebar() {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.ui.currentTab);
  const productsCount = useSelector((state) => state.products.items.length);
  const ordersCount = useSelector((state) => state.orders.items.length);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "products",
      label: "Products",
      icon: <Package className="w-5 h-5" />,
      badge: productsCount,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      badge: ordersCount,
    },
    {
      id: "api-monitor",
      label: "Backend API",
      icon: <Activity className="w-5 h-5" />,
      badge: "5000",
      badgeColor: "emerald",
    },
  ];

  return (
    <aside className="w-64 bg-[#0d131f] border-r border-[#1f293d] flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-[#1f293d]">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-tight leading-none">
              Wide<span className="text-blue-500">Admin</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-semibold">
              Redux Control Panel
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3 py-6 space-y-1">
          <div className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Management
          </div>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => dispatch(setCurrentTab(item.id))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm"
                    : "text-gray-400 hover:text-gray-200 hover:bg-[#151e2e]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-blue-400" : "text-gray-400"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      item.badgeColor === "emerald"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info & Website Link */}
      <div className="p-4 border-t border-[#1f293d] bg-[#090e17]/50 space-y-3">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#151f30] hover:bg-[#1b283d] text-gray-300 text-xs font-medium border border-[#23334d] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Open Website (:3000)</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </a>

        <div className="flex items-center gap-2 px-1 text-[11px] text-gray-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Express Backend Online</span>
        </div>
      </div>
    </aside>
  );
}

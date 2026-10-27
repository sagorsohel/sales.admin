import React from "react";
import { useSelector } from "react-redux";
import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Layers,
} from "lucide-react";

export function DashboardView() {
  const products = useSelector((state) => state.products.items);
  const orders = useSelector((state) => state.orders.items);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (Number(o.totalAmount || o.amount) || 0),
    0
  );
  const totalStock = products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);

  // Group by category
  const categoryStats = products.reduce((acc, p) => {
    const cat = p.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const metrics = [
    {
      label: "Total Sales Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+18.4% from last month",
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Active Products in Store",
      value: products.length,
      change: `${totalStock} units across categories`,
      icon: <Package className="w-5 h-5 text-blue-400" />,
      iconBg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Processed Orders",
      value: orders.length,
      change: "100% fulfillment rate",
      icon: <ShoppingCart className="w-5 h-5 text-purple-400" />,
      iconBg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Ecosystem Conversion",
      value: "4.92%",
      change: "+1.2% this quarter",
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[#111827] border border-[#1f293d] shadow-sm hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">{m.label}</span>
              <div
                className={`w-9 h-9 rounded-lg border flex items-center justify-center ${m.iconBg}`}
              >
                {m.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mt-3">{m.value}</div>
            <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-[#111827] border border-[#1f293d]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">Recent Customer Orders</h2>
              <p className="text-xs text-gray-400">
                Live Redux state tracking customer transactions
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Live Feed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-gray-400 uppercase bg-[#162032]/60 border-b border-[#1f293d]">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f293d] text-gray-300">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#151f32]/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-blue-400 font-semibold">
                      {order.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{order.customer}</div>
                      <div className="text-[11px] text-gray-400">{order.email}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-300">
                      {Array.isArray(order.items) && order.items[0]?.name
                        ? order.items[0].name
                        : order.product || "Standard Package"}
                    </td>
                    <td className="px-4 py-3 font-bold text-white">
                      ${order.totalAmount || order.amount || 0}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                          order.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : order.status === "Processing"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Breakdown & Architecture */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-[#111827] border border-[#1f293d]">
            <h2 className="text-base font-bold text-white mb-1">
              Category Distribution
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Products categorized in Redux catalog
            </p>

            <div className="space-y-3">
              {Object.entries(categoryStats).map(([cat, count]) => {
                const percent = Math.round((count / products.length) * 100);
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-300 font-medium">{cat}</span>
                      <span className="text-gray-400 font-mono">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#1c2638] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Nodes Status */}
          <div className="p-6 rounded-xl bg-[#111827] border border-[#1f293d]">
            <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-400" />
              Connected Nodes
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#151f32] border border-[#202e47]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-gray-300 font-medium">Website (Next.js)</span>
                </div>
                <span className="text-gray-400 font-mono">Port 3000</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#151f32] border border-[#202e47]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-gray-300 font-medium">Backend (Express.js)</span>
                </div>
                <span className="text-gray-400 font-mono">Port 5000</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#151f32] border border-[#202e47]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-gray-300 font-medium">Admin Panel (Vite React)</span>
                </div>
                <span className="text-gray-400 font-mono">Port 5173</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

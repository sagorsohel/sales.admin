import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterStatus, updateOrderStatusApi } from "../store/slices/ordersSlice";

const statuses = ["All", "Completed", "Processing", "Pending"];

export function OrdersView() {
  const dispatch = useDispatch();
  const { items, filterStatus } = useSelector((state) => state.orders);

  const filteredOrders = items.filter((order) => {
    if (filterStatus === "All") return true;
    return order.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-[#111827] border border-[#1f293d]">
        <div>
          <h2 className="text-base font-bold text-white">Customer Orders Pipeline</h2>
          <p className="text-xs text-gray-400">
            Real-time status updates dispatching directly to Redux store
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => dispatch(setFilterStatus(st))}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === st
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "bg-[#0d131f] text-gray-400 hover:text-white border border-[#1f293d]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl bg-[#111827] border border-[#1f293d] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-gray-400 uppercase bg-[#162032]/60 border-b border-[#1f293d]">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Customer & Organization</th>
                <th className="px-5 py-3.5">Purchased Item</th>
                <th className="px-5 py-3.5">Date & Time</th>
                <th className="px-5 py-3.5">Total Amount</th>
                <th className="px-5 py-3.5">Status Flow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f293d] text-gray-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400 text-sm">
                    No orders matching status "{filterStatus}".
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#151f32]/50 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs font-semibold text-blue-400">
                      {ord.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{ord.customer}</div>
                      <div className="text-xs text-gray-400">{ord.email}</div>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-200">
                      {ord.product}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-400">
                      {ord.date}
                    </td>
                    <td className="px-5 py-4 font-bold text-white">
                      ${ord.amount}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          dispatch(
                            updateOrderStatusApi({
                              id: ord.id,
                              status: e.target.value,
                            })
                          )
                        }
                        className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                          ord.status === "Completed"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                            : ord.status === "Processing"
                            ? "bg-blue-950/60 text-blue-400 border-blue-500/40"
                            : "bg-amber-950/60 text-amber-400 border-amber-500/40"
                        }`}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Processing">Processing</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

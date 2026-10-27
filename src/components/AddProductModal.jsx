import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Plus, Sparkles } from "lucide-react";
import { setAddProductModalOpen } from "../store/slices/uiSlice";
import { addProduct } from "../store/slices/productsSlice";

const categories = ["Cloud", "AI & ML", "Security", "Infrastructure", "Business"];
const icons = ["☁️", "🧠", "🛡️", "⚡", "📊", "🌐", "🚀", "🔐"];

export function AddProductModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isAddProductModalOpen);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Cloud");
  const [stock, setStock] = useState("50");
  const [icon, setIcon] = useState("☁️");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Please provide product name and price");
      return;
    }

    dispatch(
      addProduct({
        name,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock, 10) || 0,
        icon,
      })
    );

    // Reset and close
    setName("");
    setDescription("");
    setPrice("");
    dispatch(setAddProductModalOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-[#111827] border border-[#1f293d] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f293d]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-base">Add New Solution</h3>
          </div>
          <button
            onClick={() => dispatch(setAddProductModalOpen(false))}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a2333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Edge CDN Acceleration Hub"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief enterprise capability summary..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Monthly Price ($) *
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="299"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Inventory Stock
              </label>
              <input
                type="number"
                min="0"
                placeholder="50"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Icon Badge
              </label>
              <div className="flex gap-2 items-center">
                {icons.slice(0, 5).map((ic) => (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setIcon(ic)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg border transition-all ${
                      icon === ic
                        ? "bg-blue-600/20 border-blue-500 text-white"
                        : "bg-[#0d131f] border-[#1f293d] hover:border-gray-500"
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1f293d] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => dispatch(setAddProductModalOpen(false))}
              className="px-4 py-2 rounded-lg bg-[#151f32] text-gray-300 text-sm font-medium hover:bg-[#1b2740] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md shadow-blue-500/30 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Product to Redux
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Percent,
} from "lucide-react";
import {
  setSearchQuery,
  setCategoryFilter,
  deleteProductApi,
  toggleProductStatusApi,
} from "../store/slices/productsSlice";
import {
  setAddProductModalOpen,
  setEditingProduct,
  setActiveProductDetail,
} from "../store/slices/uiSlice";

export function ProductsView() {
  const dispatch = useDispatch();
  const { items, searchQuery, categoryFilter } = useSelector(
    (state) => state.products
  );
  const categories = useSelector((state) => state.categories.items);

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#111827] border border-[#1f293d]">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products in Redux store..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
              className="px-3 py-2 rounded-lg bg-[#0d131f] border border-[#1f293d] text-gray-300 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.icon || "📁"} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              dispatch(setEditingProduct(null));
              dispatch(setAddProductModalOpen(true));
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Solution
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl bg-[#111827] border border-[#1f293d] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-gray-400 uppercase bg-[#162032]/60 border-b border-[#1f293d]">
              <tr>
                <th className="px-5 py-3.5">Solution & Media</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Regular / Sale Price</th>
                <th className="px-5 py-3.5">Features & SEO</th>
                <th className="px-5 py-3.5">Stock</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f293d] text-gray-300">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-400 text-sm">
                    No solutions found in this category.
                  </td>
                </tr>
              ) : (
                filteredItems.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#151f32]/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {prod.featuredImage ? (
                          <img
                            src={prod.featuredImage}
                            alt={prod.name}
                            className="w-11 h-11 rounded-lg object-cover border border-[#23334d]"
                          />
                        ) : (
                          <span className="text-2xl p-1.5 rounded-lg bg-[#192438] border border-[#23334d]">
                            {prod.icon || "📦"}
                          </span>
                        )}
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            {prod.name}
                            {prod.discountPercentage > 0 && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                -{prod.discountPercentage}%
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 max-w-xs truncate">
                            {prod.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#1a2538] text-blue-400 border border-blue-500/20 whitespace-nowrap">
                        {prod.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-white text-base">
                          ${prod.salePrice}
                        </span>
                        {prod.regularPrice > prod.salePrice && (
                          <span className="text-xs line-through text-gray-500">
                            ${prod.regularPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">Monthly</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1 text-xs">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/30 mr-1.5">
                          ✓ {prod.benefits?.length || 0} উপকারিতা
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-800/30">
                          ★ {prod.facilities?.length || 0} সুবিধা
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-300">
                      {prod.stock} units
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => dispatch(toggleProductStatusApi(prod))}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer border ${
                          prod.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700"
                        }`}
                      >
                        {prod.status === "Active" ? (
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-400" />
                        )}
                        {prod.status}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => dispatch(setActiveProductDetail(prod))}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1e2a3f] transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => dispatch(setEditingProduct(prod))}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-[#1e2a3f] transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete "${prod.name}" from MySQL database?`)) {
                              try {
                                await dispatch(deleteProductApi(prod.id)).unwrap();
                              } catch (err) {
                                alert("Failed to delete product: " + err);
                              }
                            }
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

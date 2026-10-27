import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FolderPlus,
  Search,
  Edit2,
  Trash2,
  Package,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  setSearchQuery,
  deleteCategory,
} from "../store/slices/categoriesSlice";
import {
  setCategoryModalOpen,
  setEditingCategory,
  setCurrentTab,
} from "../store/slices/uiSlice";
import { setCategoryFilter } from "../store/slices/productsSlice";

export function CategoriesView() {
  const dispatch = useDispatch();
  const { items, searchQuery } = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products.items);

  const filteredCategories = items.filter((cat) => {
    return (
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cat.description &&
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const getProductCount = (categoryName) => {
    return products.filter(
      (p) => p.category?.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  const handleEdit = (category) => {
    dispatch(setEditingCategory(category));
  };

  const handleDelete = (category) => {
    const count = getProductCount(category.name);
    const msg =
      count > 0
        ? `Warning: There are ${count} products linked to "${category.name}". Delete this category anyway?`
        : `Are you sure you want to delete category "${category.name}"?`;

    if (confirm(msg)) {
      dispatch(deleteCategory(category.id));
    }
  };

  const handleViewProducts = (categoryName) => {
    dispatch(setCategoryFilter(categoryName));
    dispatch(setCurrentTab("products"));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#111827] border border-[#1f293d]">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search categories in Redux..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
          </div>
        </div>

        <button
          onClick={() => {
            dispatch(setEditingCategory(null));
            dispatch(setCategoryModalOpen(true));
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <FolderPlus className="w-4 h-4" />
          Create Category
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((cat) => {
          const productCount = getProductCount(cat.name);
          return (
            <div
              key={cat.id}
              className="p-5 rounded-xl bg-[#111827] border border-[#1f293d] flex flex-col justify-between hover:border-blue-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#182335] border border-[#23334d]">
                    {cat.icon || "📁"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-[#1a2538] transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  slug: /{cat.slug}
                </p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {cat.description || "No description provided."}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1f293d] flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-blue-400" />
                  <strong className="text-gray-200">{productCount}</strong> products
                </span>

                <button
                  onClick={() => handleViewProducts(cat.name)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                >
                  View Products
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

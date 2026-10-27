import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, FolderPlus, Sparkles } from "lucide-react";
import { setCategoryModalOpen } from "../store/slices/uiSlice";
import { addCategory, updateCategory } from "../store/slices/categoriesSlice";

const availableIcons = ["📁", "☁️", "🧠", "🛡️", "⚡", "📊", "🌐", "🛍️", "🔧", "💻"];

export function CategoryModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isCategoryModalOpen);
  const editingCategory = useSelector((state) => state.ui.editingCategory);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📁");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || "");
      setDescription(editingCategory.description || "");
      setIcon(editingCategory.icon || "📁");
    } else {
      setName("");
      setDescription("");
      setIcon("📁");
    }
  }, [editingCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }

    if (editingCategory) {
      dispatch(
        updateCategory({
          id: editingCategory.id,
          name: name.trim(),
          description: description.trim(),
          icon,
        })
      );
    } else {
      dispatch(
        addCategory({
          name: name.trim(),
          description: description.trim(),
          icon,
        })
      );
    }

    dispatch(setCategoryModalOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#111827] border border-[#1f293d] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between p-5 border-b border-[#1f293d]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <FolderPlus className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-base">
              {editingCategory ? "Edit Category" : "Create New Category"}
            </h3>
          </div>
          <button
            onClick={() => dispatch(setCategoryModalOpen(false))}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a2333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Health & Wellness, Enterprise Software"
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
              placeholder="Brief details about this category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Category Icon
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              {availableIcons.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg border transition-all ${
                    icon === ic
                      ? "bg-blue-600/20 border-blue-500 text-white scale-105"
                      : "bg-[#0d131f] border-[#1f293d] hover:border-gray-500 text-gray-300"
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1f293d] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => dispatch(setCategoryModalOpen(false))}
              className="px-4 py-2 rounded-lg bg-[#151f32] text-gray-300 text-sm font-medium hover:bg-[#1b2740] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md shadow-blue-500/30 transition-all"
            >
              {editingCategory ? "Update Category" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

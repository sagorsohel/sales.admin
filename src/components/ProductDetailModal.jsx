import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  CheckCircle,
  Sparkles,
  Percent,
  Search,
  Globe,
  Edit2,
  Package,
} from "lucide-react";
import {
  setActiveProductDetail,
  setEditingProduct,
} from "../store/slices/uiSlice";

export function ProductDetailModal() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.ui.activeProductDetail);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-[#111827] border border-[#1f293d] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f293d] bg-[#0d131f]">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-[#192438] border border-[#23334d]">
              {product.icon || "📦"}
            </span>
            <div>
              <h3 className="font-bold text-white text-base leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-blue-400 font-medium">
                {product.category}
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(setActiveProductDetail(null))}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a2333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Images & Pricing Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-44 rounded-xl overflow-hidden border border-[#1f293d] bg-black">
                <img
                  src={
                    product.featuredImage ||
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.galleryImages && product.galleryImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumb ${i}`}
                      className="w-14 h-12 rounded-lg object-cover border border-[#23334d]"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-4 rounded-xl bg-[#0e1624] border border-[#1f293d]">
              <div>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                  Price Breakdown
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-white">
                    ${product.salePrice}
                  </span>
                  {product.regularPrice > product.salePrice && (
                    <span className="text-sm line-through text-gray-500 font-medium">
                      ${product.regularPrice}
                    </span>
                  )}
                </div>

                {product.discountPercentage > 0 && (
                  <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <Percent className="w-3 h-3" />
                    {product.discountPercentage}% OFF
                  </div>
                )}

                <div className="mt-4 text-xs text-gray-400">
                  <div>
                    Status:{" "}
                    <strong className="text-emerald-400 font-semibold">
                      {product.status || "Active"}
                    </strong>
                  </div>
                  <div>
                    Available Stock:{" "}
                    <strong className="text-white">{product.stock || 0}</strong> units
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  dispatch(setActiveProductDetail(null));
                  dispatch(setEditingProduct(product));
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Product
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Description (বিবরণ)
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed bg-[#0d131f] p-3 rounded-lg border border-[#1f293d]">
              {product.description || "No description provided."}
            </p>
          </div>

          {/* Benefits (উপকারিতা) */}
          {product.benefits && product.benefits.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                উপকারিতা সমূহ (Benefits List)
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 p-2 rounded-lg bg-[#0e1624] border border-[#1f293d] text-xs text-gray-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Facilities (সুবিধাসমূহ) */}
          {product.facilities && product.facilities.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                সুবিধাসমূহ (Facilities List)
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.facilities.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 p-2 rounded-lg bg-[#0e1624] border border-[#1f293d] text-xs text-gray-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SEO Preview */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              SEO Engine Metadata
            </h4>
            <div className="p-3.5 rounded-xl bg-[#090d16] border border-[#1f293d] space-y-1">
              <div className="text-[11px] text-gray-400">
                https://sales.widetech.io/products/{product.slug || product.id}
              </div>
              <div className="text-xs font-semibold text-[#8ab4f8]">
                {product.seoTitle || product.name}
              </div>
              <div className="text-[11px] text-[#bdc1c6] line-clamp-2">
                {product.seoDescription || product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

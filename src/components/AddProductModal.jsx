import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Plus,
  Trash2,
  Sparkles,
  Image as ImageIcon,
  CheckCircle,
  Search,
  Globe,
  Tag,
  Percent,
} from "lucide-react";
import { setAddProductModalOpen } from "../store/slices/uiSlice";
import {
  createProductApi,
  updateProductApi,
} from "../store/slices/productsSlice";

export function AddProductModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isAddProductModalOpen);
  const editingProduct = useSelector((state) => state.ui.editingProduct);
  const categories = useSelector((state) => state.categories.items);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("50");
  const [featuredImage, setFeaturedImage] = useState("");
  const [icon, setIcon] = useState("📦");

  // Gallery Images Array
  const [galleryImages, setGalleryImages] = useState([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  // Benefits (উপকারিতা) Array
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState("");

  // Facilities (সুবিধাসমূহ) Array
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState("");

  // SEO Fields (Auto-generated or custom)
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoImage, setSeoImage] = useState("");
  const [isCustomSeo, setIsCustomSeo] = useState(false);

  // Active section tab in modal
  const [activeTab, setActiveTab] = useState("basic"); // 'basic' | 'media' | 'benefits' | 'seo'

  // Pre-fill on editing or reset on add
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setCategory(editingProduct.category || (categories[0]?.name || ""));
      setDescription(editingProduct.description || "");
      setRegularPrice(editingProduct.regularPrice ? String(editingProduct.regularPrice) : "");
      setSalePrice(editingProduct.salePrice ? String(editingProduct.salePrice) : "");
      setStock(editingProduct.stock !== undefined ? String(editingProduct.stock) : "50");
      setFeaturedImage(editingProduct.featuredImage || "");
      setGalleryImages(editingProduct.galleryImages || []);
      setBenefits(editingProduct.benefits || []);
      setFacilities(editingProduct.facilities || []);
      setSeoTitle(editingProduct.seoTitle || "");
      setSeoDescription(editingProduct.seoDescription || "");
      setSeoImage(editingProduct.seoImage || "");
      setIcon(editingProduct.icon || "📦");
      setIsCustomSeo(true);
    } else {
      setName("");
      setCategory(categories[0]?.name || "Cloud Solutions");
      setDescription("");
      setRegularPrice("");
      setSalePrice("");
      setStock("50");
      setFeaturedImage("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80");
      setGalleryImages([
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
      ]);
      setBenefits([
        "উচ্চ কর্মক্ষমতা এবং ৯৯.৯% আপটাইম নিশ্চয়তা",
        "স্বয়ংক্রিয় ক্লাউড ব্যাকআপ সিস্টেম",
        "সহজ ইনস্টলেশন এবং কনফিগারেশন"
      ]);
      setFacilities([
        "২৪/৭ লাইভ চ্যাট ও ফোন কল সাপোর্ট",
        "৩০ দিনের শর্তহীন মানি-ব্যাক গ্যারান্টি",
        "ফ্রি আপগ্রেড এবং সিকিউরিটি প্যাচ"
      ]);
      setSeoTitle("");
      setSeoDescription("");
      setSeoImage("");
      setIcon("📦");
      setIsCustomSeo(false);
    }
  }, [editingProduct, isOpen, categories]);

  // Real-time discount calculation
  const numRegular = parseFloat(regularPrice) || 0;
  const numSale = parseFloat(salePrice) || 0;
  const discountPercent =
    numRegular > numSale && numRegular > 0
      ? Math.round(((numRegular - numSale) / numRegular) * 100)
      : 0;

  // Auto SEO values
  const computedSeoTitle = isCustomSeo && seoTitle ? seoTitle : name ? `${name} | WideTech Enterprise` : "Product Title | WideTech";
  const computedSeoDesc = isCustomSeo && seoDescription ? seoDescription : description ? description.slice(0, 160) : "Discover enterprise solutions with WideTech.";
  const computedSeoImage = isCustomSeo && seoImage ? seoImage : featuredImage || "";

  if (!isOpen) return null;

  // Add / Remove Gallery Image
  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
      setNewGalleryUrl("");
    }
  };
  const handleRemoveGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Add / Edit / Remove Benefits
  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };
  const handleUpdateBenefit = (index, val) => {
    const updated = [...benefits];
    updated[index] = val;
    setBenefits(updated);
  };
  const handleRemoveBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  // Add / Edit / Remove Facilities
  const handleAddFacility = () => {
    if (newFacility.trim()) {
      setFacilities([...facilities, newFacility.trim()]);
      setNewFacility("");
    }
  };
  const handleUpdateFacility = (index, val) => {
    const updated = [...facilities];
    updated[index] = val;
    setFacilities(updated);
  };
  const handleRemoveFacility = (index) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter product title");
      return;
    }
    if (!salePrice) {
      alert("Please enter sale price");
      return;
    }

    const payload = {
      name: name.trim(),
      category: category || categories[0]?.name || "General",
      description: description.trim(),
      regularPrice: numRegular > 0 ? numRegular : numSale,
      salePrice: numSale,
      discountPercentage: discountPercent,
      stock: parseInt(stock, 10) || 0,
      featuredImage: featuredImage.trim(),
      galleryImages,
      benefits,
      facilities,
      seoTitle: computedSeoTitle,
      seoDescription: computedSeoDesc,
      seoImage: computedSeoImage,
      icon,
    };

    try {
      if (editingProduct) {
        await dispatch(
          updateProductApi({ id: editingProduct.id, ...payload })
        ).unwrap();
      } else {
        await dispatch(createProductApi(payload)).unwrap();
      }
      dispatch(setAddProductModalOpen(false));
    } catch (err) {
      alert("Failed to save product in MySQL: " + err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-[#111827] border border-[#1f293d] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f293d] bg-[#0d131f]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {editingProduct ? "Edit Product Details" : "Create New Enterprise Solution"}
              </h3>
              <p className="text-xs text-gray-400">
                Configure pricing, media gallery, benefits, facilities & auto SEO
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(setAddProductModalOpen(false))}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a2333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation inside modal */}
        <div className="flex border-b border-[#1f293d] px-6 bg-[#0e1522]">
          {[
            { id: "basic", label: "1. Info & Pricing" },
            { id: "media", label: "2. Images & Gallery" },
            { id: "benefits", label: "3. উপকারিতা & সুবিধাসমূহ" },
            { id: "seo", label: "4. Auto SEO Engine" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400 bg-blue-500/5"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: BASIC INFO & PRICING */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Product Title (পণ্যের নাম) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Cloud Suite Pro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Category (ক্যাটাগরি) *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    {categories.length === 0 ? (
                      <option value="">No categories created yet</option>
                    ) : (
                      categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.icon || "📁"} {c.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Stock Inventory Units
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

              {/* Pricing Grid */}
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-400" />
                    Price & Discount Matrix
                  </span>
                  {discountPercent > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      {discountPercent}% OFF (ছাড়)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Regular Price (আগের প্রাইস $)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="e.g. 399"
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Sale Price (এখন প্রাইস $) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      placeholder="e.g. 299"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 font-bold text-blue-400"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-gray-400">
                  {numRegular > numSale
                    ? `গ্রাহক $${numRegular - numSale} বাঁচাবেন (${discountPercent}% ছাড় পেয়ে)।`
                    : "আগের এবং বর্তমান প্রাইস একই হলে কোনো ছাড় ডিসপ্লে হবে না।"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Detailed Description (বিবরণ)
                </label>
                <textarea
                  rows={3}
                  placeholder="Comprehensive description of capabilities, features, and specs..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & GALLERY */}
          {activeTab === "media" && (
            <div className="space-y-5">
              {/* Featured Image */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Featured Image URL (ফিচার ইমেজ)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                {featuredImage && (
                  <div className="mt-2 relative w-32 h-20 rounded-lg overflow-hidden border border-[#1f293d] bg-black">
                    <img
                      src={featuredImage}
                      alt="Featured Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Gallery Images Array */}
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                    Product Gallery Images (গ্যালারি ইমেজ তালিকা)
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {galleryImages.length} images
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste another gallery image URL..."
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>

                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {galleryImages.map((img, i) => (
                      <div
                        key={i}
                        className="relative group rounded-lg overflow-hidden border border-[#23334d] h-20 bg-black"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: BENEFITS & FACILITIES */}
          {activeTab === "benefits" && (
            <div className="space-y-6">
              {/* Benefits (উপকারিতা) */}
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    উপকারিতা সমূহ (Benefits List)
                  </span>
                  <span className="text-xs text-gray-400">
                    {benefits.length} items
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="উপকারিতা লিখুন (যেমন: ১০০% খাঁটি উপাদান, ইত্যাদি)..."
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#121c2b] border border-[#1f2f47]"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={b}
                        onChange={(e) => handleUpdateBenefit(idx, e.target.value)}
                        className="flex-1 bg-transparent text-gray-200 text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(idx)}
                        className="p-1 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities (সুবিধাসমূহ) */}
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    সুবিধাসমূহ (Facilities List)
                  </span>
                  <span className="text-xs text-gray-400">
                    {facilities.length} items
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="সুবিধা লিখুন (যেমন: ফ্রি হোম ডেলিভারি, ৭ দিনের রিটার্ন পলিসি)..."
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddFacility}
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {facilities.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#121c2b] border border-[#1f2f47]"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={f}
                        onChange={(e) => handleUpdateFacility(idx, e.target.value)}
                        className="flex-1 bg-transparent text-gray-200 text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFacility(idx)}
                        className="p-1 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AUTO SEO ENGINE */}
          {activeTab === "seo" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    এসইও টাইটেল, ডেসক্রিপশন এবং ইমেজ স্বয়ংক্রিয়ভাবে প্রডাক্টের নাম, বিবরণ ও ফিচার ইমেজ থেকে নিয়ে নেওয়া হয়েছে। চাইলে কাস্টমাইজ করতে পারেন।
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCustomSeo(!isCustomSeo)}
                  className="px-2.5 py-1 rounded-md bg-blue-600/30 text-blue-200 hover:bg-blue-600/50 text-[11px] font-semibold whitespace-nowrap cursor-pointer"
                >
                  {isCustomSeo ? "Auto Reset" : "Customize"}
                </button>
              </div>

              {/* Live Google Search Card Preview */}
              <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f293d] space-y-1">
                <div className="text-[11px] text-gray-400 font-mono mb-2 flex items-center gap-1.5">
                  <Search className="w-3 h-3 text-emerald-400" />
                  Google SERP Snippet Preview:
                </div>
                <div className="text-[12px] text-gray-400 truncate">
                  https://sales.widetech.io/products/
                  {name
                    ? name
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/[\s_-]+/g, "-")
                    : "product-slug"}
                </div>
                <h4 className="text-sm font-semibold text-[#8ab4f8] hover:underline cursor-pointer truncate">
                  {computedSeoTitle}
                </h4>
                <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed">
                  {computedSeoDescription}
                </p>
              </div>

              {/* SEO Inputs */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    SEO Meta Title (অটো জেনারেটেড)
                  </label>
                  <input
                    type="text"
                    value={computedSeoTitle}
                    onChange={(e) => {
                      setIsCustomSeo(true);
                      setSeoTitle(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    SEO Meta Description (অটো জেনারেটেড)
                  </label>
                  <textarea
                    rows={2}
                    value={computedSeoDescription}
                    onChange={(e) => {
                      setIsCustomSeo(true);
                      setSeoDescription(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    SEO Social Share Image (OG Image)
                  </label>
                  <input
                    type="url"
                    value={computedSeoImage}
                    onChange={(e) => {
                      setIsCustomSeo(true);
                      setSeoImage(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Save & Actions */}
          <div className="pt-4 border-t border-[#1f293d] flex items-center justify-between">
            <div className="text-xs text-gray-400">
              {discountPercent > 0 && (
                <span className="text-emerald-400 font-semibold">
                  {discountPercent}% Discount Applied
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => dispatch(setAddProductModalOpen(false))}
                className="px-4 py-2 rounded-lg bg-[#151f32] text-gray-300 text-xs font-medium hover:bg-[#1b2740] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/30 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                {editingProduct ? "Update Solution in Redux" : "Save Solution to Redux"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

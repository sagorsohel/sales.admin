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
  Palette,
  Truck,
  Phone,
  MessageCircle,
  ListPlus,
  ShieldCheck,
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

  // Form states - Basic Info
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("Prestige");
  const [description, setDescription] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("50");
  const [icon, setIcon] = useState("📦");

  // Delivery & Contact
  const [deliveryInside, setDeliveryInside] = useState("60");
  const [deliveryOutside, setDeliveryOutside] = useState("120");
  const [phoneNumber, setPhoneNumber] = useState("0123456789");
  const [whatsappNumber, setWhatsappNumber] = useState("880123456789");

  // Media
  const [featuredImage, setFeaturedImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  // Color Variants Array [{ name, slug, image }]
  const [variants, setVariants] = useState([]);
  const [newVariantName, setNewVariantName] = useState("");
  const [newVariantSlug, setNewVariantSlug] = useState("");
  const [newVariantImage, setNewVariantImage] = useState("");

  // Key Features (মূল বৈশিষ্ট্যসমূহ)
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [newKeyFeature, setNewKeyFeature] = useState("");

  // Benefits (উপকারিতা) Array
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState("");

  // Facilities (প্যাকেজে যা যা থাকছে / সুবিধাসমূহ) Array
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState("");

  // SEO Fields (Auto-generated or custom)
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoImage, setSeoImage] = useState("");
  const [isCustomSeo, setIsCustomSeo] = useState(false);

  // Active section tab in modal
  const [activeTab, setActiveTab] = useState("basic"); // 'basic' | 'media' | 'variants' | 'features' | 'seo'

  // Pre-fill on editing or reset on add
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setCategory(editingProduct.category || (categories[0]?.name || ""));
      setBrand(editingProduct.brand || "Prestige");
      setDescription(editingProduct.description || "");
      setRegularPrice(editingProduct.regularPrice ? String(editingProduct.regularPrice) : "");
      setSalePrice(editingProduct.salePrice ? String(editingProduct.salePrice) : "");
      setStock(editingProduct.stock !== undefined ? String(editingProduct.stock) : "50");
      setFeaturedImage(editingProduct.featuredImage || "");
      setGalleryImages(Array.isArray(editingProduct.galleryImages) ? editingProduct.galleryImages : []);
      setVariants(Array.isArray(editingProduct.variants) ? editingProduct.variants : []);
      setKeyFeatures(Array.isArray(editingProduct.keyFeatures) ? editingProduct.keyFeatures : []);
      setBenefits(Array.isArray(editingProduct.benefits) ? editingProduct.benefits : []);
      setFacilities(Array.isArray(editingProduct.facilities) ? editingProduct.facilities : []);
      setDeliveryInside(
        editingProduct.deliveryInside !== undefined ? String(editingProduct.deliveryInside) : "60"
      );
      setDeliveryOutside(
        editingProduct.deliveryOutside !== undefined ? String(editingProduct.deliveryOutside) : "120"
      );
      setPhoneNumber(editingProduct.phoneNumber || "0123456789");
      setWhatsappNumber(editingProduct.whatsappNumber || "880123456789");
      setSeoTitle(editingProduct.seoTitle || "");
      setSeoDescription(editingProduct.seoDescription || "");
      setSeoImage(editingProduct.seoImage || "");
      setIcon(editingProduct.icon || "📦");
      setIsCustomSeo(true);
    } else {
      setName("");
      setCategory(categories[0]?.name || "Kitchen & Home");
      setBrand("Prestige");
      setDescription("");
      setRegularPrice("");
      setSalePrice("");
      setStock("50");
      setFeaturedImage("/products/cooker-blue-main.png");
      setGalleryImages([
        "/products/thumb-red.png",
        "/products/cooker-blue-main.png",
        "/products/thumb-yellow.png",
        "/products/thumb-green.png",
      ]);
      setVariants([
        { name: "Yellow (হলুদ)", slug: "yellow", image: "/products/thumb-yellow.png" },
        { name: "Sky Blue (আকাশী নীল)", slug: "sky-blue", image: "/products/cooker-blue-main.png" },
      ]);
      setKeyFeatures([
        "মডেল: Prestige Mukti Multi Purpose Cooker (3.0L)",
        "পাওয়ার: 1500 Watt",
        "ধারণক্ষমতা: ৩.০ লিটার",
        "ওয়ারেন্টি: ১২ মাসের সার্ভিস ওয়ারেন্টি",
      ]);
      setBenefits([
        "মাল্টি-ফাংশনাল: নুডলস, স্যুপ বা স্টিমার দিয়ে সবজি সেদ্ধ করা যায়",
        "নন-স্টিক ইনার পট: খাবার পুড়ে লেগে যায় না এবং সহজে পরিষ্কার হয়",
        "১৫০০ ওয়াট শক্তিশালী মোটর দ্রুত রান্না নিশ্চিত করে",
      ]);
      setFacilities([
        "১টি মেইন কুকিং ইউনিট (৩.০ লিটার)",
        "১টি স্টিমার পট (ভাপে রান্নার জন্য)",
        "১টি ট্রান্সপারেন্ট গ্লাস লিড এবং মেজারিং কাপ",
      ]);
      setDeliveryInside("60");
      setDeliveryOutside("120");
      setPhoneNumber("0123456789");
      setWhatsappNumber("880123456789");
      setSeoTitle("");
      setSeoDescription("");
      setSeoImage("");
      setIcon("🍲");
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
  const computedSeoTitle =
    isCustomSeo && seoTitle ? seoTitle : name ? `${name} | WideTech Enterprise` : "Product Title | WideTech";
  const computedSeoDesc =
    isCustomSeo && seoDescription ? seoDescription : description ? description.slice(0, 160) : "Discover quality products at best price.";
  const computedSeoImage = isCustomSeo && seoImage ? seoImage : featuredImage || "";

  if (!isOpen) return null;

  // Gallery handlers
  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
      setNewGalleryUrl("");
    }
  };
  const handleRemoveGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Color Variant handlers
  const handleAddVariant = () => {
    if (newVariantName.trim()) {
      const slug =
        newVariantSlug.trim() ||
        newVariantName
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-");
      setVariants([
        ...variants,
        {
          name: newVariantName.trim(),
          slug: slug || `var-${Date.now()}`,
          image: newVariantImage.trim() || featuredImage || "/products/thumb-yellow.png",
        },
      ]);
      setNewVariantName("");
      setNewVariantSlug("");
      setNewVariantImage("");
    }
  };
  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Key Feature handlers
  const handleAddKeyFeature = () => {
    if (newKeyFeature.trim()) {
      setKeyFeatures([...keyFeatures, newKeyFeature.trim()]);
      setNewKeyFeature("");
    }
  };
  const handleRemoveKeyFeature = (index) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  // Benefits handlers
  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };
  const handleRemoveBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  // Facilities handlers
  const handleAddFacility = () => {
    if (newFacility.trim()) {
      setFacilities([...facilities, newFacility.trim()]);
      setNewFacility("");
    }
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
      category: category || categories[0]?.name || "Kitchen & Home",
      brand: brand.trim() || "Prestige",
      description: description.trim(),
      regularPrice: numRegular > 0 ? numRegular : numSale,
      salePrice: numSale,
      discountPercentage: discountPercent,
      stock: parseInt(stock, 10) || 0,
      featuredImage: featuredImage.trim(),
      galleryImages,
      variants,
      keyFeatures,
      benefits,
      facilities,
      deliveryInside: Number(deliveryInside) || 60,
      deliveryOutside: Number(deliveryOutside) || 120,
      phoneNumber: phoneNumber.trim() || "0123456789",
      whatsappNumber: whatsappNumber.trim() || "880123456789",
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
      <div className="w-full max-w-4xl bg-[#111827] border border-[#1f293d] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f293d] bg-[#0d131f]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {editingProduct ? "Edit Product Details" : "Create New Product"}
              </h3>
              <p className="text-xs text-gray-400">
                Configure pricing, variants, features, delivery, WhatsApp & descriptions
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
        <div className="flex border-b border-[#1f293d] px-6 bg-[#0e1522] overflow-x-auto">
          {[
            { id: "basic", label: "1. Info & Pricing" },
            { id: "media", label: "2. Images & Gallery" },
            { id: "variants", label: "3. Color Variants (কালার)" },
            { id: "features", label: "4. Features & প্যাকেজ" },
            { id: "seo", label: "5. Auto SEO Engine" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
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
                  placeholder="e.g. Prestige 3.0L Multi Purpose Cooker"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <option value="Kitchen & Home">Kitchen & Home</option>
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
                    Brand (ব্র্যান্ডের নাম)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Prestige"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Stock Quantity (মজুত সংখ্যা)
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
                      Regular Price (আগের প্রাইস ৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="e.g. 1499"
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Sale Price (এখন অফার প্রাইস ৳) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      placeholder="e.g. 999"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 font-bold text-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery & Order Contact */}
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  ডেলিভারি চার্জ ও কন্টাক্ট ইনফরমেশন
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      ঢাকা সিটির ভেতরে চার্জ (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={deliveryInside}
                      onChange={(e) => setDeliveryInside(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      ঢাকা সিটির বাইরে চার্জ (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={deliveryOutside}
                      onChange={(e) => setDeliveryOutside(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-blue-400" />
                      কল করার মোবাইল নাম্বার
                    </label>
                    <input
                      type="text"
                      placeholder="0123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-emerald-400" />
                      হোয়াটসঅ্যাপ নাম্বার (Country Code সহ)
                    </label>
                    <input
                      type="text"
                      placeholder="880123456789"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Detailed Description (মূল বিবরণ)
                </label>
                <textarea
                  rows={3}
                  placeholder="পণ্যটির বিস্তারিত বিবরণ এখানে লিখুন..."
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
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Featured Image URL (ফিচার্ড ইমেজ)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="/products/cooker-blue-main.png বা https://..."
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                {featuredImage && (
                  <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-[#1f293d] bg-white p-1">
                    <img
                      src={featuredImage}
                      alt="Featured Preview"
                      className="w-full h-full object-contain"
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
                    type="text"
                    placeholder="আরেকটি ইমেজ URL পেস্ট করুন..."
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
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
                        className="relative group rounded-lg overflow-hidden border border-[#23334d] h-24 bg-white p-1"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-md bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: COLOR VARIANTS */}
          {activeTab === "variants" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-pink-400" />
                    Product Color Variants (কালার অপশনস)
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {variants.length} variants
                  </span>
                </div>

                {/* Add new variant inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-[#090e17] p-3 rounded-lg border border-[#1f293d]">
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] text-gray-400 mb-1">Color Name (যেমন: Sky Blue)</label>
                    <input
                      type="text"
                      placeholder="Sky Blue (আকাশী নীল)"
                      value={newVariantName}
                      onChange={(e) => setNewVariantName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-[#0d131f] border border-[#23334d] text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] text-gray-400 mb-1">Slug (যেমন: sky-blue)</label>
                    <input
                      type="text"
                      placeholder="sky-blue"
                      value={newVariantSlug}
                      onChange={(e) => setNewVariantSlug(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-[#0d131f] border border-[#23334d] text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] text-gray-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      placeholder="/products/cooker-blue-main.png"
                      value={newVariantImage}
                      onChange={(e) => setNewVariantImage(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-[#0d131f] border border-[#23334d] text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="w-full py-1.5 px-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Variants List */}
                <div className="space-y-2 pt-1">
                  {variants.length === 0 ? (
                    <p className="text-xs text-gray-500 italic text-center py-4">
                      কোনো কালার ভ্যারিয়েন্ট যোগ করা হয়নি। উপরে ফর্ম ব্যবহার করে কালার যোগ করুন।
                    </p>
                  ) : (
                    variants.map((v, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#090e17] border border-[#1f293d]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-md overflow-hidden bg-white border border-gray-300 p-0.5 flex items-center justify-center">
                            <img
                              src={v.image || "/products/thumb-yellow.png"}
                              alt={v.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{v.name}</div>
                            <div className="text-[11px] text-gray-400 font-mono">slug: {v.slug}</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(idx)}
                          className="p-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FEATURES, BENEFITS & PACKAGE */}
          {activeTab === "features" && (
            <div className="space-y-5">
              {/* KEY FEATURES */}
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ListPlus className="w-3.5 h-3.5 text-blue-400" />
                    Key Features (মূল স্পেসিফিকেশন ও ফিচার্স)
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {keyFeatures.length} features
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="যেমন: মডেল: Prestige 3.0L বা ধারণক্ষমতা: ৩ লিটার..."
                    value={newKeyFeature}
                    onChange={(e) => setNewKeyFeature(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyFeature}
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#090e17] border border-[#1f293d] text-xs text-gray-200"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyFeature(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* BENEFITS (কেন এটি আপনার পছন্দের তালিকায় থাকবে?) */}
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    কেন এটি আপনার পছন্দের তালিকায় থাকবে? (উপকারিতা)
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {benefits.length} points
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="যেমন: মাল্টি-ফাংশনাল: রান্না ও সেদ্ধ একসাথে করা যায়..."
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
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#090e17] border border-[#1f293d] text-xs text-gray-200"
                    >
                      <span>• {b}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FACILITIES / PACKAGE (প্যাকেজে যা যা থাকছে) */}
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    প্যাকেজে যা যা থাকছে / বিশেষ সুবিধাসমূহ
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {facilities.length} items
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="যেমন: ১টি মেইন কুকিং ইউনিট (৩.০ লিটার)..."
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
                  {facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#090e17] border border-[#1f293d] text-xs text-gray-200"
                    >
                      <span>✔ {fac}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFacility(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SEO ENGINE */}
          {activeTab === "seo" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    Search Engine Optimization
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={isCustomSeo}
                      onChange={(e) => setIsCustomSeo(e.target.checked)}
                      className="rounded bg-[#0d131f] border-gray-600 text-blue-600 focus:ring-0"
                    />
                    <span>Custom SEO Meta</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    disabled={!isCustomSeo}
                    placeholder="Auto generated from Title..."
                    value={isCustomSeo ? seoTitle : computedSeoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    disabled={!isCustomSeo}
                    placeholder="Auto generated from Description..."
                    value={isCustomSeo ? seoDescription : computedSeoDesc}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Social Share Image
                  </label>
                  <input
                    type="text"
                    disabled={!isCustomSeo}
                    placeholder="Auto generated from Featured Image..."
                    value={isCustomSeo ? seoImage : computedSeoImage}
                    onChange={(e) => setSeoImage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1f293d]">
            <button
              type="button"
              onClick={() => dispatch(setAddProductModalOpen(false))}
              className="px-5 py-2.5 rounded-lg border border-[#1f293d] text-gray-300 hover:text-white hover:bg-[#1f293d] text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              {editingProduct ? "Save Changes to MySQL" : "Publish Product to MySQL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

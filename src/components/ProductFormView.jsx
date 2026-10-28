import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Sparkles,
  Image as ImageIcon,
  CheckCircle,
  Tag,
  Percent,
  Palette,
  Truck,
  Phone,
  MessageCircle,
  ListPlus,
  ShieldCheck,
  Globe,
  FileText,
} from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { setCurrentTab, setEditingProduct } from "../store/slices/uiSlice";
import {
  createProductApi,
  updateProductApi,
} from "../store/slices/productsSlice";

export function ProductFormView() {
  const dispatch = useDispatch();
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

  // Key Features
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [newKeyFeature, setNewKeyFeature] = useState("");

  // Benefits
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState("");

  // Facilities
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState("");

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoImage, setSeoImage] = useState("");
  const [isCustomSeo, setIsCustomSeo] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState("basic"); // 'basic' | 'description' | 'media' | 'variants' | 'features' | 'seo'
  const [saving, setSaving] = useState(false);

  // Pre-fill on editing or reset on add
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setCategory(editingProduct.category || "");
      setBrand(editingProduct.brand || "Prestige");
      setDescription(editingProduct.description || "");
      setRegularPrice(
        editingProduct.regularPrice ? String(editingProduct.regularPrice) : ""
      );
      setSalePrice(
        editingProduct.salePrice ? String(editingProduct.salePrice) : ""
      );
      setStock(
        editingProduct.stock !== undefined ? String(editingProduct.stock) : "50"
      );
      setFeaturedImage(editingProduct.featuredImage || "");
      setGalleryImages(
        Array.isArray(editingProduct.galleryImages)
          ? editingProduct.galleryImages
          : []
      );
      setVariants(
        Array.isArray(editingProduct.variants) ? editingProduct.variants : []
      );
      setKeyFeatures(
        Array.isArray(editingProduct.keyFeatures)
          ? editingProduct.keyFeatures
          : []
      );
      setBenefits(
        Array.isArray(editingProduct.benefits) ? editingProduct.benefits : []
      );
      setFacilities(
        Array.isArray(editingProduct.facilities) ? editingProduct.facilities : []
      );
      setDeliveryInside(
        editingProduct.deliveryInside !== undefined
          ? String(editingProduct.deliveryInside)
          : "60"
      );
      setDeliveryOutside(
        editingProduct.deliveryOutside !== undefined
          ? String(editingProduct.deliveryOutside)
          : "120"
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
      setCategory(""); // Optional!
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
        {
          name: "Yellow (হলুদ)",
          slug: "yellow",
          image: "/products/thumb-yellow.png",
        },
        {
          name: "Sky Blue (আকাশী নীল)",
          slug: "sky-blue",
          image: "/products/cooker-blue-main.png",
        },
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
  }, [editingProduct]);

  // Real-time discount calculation
  const numRegular = parseFloat(regularPrice) || 0;
  const numSale = parseFloat(salePrice) || 0;
  const discountPercent =
    numRegular > numSale && numRegular > 0
      ? Math.round(((numRegular - numSale) / numRegular) * 100)
      : 0;

  // Auto SEO values
  const computedSeoTitle =
    isCustomSeo && seoTitle
      ? seoTitle
      : name
      ? `${name} | WideTech Enterprise`
      : "Product Title | WideTech";
  const computedSeoDesc =
    isCustomSeo && seoDescription
      ? seoDescription
      : description
      ? description.replace(/<[^>]*>?/gm, "").slice(0, 160)
      : "Discover quality products at best price.";
  const computedSeoImage =
    isCustomSeo && seoImage ? seoImage : featuredImage || "";

  // Clean HTML to strip unwanted inline background colors from pasted text
  const cleanHtmlBackground = (html) => {
    if (!html) return "";
    return html
      .replace(/background-color\s*:\s*[^;"]*;?/gi, "")
      .replace(/background\s*:\s*[^;"]*;?/gi, "");
  };

  // Quill Toolbar Config & Clipboard Matchers
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }],
      ["blockquote", "code-block"],
      ["link", "clean"],
    ],
    clipboard: {
      matchVisual: false,
      matchers: [
        [
          typeof Node !== "undefined" ? Node.ELEMENT_NODE : 1,
          (node, delta) => {
            if (node.style) {
              node.style.backgroundColor = "";
              node.style.background = "";
            }
            if (delta && delta.ops) {
              delta.ops.forEach((op) => {
                if (op.attributes && op.attributes.background) {
                  delete op.attributes.background;
                }
              });
            }
            return delta;
          },
        ],
      ],
    },
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "blockquote",
    "code-block",
    "link",
  ];

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
          image:
            newVariantImage.trim() ||
            featuredImage ||
            "/products/thumb-yellow.png",
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

  const handleBack = () => {
    dispatch(setEditingProduct(null));
    dispatch(setCurrentTab("products"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("অনুগ্রহ করে প্রোডাক্টের নাম (Title) লিখুন।");
      return;
    }
    if (!salePrice) {
      alert("অনুগ্রহ করে বিক্রয় মূল্য (Sale Price) লিখুন।");
      return;
    }

    setSaving(true);

    const payload = {
      name: name.trim(),
      category: category.trim() || "General", // Optional!
      brand: brand.trim() || "Prestige",
      description: cleanHtmlBackground(description),
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
      handleBack();
    } catch (err) {
      alert("Failed to save product in MySQL: " + err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#111827] border border-[#1f293d]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="p-2 rounded-lg bg-[#0d131f] border border-[#1f293d] text-gray-400 hover:text-white hover:bg-[#1a2333] transition-colors cursor-pointer"
            title="Back to Products"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Products Management
              </span>
              <span className="text-gray-500">/</span>
              <span className="text-xs text-gray-400">
                {editingProduct ? "Edit Product" : "New Product"}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-0.5">
              {editingProduct ? `Edit: ${editingProduct.name}` : "Create New Product"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 rounded-lg bg-[#0d131f] border border-[#1f293d] text-gray-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : editingProduct ? "Save Changes" : "Publish Product"}</span>
          </button>
        </div>
      </div>

      {/* Main Card with Tabs */}
      <div className="rounded-xl bg-[#111827] border border-[#1f293d] overflow-hidden shadow-xl">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1f293d] px-6 bg-[#0e1522] overflow-x-auto">
          {[
            { id: "basic", label: "1. Info & Pricing", icon: <Tag className="w-4 h-4" /> },
            { id: "description", label: "2. Rich Description (Quill)", icon: <FileText className="w-4 h-4" /> },
            { id: "media", label: "3. Images & Gallery", icon: <ImageIcon className="w-4 h-4" /> },
            { id: "variants", label: "4. Color Variants (কালার)", icon: <Palette className="w-4 h-4" /> },
            { id: "features", label: "5. Features & প্যাকেজ", icon: <ListPlus className="w-4 h-4" /> },
            { id: "seo", label: "6. Auto SEO Engine", icon: <Globe className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400 bg-blue-500/5"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Form Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: BASIC INFO & PRICING */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Product Title (পণ্যের নাম) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Prestige 3.0L Multi Purpose Cooker - All-in-One Cooking Solution!"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Category (ক্যাটাগরি)
                    </label>
                    <span className="text-[11px] text-gray-400 italic">Optional</span>
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="">None / Uncategorized</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.icon || "📁"} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Brand (ব্র্যান্ডের নাম)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: Prestige"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Stock Quantity (মজুত সংখ্যা)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Pricing Matrix */}
              <div className="p-5 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-blue-400" />
                    Price & Discount Matrix
                  </span>
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5" />
                      {discountPercent}% OFF (ছাড়)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Regular Price (আগের প্রাইস ৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="e.g. 1499"
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Sale Price (এখন অফার প্রাইস ৳) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      placeholder="e.g. 999"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 font-bold text-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery & Order Contact */}
              <div className="p-5 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
                <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-400" />
                  ডেলিভারি চার্জ ও কন্টাক্ট ইনফরমেশন
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      ঢাকা সিটির ভেতরে চার্জ (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={deliveryInside}
                      onChange={(e) => setDeliveryInside(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      ঢাকা সিটির বাইরে চার্জ (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={deliveryOutside}
                      onChange={(e) => setDeliveryOutside(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      কল করার মোবাইল নাম্বার
                    </label>
                    <input
                      type="text"
                      placeholder="0123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      হোয়াটসঅ্যাপ নাম্বার (Country Code সহ)
                    </label>
                    <input
                      type="text"
                      placeholder="880123456789"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RICH DESCRIPTION WITH QUILL EDITOR */}
          {activeTab === "description" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Product Detailed Description (রিস্ক টেক্সট বিবরণ)</span>
                  <span className="text-[11px] text-blue-400 font-mono lowercase">Powered by React Quill New</span>
                </label>
                <p className="text-xs text-gray-400 mb-3">
                  এখানে আপনি হেডলাইন, বোল্ড টেক্সট, বুলেট লিস্ট, কালার ও প্যারাগ্রাফ স্টাইল দিয়ে চমৎকার বিবরণ লিখতে পারেন যা সরাসরি ওয়েবসাইটে রেন্ডার হবে।
                </p>

                {/* ReactQuill Editor with dark styling */}
                <div className="bg-[#0d131f] rounded-xl border border-[#1f293d] overflow-hidden text-gray-100 quill-dark-wrapper">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={(val) => setDescription(cleanHtmlBackground(val))}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="পণ্যটির আকর্ষণীয় বিবরণ, স্পেসিফিকেশন ও বিস্তারিত এখানে লিখুন..."
                    className="min-h-[280px]"
                  />
                </div>
              </div>

              {/* Live HTML Preview Box */}
              {description && (
                <div className="p-4 rounded-xl bg-[#090e17] border border-[#1f293d] space-y-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Website Display Live Preview
                  </div>
                  <div
                    className="text-xs text-gray-300 space-y-2 p-3 rounded-lg bg-[#111827] border border-[#1f293d] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-bold [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_h3]:font-bold"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MEDIA & GALLERY */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Featured Image URL (প্রধান ছবি)
                </label>
                <input
                  type="text"
                  placeholder="/products/cooker-blue-main.png বা https://..."
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0d131f] border border-[#1f293d] text-white text-sm focus:outline-none focus:border-blue-500"
                />
                {featuredImage && (
                  <div className="mt-3 relative w-32 h-32 rounded-lg overflow-hidden border border-[#1f293d] bg-white p-2">
                    <img
                      src={featuredImage}
                      alt="Featured Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Gallery Images Array */}
              <div className="p-5 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
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
                    className="flex-1 px-4 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                    {galleryImages.map((img, i) => (
                      <div
                        key={i}
                        className="relative group rounded-lg overflow-hidden border border-[#23334d] h-28 bg-white p-2"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute top-1 right-1 p-1.5 rounded-md bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
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

          {/* TAB 4: COLOR VARIANTS */}
          {activeTab === "variants" && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#090e17] p-4 rounded-lg border border-[#1f293d]">
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] text-gray-400 mb-1">
                      Color Name (যেমন: Sky Blue)
                    </label>
                    <input
                      type="text"
                      placeholder="Sky Blue (আকাশী নীল)"
                      value={newVariantName}
                      onChange={(e) => setNewVariantName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-md bg-[#0d131f] border border-[#23334d] text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] text-gray-400 mb-1">
                      Slug (যেমন: sky-blue)
                    </label>
                    <input
                      type="text"
                      placeholder="sky-blue"
                      value={newVariantSlug}
                      onChange={(e) => setNewVariantSlug(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-md bg-[#0d131f] border border-[#23334d] text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] text-gray-400 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="/products/cooker-blue-main.png"
                      value={newVariantImage}
                      onChange={(e) => setNewVariantImage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-md bg-[#0d131f] border border-[#23334d] text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="w-full py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Variants List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {variants.length === 0 ? (
                    <p className="col-span-2 text-xs text-gray-500 italic text-center py-6">
                      কোনো কালার ভ্যারিয়েন্ট যোগ করা হয়নি। উপরে ফর্ম ব্যবহার করে কালার অপশন যোগ করুন।
                    </p>
                  ) : (
                    variants.map((v, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#090e17] border border-[#1f293d]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-md overflow-hidden bg-white border border-gray-300 p-1 flex items-center justify-center">
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
                          className="p-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
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

          {/* TAB 5: FEATURES, BENEFITS & PACKAGE */}
          {activeTab === "features" && (
            <div className="space-y-6">
              {/* KEY FEATURES */}
              <div className="p-5 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ListPlus className="w-4 h-4 text-blue-400" />
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
                    className="flex-1 px-4 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyFeature}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#090e17] border border-[#1f293d] text-xs text-gray-200"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyFeature(idx)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* BENEFITS (কেন এটি আপনার পছন্দের তালিকায় থাকবে?) */}
              <div className="p-5 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
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
                    className="flex-1 px-4 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#090e17] border border-[#1f293d] text-xs text-gray-200"
                    >
                      <span>• {b}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(idx)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FACILITIES / PACKAGE (প্যাকেজে যা যা থাকছে) */}
              <div className="p-5 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
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
                    className="flex-1 px-4 py-2 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddFacility}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#090e17] border border-[#1f293d] text-xs text-gray-200"
                    >
                      <span>✔ {fac}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFacility(idx)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SEO ENGINE */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[#0e1624] border border-[#1f293d] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-400" />
                    Search Engine Optimization (SEO)
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
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    disabled={!isCustomSeo}
                    placeholder="Auto generated from Title..."
                    value={isCustomSeo ? seoTitle : computedSeoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    disabled={!isCustomSeo}
                    placeholder="Auto generated from Description..."
                    value={isCustomSeo ? seoDescription : computedSeoDesc}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Social Share Image
                  </label>
                  <input
                    type="text"
                    disabled={!isCustomSeo}
                    placeholder="Auto generated from Featured Image..."
                    value={isCustomSeo ? seoImage : computedSeoImage}
                    onChange={(e) => setSeoImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#090e17] border border-[#1f293d] text-white text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#1f293d]">
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-lg border border-[#1f293d] text-gray-300 hover:text-white hover:bg-[#1f293d] text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{saving ? "Saving..." : editingProduct ? "Save Changes to MySQL" : "Publish Product to MySQL"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

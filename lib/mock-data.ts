// ============================================
// SENANG SYNC — MOCK DATA (Hardcoded for Phase 1)
// ============================================

export type Lang = "bm" | "en";
export type Theme = "malaysia" | "selangor" | "penang" | "sabah" | "johor" | "kelantan";
export type FolderColor = string;
export type ResourceType = "document" | "link";
export type SubscriptionCategory = "utilities" | "design" | "marketing" | "production" | "website" | "other";
export type ProductCategory = "physical" | "digital" | "service";
export type ProductStatus = "active" | "draft" | "archived";

export interface Workspace {
  id: string;
  name: string;
  theme: Theme;
  language: Lang;
  currency: string;
  avatar: string;
  type: "business" | "personal";
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  colorClass: string;
  resourceCount: number;
  workspaceId: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  folderId: string;
  url?: string;
  fileSize?: string;
  description?: string;
  expiryDate?: string;
  tags: string[];
  createdAt: string;
  workspaceId: string;
}

export interface Subscription {
  id: string;
  serviceName: string;
  category: SubscriptionCategory;
  cost: number;
  renewalDate: string;
  billingSource: string;
  logo?: string;
  isActive: boolean;
  workspaceId: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: ProductCategory;
  thumbnailUrl?: string;
  salesUrl?: string;
  status: ProductStatus;
  workspaceId: string;
  createdAt: string;
}

// ============================================
// MOCK WORKSPACES
// ============================================

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: "ws-1",
    name: "Kedai Kek Alia",
    theme: "malaysia",
    language: "bm",
    currency: "MYR",
    avatar: "🎂",
    type: "business",
  },
  {
    id: "ws-2",
    name: "Studio Grafik Faiz",
    theme: "selangor",
    language: "bm",
    currency: "MYR",
    avatar: "🎨",
    type: "business",
  },
  {
    id: "ws-3",
    name: "Personal",
    theme: "penang",
    language: "en",
    currency: "MYR",
    avatar: "👤",
    type: "personal",
  },
];

// ============================================
// MOCK FOLDERS
// ============================================

export const MOCK_FOLDERS: Folder[] = [
  {
    id: "f-1",
    name: "Dokumen Syarikat",
    color: "#CC0001",
    colorClass: "folder-malaysia-1",
    resourceCount: 8,
    workspaceId: "ws-1",
    updatedAt: "2026-06-18",
  },
  {
    id: "f-2",
    name: "Kewangan",
    color: "#F4C542",
    colorClass: "folder-malaysia-2",
    resourceCount: 12,
    workspaceId: "ws-1",
    updatedAt: "2026-06-17",
  },
  {
    id: "f-3",
    name: "Pemasaran",
    color: "#003087",
    colorClass: "folder-malaysia-3",
    resourceCount: 5,
    workspaceId: "ws-1",
    updatedAt: "2026-06-15",
  },
  {
    id: "f-4",
    name: "Sijil & Lesen",
    color: "#8a0001",
    colorClass: "folder-malaysia-4",
    resourceCount: 3,
    workspaceId: "ws-1",
    updatedAt: "2026-06-10",
  },
  {
    id: "f-5",
    name: "Link Produk",
    color: "#CC0001",
    colorClass: "folder-malaysia-1",
    resourceCount: 9,
    workspaceId: "ws-1",
    updatedAt: "2026-06-20",
  },
  {
    id: "f-6",
    name: "Konten & Canva",
    color: "#F4C542",
    colorClass: "folder-malaysia-2",
    resourceCount: 24,
    workspaceId: "ws-1",
    updatedAt: "2026-06-19",
  },
];

// ============================================
// MOCK RESOURCES
// ============================================

export const MOCK_RESOURCES: Resource[] = [
  {
    id: "r-1",
    name: "SSM Pendaftaran Syarikat",
    type: "document",
    folderId: "f-4",
    fileSize: "1.2 MB",
    description: "Sijil pendaftaran SSM terkini",
    expiryDate: "2026-12-31",
    tags: ["ssm", "sijil", "penting"],
    createdAt: "2026-01-15",
    workspaceId: "ws-1",
  },
  {
    id: "r-2",
    name: "Borang Payment Toyyibpay",
    type: "link",
    folderId: "f-5",
    url: "https://toyyibpay.com/kedaikekalia",
    description: "Link payment untuk order kek",
    tags: ["payment", "order"],
    createdAt: "2026-02-01",
    workspaceId: "ws-1",
  },
  {
    id: "r-3",
    name: "Penyata Bank Mei 2026",
    type: "document",
    folderId: "f-2",
    fileSize: "845 KB",
    description: "Penyata bank Maybank bulan Mei",
    tags: ["bank", "kewangan", "mei"],
    createdAt: "2026-06-01",
    workspaceId: "ws-1",
  },
  {
    id: "r-4",
    name: "Google Form Tempahan Kek",
    type: "link",
    folderId: "f-5",
    url: "https://forms.gle/xyz123",
    description: "Borang tempahan untuk event & wedding",
    tags: ["tempahan", "google form"],
    createdAt: "2026-03-10",
    workspaceId: "ws-1",
  },
  {
    id: "r-5",
    name: "Sijil Halal JAKIM",
    type: "document",
    folderId: "f-4",
    fileSize: "2.1 MB",
    expiryDate: "2026-09-15",
    description: "Sijil halal untuk produk bakeri",
    tags: ["halal", "jakim", "sijil"],
    createdAt: "2024-09-15",
    workspaceId: "ws-1",
  },
  {
    id: "r-6",
    name: "Website Kedai Kek",
    type: "link",
    folderId: "f-5",
    url: "https://kedaikekalia.my",
    description: "Laman web rasmi kedai",
    tags: ["website", "online"],
    createdAt: "2026-01-01",
    workspaceId: "ws-1",
  },
];

// ============================================
// MOCK SUBSCRIPTIONS
// ============================================

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub-1",
    serviceName: "Canva Pro",
    category: "design",
    cost: 55,
    renewalDate: "2026-06-27",
    billingSource: "Kad Kredit Maybank",
    isActive: true,
    workspaceId: "ws-1",
  },
  {
    id: "sub-2",
    serviceName: "Shopify",
    category: "website",
    cost: 142,
    renewalDate: "2026-07-01",
    billingSource: "Kad Kredit CIMB",
    isActive: true,
    workspaceId: "ws-1",
  },
  {
    id: "sub-3",
    serviceName: "Google Workspace",
    category: "production",
    cost: 28,
    renewalDate: "2026-07-15",
    billingSource: "TNG eWallet",
    isActive: true,
    workspaceId: "ws-1",
  },
  {
    id: "sub-4",
    serviceName: "Unifi Business",
    category: "utilities",
    cost: 199,
    renewalDate: "2026-07-03",
    billingSource: "Autodebit Maybank",
    isActive: true,
    workspaceId: "ws-1",
  },
  {
    id: "sub-5",
    serviceName: "Meta Ads (Budget)",
    category: "marketing",
    cost: 500,
    renewalDate: "2026-07-01",
    billingSource: "Kad Kredit Maybank",
    isActive: true,
    workspaceId: "ws-1",
  },
  {
    id: "sub-6",
    serviceName: "Notion",
    category: "production",
    cost: 18,
    renewalDate: "2026-08-10",
    billingSource: "TNG eWallet",
    isActive: true,
    workspaceId: "ws-1",
  },
  {
    id: "sub-7",
    serviceName: "Adobe Illustrator",
    category: "design",
    cost: 99,
    renewalDate: "2026-09-01",
    billingSource: "Kad Kredit CIMB",
    isActive: false,
    workspaceId: "ws-1",
  },
];

// ============================================
// MOCK PRODUCTS
// ============================================

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p-1",
    name: "Kek Red Velvet",
    tagline: "Classic yang tak pernah lama",
    description:
      "Kek Red Velvet signature kami dengan cream cheese frosting. Sesuai untuk birthday, anniversary, dan majlis.",
    price: 95,
    category: "physical",
    thumbnailUrl: "",
    salesUrl: "https://shopee.com.my/kedaikekalia/red-velvet",
    status: "active",
    workspaceId: "ws-1",
    createdAt: "2026-01-10",
  },
  {
    id: "p-2",
    name: "Kek Ombre Marble",
    tagline: "Cantik untuk dipandang, lazat untuk dimakan",
    description:
      "Kek ombre marble 3 tier dengan fondant custom. Sesuai untuk wedding dan event korporat.",
    price: 350,
    category: "physical",
    thumbnailUrl: "",
    salesUrl: "https://shopee.com.my/kedaikekalia/marble",
    status: "active",
    workspaceId: "ws-1",
    createdAt: "2026-02-05",
  },
  {
    id: "p-3",
    name: "Tempahan Kek Custom",
    tagline: "Design apa pun, kami boleh buat",
    description:
      "Perkhidmatan tempahan kek custom fully personalized. Konsultasi percuma, siap dalam 5-7 hari bekerja.",
    price: 180,
    category: "service",
    salesUrl: "https://forms.gle/xyz123",
    status: "active",
    workspaceId: "ws-1",
    createdAt: "2026-01-01",
  },
  {
    id: "p-4",
    name: "E-Book Resepi Kek Viral",
    tagline: "20 resepi terbukti laris",
    description:
      "Koleksi 20 resepi kek yang dah terbukti viral di TikTok dan Instagram. PDF instant download.",
    price: 29,
    category: "digital",
    salesUrl: "https://gumroad.com/kedaikekalia/ebook",
    status: "active",
    workspaceId: "ws-1",
    createdAt: "2026-04-15",
  },
  {
    id: "p-5",
    name: "Cupcake Set (12 biji)",
    tagline: "Sweet untuk setiap majlis",
    description: "Set 12 cupcake dengan topping custom. Boleh pilih rasa: Vanilla, Chocolate, Strawberry.",
    price: 65,
    category: "physical",
    status: "draft",
    workspaceId: "ws-1",
    createdAt: "2026-06-01",
  },
];

// ============================================
// COMPUTED / DERIVED DATA
// ============================================

export const getTotalMonthlyBurn = (subscriptions: Subscription[]): number =>
  subscriptions.filter((s) => s.isActive).reduce((acc, s) => acc + s.cost, 0);

export const getUpcomingRenewals = (subscriptions: Subscription[], days = 7): Subscription[] => {
  const now = new Date();
  const threshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return subscriptions.filter((s) => {
    const renewal = new Date(s.renewalDate);
    return renewal >= now && renewal <= threshold && s.isActive;
  });
};

export const getExpiringDocs = (resources: Resource[], days = 30): Resource[] => {
  const now = new Date();
  const threshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return resources.filter((r) => {
    if (!r.expiryDate) return false;
    const expiry = new Date(r.expiryDate);
    return expiry >= now && expiry <= threshold;
  });
};

export const getCategoryBreakdown = (
  subscriptions: Subscription[]
): Record<SubscriptionCategory, number> => {
  const breakdown: Record<string, number> = {};
  subscriptions
    .filter((s) => s.isActive)
    .forEach((s) => {
      breakdown[s.category] = (breakdown[s.category] || 0) + s.cost;
    });
  return breakdown as Record<SubscriptionCategory, number>;
};

export const CATEGORY_LABELS_BM: Record<SubscriptionCategory, string> = {
  utilities: "Utiliti",
  design: "Reka Bentuk",
  marketing: "Pemasaran",
  production: "Pengeluaran",
  website: "Laman Web",
  other: "Lain-lain",
};

export const CATEGORY_LABELS_EN: Record<SubscriptionCategory, string> = {
  utilities: "Utilities",
  design: "Design",
  marketing: "Marketing",
  production: "Production",
  website: "Website",
  other: "Other",
};

export const PRODUCT_CATEGORY_LABELS_BM: Record<ProductCategory, string> = {
  physical: "Fizikal",
  digital: "Digital",
  service: "Perkhidmatan",
};

export const PRODUCT_CATEGORY_LABELS_EN: Record<ProductCategory, string> = {
  physical: "Physical",
  digital: "Digital",
  service: "Service",
};

export const THEME_LABELS: Record<Theme, string> = {
  malaysia: "Malaysia 🇲🇾",
  selangor: "Selangor",
  penang: "Pulau Pinang",
  sabah: "Sabah",
  johor: "Johor",
  kelantan: "Kelantan",
};

export const THEME_COLORS: Record<Theme, { primary: string; secondary: string }> = {
  malaysia: { primary: "#CC0001", secondary: "#F4C542" },
  selangor: { primary: "#C8102E", secondary: "#F4C542" },
  penang: { primary: "#003087", secondary: "#F7A81B" },
  sabah: { primary: "#00A3E0", secondary: "#1B2A47" },
  johor: { primary: "#003087", secondary: "#C8102E" },
  kelantan: { primary: "#CC0001", secondary: "#8B0000" },
};

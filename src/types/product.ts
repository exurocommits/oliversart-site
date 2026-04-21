export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  inStock: boolean;
  sku?: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  slug: string;
  sku?: string;
  title: string;
  artistId: string;
  categoryId: string;
  subcategoryId?: string;
  collectionId?: string;
  price: number;
  salePrice?: number;
  currency: string;
  editionType: "limited" | "open" | "artist-proof";
  editionSize?: number;
  editionRemaining?: number;
  editionNumber?: string;
  isSigned: boolean;
  isNumbered: boolean;
  images: ProductImage[];
  primaryImageId: string;
  variants?: ProductVariant[];
  description: string;
  shortDescription: string;
  specifications?: {
    imageWidth?: number;
    imageHeight?: number;
    paperWidth?: number;
    paperHeight?: number;
    paperType?: string;
    printingMethod?: string;
    editionInfo?: string;
  };
  status: "active" | "draft" | "archived";
  inStock: boolean;
  stockLevel?: number;
  isFeatured: boolean;
  isNew: boolean;
  sortOrder?: number;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  historicalContext?: {
    aircraft?: string;
    era?: string;
    race?: string;
    event?: string;
    date?: string;
    location?: string;
    notes?: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  parentId?: string;
  icon?: string;
  image?: string;
  color?: string;
  sortOrder: number;
  showInNav: boolean;
  showInFooter: boolean;
  metaTitle?: string;
  metaDescription?: string;
  subcategories?: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  bio: string;
  shortBio: string;
  photo?: string;
  signatureImage?: string;
  credentials?: string[];
  achievements?: string[];
  website?: string;
  instagram?: string;
  twitter?: string;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  productIds: string[];
  showOnHomepage: boolean;
  sortOrder: number;
  startDate?: Date;
  endDate?: Date;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

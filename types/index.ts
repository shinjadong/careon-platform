// 사용자 및 인증 타입
export interface IUser {
  id: string;
  email: string;
  businessName: string;
  businessNumber: string;
  businessType: 'FRANCHISE' | 'INDEPENDENT';
  contactName: string;
  contactPhone: string;
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  postalCode: string;
  address: string;
  addressDetail: string;
}

// 상품 카테고리 타입
export interface ICategory {
  id: number;
  name: string;
  slug: string;
  imagePath?: string;
  description?: string;
  parentId?: number;
  children?: ICategory[];
  displayOrder: number;
  isActive: boolean;
}

// 상품 타입
export interface IProduct {
  id: string;
  categoryId: number;
  name: string;
  manufacturer: string;
  model: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: IProductImage[];
  rentalPlans: IRentalPlan[];
  partnerId: string;
  tags: string[];
  isRecommended: boolean;
  createdAt: Date;
}

export interface IProductImage {
  id?: string; // Optional ID for image identification
  url: string;
  alt: string;
  isMain: boolean;
}

export interface IRentalPlan {
  id: string;
  productId: string;
  duration: number;
  monthlyFee: number;
  principalAmount?: number;
  installationFee: number;
  maintenanceFee: number;
  deposit: number;
  benefits: string[];
}

// 견적 타입
export interface IQuote {
  id: string;
  userId: string;
  items: IQuoteItem[];
  totalMonthlyFee: number;
  totalInstallationFee: number;
  status: 'DRAFT' | 'SENT' | 'CONFIRMED' | 'EXPIRED';
  validUntil: Date;
  createdAt: Date;
}

export interface IQuoteItem {
  id?: string; // Optional for new items
  productId: string;
  productName?: string; // Cached for display
  productModel?: string; // Cached for display
  rentalPlanId: string;
  rentalPlanName?: string; // Cached for display
  monthlyFee?: number; // Cached for calculation
  installationFee?: number; // Cached for calculation
  contractPeriod?: number; // Cached for display
  quantity: number;
  customOptions?: Record<string, unknown>;
}

// 계약 타입
export interface IContract {
  id: string;
  quoteId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: 'ACTIVE' | 'TERMINATED' | 'EXPIRED';
  documents: IContractDocument[];
  signedAt?: Date;
}

export interface IContractDocument {
  id: string;
  type: string;
  url: string;
  createdAt: Date;
}

// 파트너 타입
export interface IPartner {
  id: string;
  companyName: string;
  businessNumber: string;
  categories: number[];
  serviceAreas: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
}

// Page model for database
export interface IPage {
  id: string;
  slug: string;
  title: string;
  blocks: Block[];
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

// API response types
export interface IPageResponse {
  success: boolean;
  data?: IPage;
  error?: string;
}

export interface IPageUpdateRequest {
  title?: string;
  blocks?: Block[];
  status?: 'draft' | 'published';
} 
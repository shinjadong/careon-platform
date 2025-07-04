import { create } from 'zustand';
import { IQuote, IQuoteItem, IProduct } from '@/types';

interface IQuoteState {
  currentQuote: IQuote | null;
  items: IQuoteItem[];
  totalAmount: number;
  isLoading: boolean;
}

interface IQuoteActions {
  addItem: (product: IProduct, rentalPlanId: string) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  updateItemPlan: (productId: string, rentalPlanId: string) => void;
  calculateTotal: () => void;
  clearQuote: () => void;
  setCurrentQuote: (quote: IQuote) => void;
  setLoading: (loading: boolean) => void;
}

type IQuoteStore = IQuoteState & IQuoteActions;

export const useQuoteStore = create<IQuoteStore>((set, get) => ({
  // Initial state
  currentQuote: null,
  items: [],
  totalAmount: 0,
  isLoading: false,

  // Actions
  addItem: (product: IProduct, rentalPlanId: string) => {
    const { items } = get();
    const existingItem = items.find(item => item.productId === product.id);
    
    if (existingItem) {
      // 이미 있는 상품이면 수량 증가
      set({
        items: items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      // 새로운 상품 추가
      const selectedPlan = product.rentalPlans.find(plan => plan.id === rentalPlanId);
      if (selectedPlan) {
        const newItem: IQuoteItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          productName: product.name,
          productModel: product.model,
          rentalPlanId: selectedPlan.id,
          rentalPlanName: `플랜 ${selectedPlan.id} - ${selectedPlan.duration}개월`,
          monthlyFee: selectedPlan.monthlyFee,
          installationFee: selectedPlan.installationFee,
          contractPeriod: selectedPlan.duration,
          quantity: 1,
        };
        
        set({
          items: [...items, newItem],
        });
      }
    }
    
    // 총액 재계산
    get().calculateTotal();
  },

  removeItem: (productId: string) => {
    const { items } = get();
    set({
      items: items.filter(item => item.productId !== productId),
    });
    get().calculateTotal();
  },

  updateItemQuantity: (productId: string, quantity: number) => {
    const { items } = get();
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    set({
      items: items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ),
    });
    get().calculateTotal();
  },

  updateItemPlan: (productId: string, rentalPlanId: string) => {
    const { items } = get();
    // 실제로는 API에서 새로운 플랜 정보를 가져와야 함
    // 여기서는 임시로 처리
    set({
      items: items.map(item =>
        item.productId === productId
          ? { ...item, rentalPlanId }
          : item
      ),
    });
    get().calculateTotal();
  },

  calculateTotal: () => {
    const { items } = get();
    const totalMonthlyFee = items.reduce(
      (sum, item) => sum + (item.monthlyFee * item.quantity),
      0
    );
    const totalInstallationFee = items.reduce(
      (sum, item) => sum + (item.installationFee * item.quantity),
      0
    );
    
    set({
      totalAmount: totalMonthlyFee + totalInstallationFee,
    });
  },

  clearQuote: () => {
    set({
      currentQuote: null,
      items: [],
      totalAmount: 0,
    });
  },

  setCurrentQuote: (quote: IQuote) => {
    set({
      currentQuote: quote,
      items: quote.items || [],
    });
    get().calculateTotal();
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
})); 
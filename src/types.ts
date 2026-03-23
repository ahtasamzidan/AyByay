export type Language = 'bn' | 'en';
export type CurrencyCode = 'BDT' | 'USD' | 'MYR' | 'EUR' | 'GBP' | 'INR' | 'SAR' | 'AED';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export interface Category {
  id: string;
  name: {
    bn: string;
    en: string;
  };
  icon: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  currency: CurrencyCode;
  type: 'income' | 'expense';
  date: string;
  category: string;
  accountId: string;
}

export interface BudgetData {
  month: {
    bn: string;
    en: string;
  };
  totalBudget: number;
  spent: number;
  income: number;
  expense: number;
}

export interface CategoryBudget {
  categoryId: string;
  amount: number;
  currency: CurrencyCode;
}

export interface Account {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'mobile';
  balance: number;
  currency: CurrencyCode;
}

export interface UserProfile {
  name: string;
  photo: string;
}

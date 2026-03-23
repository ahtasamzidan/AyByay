import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  Plus, 
  Home, 
  BarChart2, 
  RefreshCw, 
  Target, 
  Utensils, 
  ShoppingCart, 
  Fuel, 
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  Languages,
  X,
  Calendar,
  Trash2,
  Edit2,
  Camera,
  ChevronDown,
  Info,
  Phone,
  FileText,
  ShieldCheck,
  ExternalLink,
  Coffee,
  Car,
  Gift,
  Heart,
  Zap,
  Briefcase,
  Music,
  Plane,
  Globe,
  Smartphone,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Language, Transaction, CategoryBudget, Account, UserProfile, CurrencyCode, Category } from './types';
import { TRANSLATIONS, CATEGORIES, COLORS, CURRENCIES } from './constants';
import { 
  Wallet,
  CreditCard,
  Banknote,
  PlusCircle,
  CheckCircle
} from 'lucide-react';

const formatCurrency = (amount: number, currencyCode: CurrencyCode | '' = 'BDT') => {
  const code = currencyCode || 'BDT';
  const currency = CURRENCIES.find(c => c.code === code);
  const symbol = currency?.symbol || '৳';
  return `${symbol} ${amount.toLocaleString('en-IN')}`;
};

const IconComponent = ({ name, className, size = 20 }: { name: string, className?: string, size?: number }) => {
  const props = { className, size };
  switch (name) {
    case 'Utensils': return <Utensils {...props} />;
    case 'ShoppingCart': return <ShoppingCart {...props} />;
    case 'Fuel': return <Fuel {...props} />;
    case 'TrendingUp': return <TrendingUp {...props} />;
    case 'Home': return <Home {...props} />;
    case 'Target': return <Target {...props} />;
    case 'Coffee': return <Coffee {...props} />;
    case 'Car': return <Car {...props} />;
    case 'Gift': return <Gift {...props} />;
    case 'Heart': return <Heart {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Briefcase': return <Briefcase {...props} />;
    case 'Music': return <Music {...props} />;
    case 'Plane': return <Plane {...props} />;
    case 'Smartphone': return <Smartphone {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Bell': return <Bell {...props} />;
    case 'Menu': return <Menu {...props} />;
    case 'Plus': return <Plus {...props} />;
    case 'BarChart2': return <BarChart2 {...props} />;
    case 'RefreshCw': return <RefreshCw {...props} />;
    case 'X': return <X {...props} />;
    case 'Calendar': return <Calendar {...props} />;
    case 'Trash2': return <Trash2 {...props} />;
    case 'Edit2': return <Edit2 {...props} />;
    case 'Camera': return <Camera {...props} />;
    case 'ChevronDown': return <ChevronDown {...props} />;
    case 'Info': return <Info {...props} />;
    case 'Phone': return <Phone {...props} />;
    case 'FileText': return <FileText {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'ExternalLink': return <ExternalLink {...props} />;
    case 'Sun': return <Sun {...props} />;
    case 'Moon': return <Moon {...props} />;
    default: return null;
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('aybyay_dark_mode');
    return saved === 'true';
  });
  const isDarkMode = darkMode;
  const [defaultCurrency, setDefaultCurrency] = useState<CurrencyCode | ''>(() => {
    const saved = localStorage.getItem('aybyay_currency');
    return (saved as CurrencyCode) || '';
  });
  const [exchangeRates, setExchangeRates] = useState<{ base: string, rates: Record<string, number> }>({ base: '', rates: {} });
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'budget'>('home');
  const [statsTimeframe, setStatsTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('aybyay_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('aybyay_accounts');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>(() => {
    const saved = localStorage.getItem('aybyay_budgets');
    return saved ? JSON.parse(saved) : [];
  });
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isManageCategoriesModalOpen, setIsManageCategoriesModalOpen] = useState(false);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [isNewAccountModalOpenDirect, setIsNewAccountModalOpenDirect] = useState(false);
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('aybyay_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('aybyay_profile');
    return saved ? JSON.parse(saved) : { name: '', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User' };
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [budgetFormData, setBudgetFormData] = useState({
    categoryId: '',
    amount: '',
    currency: defaultCurrency as CurrencyCode
  });
  const [accountFormData, setAccountFormData] = useState({
    name: '',
    type: 'cash' as 'cash' | 'bank' | 'mobile',
    balance: '',
    currency: defaultCurrency as CurrencyCode
  });
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense',
    accountId: '',
    currency: defaultCurrency as CurrencyCode
  });

  const [newCategoryData, setNewCategoryData] = useState({
    nameEn: '',
    nameBn: '',
    icon: 'Utensils'
  });

  const [newAccountData, setNewAccountData] = useState({
    name: '',
    type: 'cash' as 'cash' | 'bank' | 'mobile',
    balance: '',
    currency: defaultCurrency
  });

  const [showSavedToast, setShowSavedToast] = useState(false);

  const triggerSavedToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  // Persist data to localStorage
  React.useEffect(() => {
    localStorage.setItem('aybyay_currency', defaultCurrency);
  }, [defaultCurrency]);

  React.useEffect(() => {
    localStorage.setItem('aybyay_categories', JSON.stringify(categories));
  }, [categories]);

  React.useEffect(() => {
    localStorage.setItem('aybyay_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch exchange rates
  React.useEffect(() => {
    const fetchRates = async () => {
      if (!defaultCurrency) return;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
        
        const response = await fetch(`https://open.er-api.com/v6/latest/${defaultCurrency}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data && data.rates) {
          setExchangeRates({ base: defaultCurrency, rates: data.rates });
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.error('Exchange rate fetch timed out');
        } else {
          console.error('Failed to fetch exchange rates:', error);
        }
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 3600000); // Update every hour
    return () => clearInterval(interval);
  }, [defaultCurrency]);

  const convertCurrency = (amount: number, from: CurrencyCode | '', to: CurrencyCode | '') => {
    const fromCode = from || 'BDT';
    const toCode = to || 'BDT';
    if (fromCode === toCode) return amount;
    // If rates aren't loaded yet or are for a different base, return amount (fallback)
    if (!exchangeRates.rates || Object.keys(exchangeRates.rates).length === 0 || exchangeRates.base !== defaultCurrency) return amount;
    
    const rates = exchangeRates.rates;
    // If we have rates relative to 'toCode' (which is defaultCurrency), we can just divide
    if (toCode === defaultCurrency && rates[fromCode]) {
      return amount / rates[fromCode];
    }
    // If we have rates relative to 'fromCode', we can just multiply
    if (fromCode === defaultCurrency && rates[toCode]) {
      return amount * rates[toCode];
    }
    // Fallback to cross-rate if needed
    if (!rates[fromCode] || !rates[toCode]) return amount;
    const amountInBase = amount / rates[fromCode];
    return amountInBase * rates[toCode];
  };

  React.useEffect(() => {
    localStorage.setItem('aybyay_budgets', JSON.stringify(categoryBudgets));
  }, [categoryBudgets]);

  React.useEffect(() => {
    localStorage.setItem('aybyay_accounts', JSON.stringify(accounts));
  }, [accounts]);

  React.useEffect(() => {
    localStorage.setItem('aybyay_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const t = TRANSLATIONS[lang];

  const monthlyIncome = transactions
    .filter(tx => {
      const d = new Date(tx.date);
      return tx.type === 'income' && d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    })
    .reduce((sum, tx) => sum + convertCurrency(tx.amount, tx.currency, defaultCurrency), 0);

  const monthlyExpense = transactions
    .filter(tx => {
      const d = new Date(tx.date);
      return tx.type === 'expense' && d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    })
    .reduce((sum, tx) => sum + convertCurrency(tx.amount, tx.currency, defaultCurrency), 0);

  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + convertCurrency(tx.amount, tx.currency, defaultCurrency), 0);
  
  const totalExpense = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + convertCurrency(tx.amount, tx.currency, defaultCurrency), 0);

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAccountId) {
      setAccounts(prev => prev.map(acc => 
        acc.id === editingAccountId 
          ? { ...acc, name: accountFormData.name, type: accountFormData.type, balance: Number(accountFormData.balance), currency: accountFormData.currency }
          : acc
      ));
    } else {
      const newAccount: Account = {
        id: Date.now().toString(),
        name: accountFormData.name,
        type: accountFormData.type,
        balance: Number(accountFormData.balance),
        currency: accountFormData.currency
      };
      setAccounts(prev => [...prev, newAccount]);
    }
    triggerSavedToast();
    setIsAccountModalOpen(false);
    setEditingAccountId(null);
    setAccountFormData({ name: '', type: 'cash', balance: '', currency: defaultCurrency });
  };

  const handleEditAccount = (acc: Account) => {
    setEditingAccountId(acc.id);
    setAccountFormData({
      name: acc.name,
      type: acc.type,
      balance: acc.balance.toString(),
      currency: acc.currency
    });
    setIsAccountModalOpen(true);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  const getAccountIcon = (type: 'cash' | 'bank' | 'mobile', name?: string) => {
    const lowerName = name?.toLowerCase() || '';
    if (lowerName.includes('bkash')) {
      return (
        <img 
          src="https://download.logo.wine/logo/BKash/BKash-Icon-Logo.wine.png" 
          alt="bKash" 
          className="w-6 h-6 object-contain"
          referrerPolicy="no-referrer"
        />
      );
    }
    if (lowerName.includes('nagad')) {
      return (
        <img 
          src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png" 
          alt="Nagad" 
          className="w-6 h-6 object-contain"
          referrerPolicy="no-referrer"
        />
      );
    }

    switch (type) {
      case 'cash': return <Banknote size={20} />;
      case 'bank': return <Wallet size={20} />;
      case 'mobile': return <Smartphone size={20} />;
    }
  };

  const totalAccountBalance = accounts.reduce((sum, acc) => sum + convertCurrency(acc.balance, acc.currency, defaultCurrency), 0);
  const totalBudget = categoryBudgets.reduce((sum, b) => sum + convertCurrency(b.amount, b.currency, defaultCurrency), 0);
  const spent = monthlyExpense;
  const balance = monthlyIncome - monthlyExpense;
  const percentage = totalBudget > 0 ? Math.min((spent / totalBudget) * 100, 100) : 0;

  const toggleLanguage = () => {
    setLang(prev => prev === 'bn' ? 'en' : 'bn');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryData.nameEn || !newCategoryData.nameBn) return;

    const newId = newCategoryData.nameEn.toLowerCase().replace(/\s+/g, '-');
    
    if (editingCategoryId) {
      const oldId = editingCategoryId;
      setCategories(prev => prev.map(cat => 
        cat.id === oldId 
          ? { ...cat, id: newId, name: { bn: newCategoryData.nameBn, en: newCategoryData.nameEn }, icon: newCategoryData.icon }
          : cat
      ));
      
      // Update transactions if ID changed
      if (oldId !== newId) {
        setTransactions(prev => prev.map(tx => 
          tx.category === oldId ? { ...tx, category: newId } : tx
        ));
        setCategoryBudgets(prev => prev.map(b => 
          b.categoryId === oldId ? { ...b, categoryId: newId } : b
        ));
      }
    } else {
      const newCategory: Category = {
        id: newId,
        name: {
          bn: newCategoryData.nameBn,
          en: newCategoryData.nameEn
        },
        icon: newCategoryData.icon
      };

      setCategories(prev => [...prev, newCategory]);
      setFormData(prev => ({ ...prev, category: newCategory.id }));
    }

    setIsNewCategoryModalOpen(false);
    setEditingCategoryId(null);
    setNewCategoryData({ nameEn: '', nameBn: '', icon: 'Utensils' });
    triggerSavedToast();
  };

  const handleEditCategory = (cat: Category) => {
    setNewCategoryData({
      nameEn: cat.name.en,
      nameBn: cat.name.bn,
      icon: cat.icon
    });
    setEditingCategoryId(cat.id);
    setIsNewCategoryModalOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    // Move transactions to 'uncategorized'
    setTransactions(prev => prev.map(tx => 
      tx.category === id ? { ...tx, category: 'uncategorized' } : tx
    ));
    // Remove budgets for this category
    setCategoryBudgets(prev => prev.filter(b => b.categoryId !== id));
    // Remove category
    setCategories(prev => prev.filter(cat => cat.id !== id));
    triggerSavedToast();
  };

  const handleNewAccountSubmitDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountData.name || !newAccountData.balance) return;

    const newAccount: Account = {
      id: Date.now().toString(),
      name: newAccountData.name,
      type: newAccountData.type,
      balance: Number(newAccountData.balance),
      currency: newAccountData.currency
    };

    setAccounts(prev => [...prev, newAccount]);
    setFormData(prev => ({ ...prev, accountId: newAccount.id }));
    setIsNewAccountModalOpenDirect(false);
    setNewAccountData({ name: '', type: 'cash', balance: '', currency: defaultCurrency });
    triggerSavedToast();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(formData.amount);
    const accountId = formData.accountId;
    const currency = formData.currency;
    
    if (!accountId) return;

    if (editingId) {
      const oldTx = transactions.find(tx => tx.id === editingId);
      if (oldTx) {
        // Revert old transaction impact
        setAccounts(prev => prev.map(acc => {
          if (acc.id === oldTx.accountId) {
            const revertedAmount = convertCurrency(oldTx.amount, oldTx.currency, acc.currency);
            return {
              ...acc,
              balance: oldTx.type === 'income' ? acc.balance - revertedAmount : acc.balance + revertedAmount
            };
          }
          return acc;
        }));
      }

      // Apply new transaction impact
      setAccounts(prev => prev.map(acc => {
        if (acc.id === accountId) {
          const convertedAmount = convertCurrency(amount, currency, acc.currency);
          return {
            ...acc,
            balance: formData.type === 'income' ? acc.balance + convertedAmount : acc.balance - convertedAmount
          };
        }
        return acc;
      }));

      // Update existing transaction
      setTransactions(prev => prev.map(tx => 
        tx.id === editingId 
          ? { ...tx, ...formData, amount, accountId, currency } as Transaction
          : tx
      ));
    } else {
      // Apply new transaction impact
      setAccounts(prev => prev.map(acc => {
        if (acc.id === accountId) {
          const convertedAmount = convertCurrency(amount, currency, acc.currency);
          return {
            ...acc,
            balance: formData.type === 'income' ? acc.balance + convertedAmount : acc.balance - convertedAmount
          };
        }
        return acc;
      }));

      // Add new transaction
      const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        amount,
        currency,
        type: formData.type,
        date: formData.date,
        category: formData.category,
        accountId
      };
      setTransactions(prev => [...prev, newTx]);
    }

    triggerSavedToast();
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      accountId: '',
      currency: defaultCurrency
    });
  };

  const handleEdit = (tx: Transaction) => {
    setFormData({
      title: tx.title,
      amount: tx.amount.toString(),
      category: tx.category,
      date: tx.date,
      type: tx.type,
      accountId: tx.accountId,
      currency: tx.currency
    });
    setEditingId(tx.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (tx) {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === tx.accountId) {
          const convertedAmount = convertCurrency(tx.amount, tx.currency, acc.currency);
          return {
            ...acc,
            balance: tx.type === 'income' ? acc.balance - convertedAmount : acc.balance + convertedAmount
          };
        }
        return acc;
      }));
    }
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    triggerSavedToast();
  };

  const handleEditBudget = (budget: CategoryBudget) => {
    setBudgetFormData({
      categoryId: budget.categoryId,
      amount: budget.amount.toString(),
      currency: budget.currency
    });
    setIsBudgetModalOpen(true);
  };

  const handleDeleteBudget = (categoryId: string) => {
    setCategoryBudgets(prev => prev.filter(b => b.categoryId !== categoryId));
    triggerSavedToast();
  };

  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(budgetFormData.amount);
    const currency = budgetFormData.currency;
    if (!budgetFormData.categoryId || isNaN(amount)) return;

    setCategoryBudgets(prev => {
      const existing = prev.find(b => b.categoryId === budgetFormData.categoryId);
      if (existing) {
        return prev.map(b => b.categoryId === budgetFormData.categoryId ? { ...b, amount, currency } : b);
      }
      return [...prev, { categoryId: budgetFormData.categoryId, amount, currency }];
    });
    triggerSavedToast();
    setIsBudgetModalOpen(false);
    setBudgetFormData({ categoryId: '', amount: '', currency: defaultCurrency });
  };

  const getCategorySpending = (categoryId: string) => {
    return transactions
      .filter(tx => {
        const d = new Date(tx.date);
        return tx.category === categoryId && 
               tx.type === 'expense' && 
               d.getMonth() === selectedMonth && 
               d.getFullYear() === selectedYear;
      })
      .reduce((sum, tx) => sum + convertCurrency(tx.amount, tx.currency, defaultCurrency), 0);
  };

  const getStatsData = () => {
    const now = new Date();
    let filtered = transactions.filter(tx => tx.type === 'expense');

    if (statsTimeframe === 'weekly') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      filtered = filtered.filter(tx => new Date(tx.date) >= startOfWeek);
    } else if (statsTimeframe === 'monthly') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = filtered.filter(tx => new Date(tx.date) >= startOfMonth);
    } else if (statsTimeframe === 'yearly') {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      filtered = filtered.filter(tx => new Date(tx.date) >= startOfYear);
    }

    const categoriesInTransactions = Array.from(new Set(filtered.map(tx => tx.category)));
    const categoryData = categoriesInTransactions.map((catId: string) => {
      const cat = categories.find(c => c.id === catId);
      const amount = filtered
        .filter(tx => tx.category === catId)
        .reduce((sum, tx) => sum + convertCurrency(tx.amount, tx.currency, defaultCurrency), 0);
      
      let name = catId;
      if (catId === 'uncategorized') {
        name = t.uncategorized;
      } else if (cat) {
        name = lang === 'bn' ? cat.name.bn : cat.name.en;
      }

      return {
        name,
        amount,
        color: catId === 'food' ? '#FEBB46' : 
               catId === 'shopping' ? '#3B82F6' : 
               catId === 'fuel' ? '#F05654' : 
               catId === 'invest' ? '#1A936F' : 
               catId === 'uncategorized' ? '#A4A4AB' : '#EC4899'
      };
    }).filter(d => d.amount > 0);

    return categoryData;
  };

  const getCashFlowData = () => {
    const now = new Date();
    let filtered = transactions;

    if (statsTimeframe === 'weekly') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      filtered = filtered.filter(tx => new Date(tx.date) >= startOfWeek);
    } else if (statsTimeframe === 'monthly') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = filtered.filter(tx => new Date(tx.date) >= startOfMonth);
    } else if (statsTimeframe === 'yearly') {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      filtered = filtered.filter(tx => new Date(tx.date) >= startOfYear);
    }

    const income = filtered
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + convertCurrency(tx.amount, tx.currency, defaultCurrency), 0);
    
    const expense = filtered
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + convertCurrency(tx.amount, tx.currency, defaultCurrency), 0);

    return [
      { name: lang === 'bn' ? 'আয়' : 'Income', amount: income, color: '#1A936F' },
      { name: lang === 'bn' ? 'ব্যয়' : 'Expense', amount: expense, color: '#F05654' }
    ];
  };

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' ? true : tx.type === filter
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col min-h-screen w-full max-w-5xl mx-auto bg-bg-light dark:bg-dark-bg relative font-sans shadow-2xl md:my-8 md:rounded-[40px] md:border-8 md:border-white dark:md:border-dark-card overflow-hidden transition-colors duration-300">
      {/* Status Bar Mock - Hidden on larger screens for a cleaner desktop look */}
      <div className="flex justify-between items-center px-6 py-2 text-xs font-medium text-text/60 dark:text-dark-text/60 md:hidden">
        <span>5:13 PM</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-3 h-3 rounded-full border border-text/20 dark:border-dark-text/20 flex items-center justify-center">
            <div className="w-1 h-1 bg-text/60 dark:bg-dark-text/60 rounded-full" />
          </div>
          <RefreshCw size={12} />
          <div className="flex gap-0.5">
            <div className="w-1 h-2 bg-text/60 dark:bg-dark-text/60 rounded-sm" />
            <div className="w-1 h-3 bg-text/60 dark:bg-dark-text/60 rounded-sm" />
            <div className="w-1 h-4 bg-text/60 dark:bg-dark-text/60 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Top Section */}
      <header className="px-4 py-2 md:px-10 flex flex-col gap-1 bg-white/50 dark:bg-dark-card/50 backdrop-blur-md sticky top-0 z-40 border-b border-primary/5 dark:border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg border-2 border-white/20 overflow-hidden">
              <div className="flex flex-col items-center justify-center -space-y-1">
                <span className="text-[6px] font-black text-white/60 uppercase tracking-tighter leading-none">ay</span>
                <span className="text-sm font-black text-white leading-none">B</span>
                <span className="text-[6px] font-black text-white/60 uppercase tracking-tighter leading-none">ay</span>
              </div>
            </div>
            <div>
              <h1 className="text-base font-black text-primary tracking-tight leading-none">{t.appName}</h1>
              <p className="text-[10px] font-bold text-text/60 dark:text-dark-text/60 mt-0.5">
                {userProfile.name ? (
                  <>
                    {lang === 'bn' ? 'হ্যালো' : 'Hello'} {userProfile.name}!
                  </>
                ) : (
                  t.welcome
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-white dark:bg-dark-card shadow-sm text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold text-[10px] border border-primary/10 dark:border-white/10"
              >
                <Globe size={12} />
                <span>{defaultCurrency || (lang === 'bn' ? 'মুদ্রা' : 'Currency')}</span>
              </button>
              <AnimatePresence>
                {isCurrencyDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsCurrencyDropdownOpen(false)}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-1 w-36 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-primary/10 dark:border-white/10 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-1.5 bg-bg-light dark:bg-dark-bg border-b border-primary/5 dark:border-white/5">
                        <p className="text-[8px] font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest">{t.defaultCurrency}</p>
                      </div>
                      <div className="max-h-64 overflow-y-auto no-scrollbar">
                        {/* Selected Currency at Top */}
                        {defaultCurrency && (
                          <div className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10 dark:border-white/10">
                            <div className="px-3 py-1 bg-primary/10 dark:bg-primary/20">
                              <p className="text-[6px] font-black text-primary uppercase tracking-widest">{lang === 'bn' ? 'নির্বাচিত' : 'Selected'}</p>
                            </div>
                            {CURRENCIES.filter(c => c.code === defaultCurrency).map(curr => (
                              <button
                                key={`selected-${curr.code}`}
                                disabled
                                className="w-full px-3 py-2 text-left text-[10px] font-bold text-primary flex items-center justify-between cursor-default"
                              >
                                <div className="flex flex-col">
                                  <span>{curr.code}</span>
                                  <span className="text-[7px] opacity-60 font-medium">{curr.name}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[8px] block">{curr.symbol}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* Other Currencies */}
                        {CURRENCIES.filter(c => c.code !== defaultCurrency).map(curr => (
                          <button
                            key={curr.code}
                            onClick={() => {
                              setDefaultCurrency(curr.code);
                              setIsCurrencyDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-[10px] font-bold hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors flex items-center justify-between text-text/70 dark:text-dark-text/70"
                          >
                            <div className="flex flex-col">
                              <span>{curr.code}</span>
                              <span className="text-[7px] opacity-60 font-medium">{curr.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[8px] block">{curr.symbol}</span>
                              {defaultCurrency && exchangeRates.rates[curr.code] && (
                                <span className="text-[6px] opacity-40 block">
                                  1 {curr.code} = {(1 / exchangeRates.rates[curr.code]).toFixed(2)} {defaultCurrency}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-white dark:bg-dark-card shadow-sm text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold text-[10px] border border-primary/10 dark:border-white/10"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun size={12} /> : <Moon size={12} />}
            </button>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-white dark:bg-dark-card shadow-sm text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold text-[10px] border border-primary/10 dark:border-white/10"
            >
              <Languages size={12} />
              <span>{lang === 'bn' ? 'EN' : 'BN'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Responsive Grid */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              
              {/* Main Content Area: Budget, Stats and History */}
              <div className="lg:col-span-12 space-y-8">
                {/* Main Green Card */}
                <motion.div 
                  layout
                  className="bg-primary rounded-[16px] p-3 text-white shadow-xl relative overflow-hidden group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <button 
                      onClick={() => setIsProfileModalOpen(true)}
                      className="p-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Menu size={14} className="opacity-80" />
                    </button>
                    <button 
                      onClick={() => setIsMonthPickerOpen(true)}
                      className="flex items-center gap-1 text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      {new Date(selectedYear, selectedMonth).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', year: 'numeric' })}
                      <ChevronDown size={8} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative cursor-pointer shrink-0" onClick={() => setIsProfileModalOpen(true)}>
                      <div className="w-20 h-20 rounded-full border-2 border-white/20 border-t-secondary flex items-center justify-center animate-spin-slow">
                        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                      </div>
                      <img 
                        src={userProfile.photo} 
                        alt="Profile Large" 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full object-cover border-2 border-white/40 shadow-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest leading-none mb-1">{lang === 'bn' ? 'মোট ব্যালেন্স' : 'Total Balance'}</p>
                      <p className="text-2xl md:text-3xl font-black leading-none truncate">
                        {formatCurrency(totalAccountBalance, defaultCurrency)}
                      </p>
                      {defaultCurrency !== 'BDT' && (
                        <p className="text-[9px] font-bold opacity-60 mt-1 flex items-center gap-1">
                          <RefreshCw size={8} className="animate-spin-slow" />
                          {formatCurrency(convertCurrency(totalAccountBalance, defaultCurrency, 'BDT'), 'BDT')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-white/10 px-2 py-1.5 rounded-lg backdrop-blur-sm flex items-center justify-between">
                      <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest leading-none">{t.income}</p>
                      <p className="text-[11px] font-black truncate">{formatCurrency(monthlyIncome, defaultCurrency)}</p>
                    </div>
                    <div className="bg-white/10 px-2 py-1.5 rounded-lg backdrop-blur-sm flex items-center justify-between">
                      <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest leading-none">{t.expense}</p>
                      <p className="text-[11px] font-black truncate">{formatCurrency(monthlyExpense, defaultCurrency)}</p>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between items-end">
                      <p className="text-[7px] opacity-70 font-bold uppercase tracking-widest">{t.monthlyBudget}</p>
                      <p className={`text-[8px] font-black ${totalBudget > 0 && spent > totalBudget ? 'text-danger' : 'text-secondary'}`}>
                        {formatCurrency(spent, defaultCurrency)} / {formatCurrency(totalBudget, defaultCurrency)}
                      </p>
                    </div>
                    <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full shadow-[0_0_10px_rgba(254,187,70,0.5)] ${totalBudget > 0 && spent > totalBudget ? 'bg-danger' : 'bg-secondary'}`}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[6px] font-bold opacity-60 uppercase tracking-tighter">
                        {totalBudget > 0 ? Math.round(percentage) : 0}% {lang === 'bn' ? 'ব্যবহৃত' : 'Used'}
                      </p>
                      <p className="text-[6px] font-bold opacity-60 uppercase tracking-tighter">
                        {totalBudget > 0 ? formatCurrency(Math.max(0, totalBudget - spent), defaultCurrency) : 0} {lang === 'bn' ? 'বাকি' : 'Left'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Accounts View */}
                <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
                  {accounts.map(acc => (
                    <motion.div 
                      key={acc.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex-shrink-0 bg-white dark:bg-dark-card rounded-xl p-2 shadow-md border border-primary/5 dark:border-white/5 min-w-[110px]"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className={`p-1 rounded-lg ${
                          acc.name.toLowerCase().includes('bkash') ? 'bg-[#D12053]/10 text-[#D12053]' :
                          acc.name.toLowerCase().includes('nagad') ? 'bg-[#F7941D]/10 text-[#F7941D]' :
                          acc.type === 'cash' ? 'bg-secondary/10 text-secondary' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {getAccountIcon(acc.type, acc.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[6px] font-bold text-grey uppercase tracking-tighter leading-none mb-0.5">{t[acc.type]}</p>
                          <p className="text-[9px] font-black text-text dark:text-dark-text truncate">{acc.name}</p>
                        </div>
                      </div>
                      <p className="text-[10px] font-black text-primary">
                        {formatCurrency(acc.balance, acc.currency)}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Advertisement Placeholder */}
                <div className="bg-white/30 dark:bg-dark-card/30 border-2 border-dashed border-primary/10 dark:border-white/10 rounded-[20px] p-4 flex items-center justify-center text-primary/30 dark:text-dark-text/20 font-black text-[10px] uppercase tracking-widest">
                  Advertisement Section
                </div>

                {/* Transaction History Section */}
                <section className="bg-white dark:bg-dark-card rounded-[24px] p-5 shadow-xl border border-primary/5 dark:border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-black text-text dark:text-dark-text">{t.history}</h2>
                    <div className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {filteredTransactions.length}
                    </div>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-2 mb-5 p-1 bg-bg-light dark:bg-dark-bg rounded-xl w-fit">
                    {(['all', 'income', 'expense'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                          filter === f 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-text/40 dark:text-dark-text/40 hover:text-text/60 dark:hover:text-dark-text/60'
                        }`}
                      >
                        {t[f]}
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                    {sortedTransactions.length === 0 ? (
                      <div className="text-center py-8 text-grey dark:text-dark-text/60 font-bold italic text-sm">
                        {t.noTransactions}
                      </div>
                    ) : (
                      sortedTransactions.map((tx) => (
                        <motion.div 
                          key={tx.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-3 bg-bg-light dark:bg-dark-bg rounded-xl group hover:bg-white dark:hover:bg-dark-card hover:shadow-md transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              tx.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger'
                            }`}>
                              {tx.type === 'income' ? <ArrowDownCircle size={18} /> : <ArrowUpCircle size={18} />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-black text-text dark:text-dark-text truncate leading-none mb-1">{tx.title}</p>
                              <p className="text-[10px] font-bold text-grey dark:text-dark-text/40 uppercase tracking-tighter truncate max-w-[150px]">
                                {tx.date} • {
                                  tx.category === 'uncategorized' 
                                    ? t.uncategorized
                                    : (lang === 'bn' 
                                      ? categories.find(c => c.id === tx.category)?.name.bn || tx.category
                                      : categories.find(c => c.id === tx.category)?.name.en || tx.category)
                                } • {accounts.find(a => a.id === tx.accountId)?.name || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <p className={`text-sm font-black ${tx.type === 'income' ? 'text-primary' : 'text-danger'}`}>
                              {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
                            </p>
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleEdit(tx)}
                                className="p-1.5 rounded-lg bg-white dark:bg-dark-card text-primary shadow-sm hover:bg-primary hover:text-white transition-colors border border-primary/5 dark:border-white/5"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                onClick={() => handleDelete(tx.id)}
                                className="p-1.5 rounded-lg bg-white dark:bg-dark-card text-danger shadow-sm hover:bg-danger hover:text-white transition-colors border border-primary/5 dark:border-white/5"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeTab === 'stats' ? (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Header */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.stats}</h2>
                <div className="flex gap-2 p-1 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-primary/5 dark:border-white/5">
                  {(['weekly', 'monthly', 'yearly'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setStatsTimeframe(tf)}
                      className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                        statsTimeframe === tf 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-text/40 dark:text-dark-text/40 hover:text-text/60 dark:hover:text-dark-text/60'
                      }`}
                    >
                      {t[tf]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart: Income vs Expense */}
                <section className="bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-xl border border-primary/5 dark:border-white/5 min-h-[400px]">
                  <h3 className="text-lg font-black text-text dark:text-dark-text mb-8">{lang === 'bn' ? 'আয় বনাম ব্যয়' : 'Income vs Expense'}</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getCashFlowData()}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1E293B' : '#F1F5F9'} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 700, fill: isDarkMode ? '#94A3B8' : '#64748B' }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 700, fill: isDarkMode ? '#94A3B8' : '#64748B' }}
                        />
                        <Tooltip 
                          cursor={{ fill: isDarkMode ? '#1E293B' : '#F8FAFC' }}
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontWeight: 800,
                            fontSize: '12px',
                            color: isDarkMode ? '#F8FAFC' : '#1E293B'
                          }}
                          itemStyle={{ color: isDarkMode ? '#F8FAFC' : '#1E293B' }}
                        />
                        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                          {getCashFlowData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                {/* Bar Chart: Spending by Category */}
                <section className="bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-xl border border-primary/5 dark:border-white/5 min-h-[400px]">
                  <h3 className="text-lg font-black text-text dark:text-dark-text mb-8">{t.spendingPattern}</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getStatsData()}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1E293B' : '#F1F5F9'} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 700, fill: isDarkMode ? '#94A3B8' : '#64748B' }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 700, fill: isDarkMode ? '#94A3B8' : '#64748B' }}
                        />
                        <Tooltip 
                          cursor={{ fill: isDarkMode ? '#1E293B' : '#F8FAFC' }}
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontWeight: 800,
                            fontSize: '12px',
                            color: isDarkMode ? '#F8FAFC' : '#1E293B'
                          }}
                          itemStyle={{ color: isDarkMode ? '#F8FAFC' : '#1E293B' }}
                        />
                        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                          {getStatsData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                {/* Pie Chart: Distribution */}
                <section className="bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-xl border border-primary/5 dark:border-white/5 min-h-[400px]">
                  <h3 className="text-lg font-black text-text dark:text-dark-text mb-8">{lang === 'bn' ? 'ব্যয় বিভাজন' : 'Expense Distribution'}</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getStatsData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="amount"
                        >
                          {getStatsData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontWeight: 800,
                            fontSize: '12px',
                            color: isDarkMode ? '#F8FAFC' : '#1E293B'
                          }}
                          itemStyle={{ color: isDarkMode ? '#F8FAFC' : '#1E293B' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {getStatsData().map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-[10px] font-bold text-text/60 dark:text-dark-text/60 uppercase tracking-wider">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-primary rounded-[24px] p-6 text-white shadow-lg">
                  <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-2">{t.income}</p>
                  <p className="text-2xl font-black">{formatCurrency(totalIncome, defaultCurrency)}</p>
                </div>
                <div className="bg-danger rounded-[24px] p-6 text-white shadow-lg">
                  <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-2">{t.expense}</p>
                  <p className="text-2xl font-black">{formatCurrency(totalExpense, defaultCurrency)}</p>
                </div>
                <div className="bg-white dark:bg-dark-card rounded-[24px] p-6 shadow-lg border border-primary/5 dark:border-white/5">
                  <p className="text-xs font-bold text-grey dark:text-dark-text/60 uppercase tracking-widest mb-2">{lang === 'bn' ? 'ব্যালেন্স' : 'Balance'}</p>
                  <p className={`text-2xl font-black ${balance >= 0 ? 'text-text dark:text-dark-text' : 'text-danger'}`}>
                    {formatCurrency(balance, defaultCurrency)}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="budget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Budget Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.budget}</h2>
                <button 
                  onClick={() => {
                    setEditingAccountId(null);
                    setAccountFormData({ name: '', type: 'cash', balance: '', currency: defaultCurrency });
                    setIsAccountModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-all"
                >
                  <PlusCircle size={16} />
                  {t.addAccount}
                </button>
              </div>

              {/* Accounts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.length === 0 ? (
                  <div className="col-span-full text-center py-12 bg-white dark:bg-dark-card rounded-[32px] shadow-xl border border-primary/5 dark:border-white/5">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 rounded-full bg-bg-light dark:bg-dark-bg text-grey dark:text-dark-text/40">
                        <PlusCircle size={32} />
                      </div>
                      <p className="text-sm font-bold text-grey dark:text-dark-text/60 italic">{t.noAccounts}</p>
                      <button 
                        onClick={() => {
                          setEditingAccountId(null);
                          setAccountFormData({ name: '', type: 'cash', balance: '', currency: defaultCurrency as CurrencyCode });
                          setIsAccountModalOpen(true);
                        }}
                        className="px-6 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black hover:bg-primary hover:text-white transition-all"
                      >
                        {t.addAccount}
                      </button>
                    </div>
                  </div>
                ) : (
                  accounts.map((acc) => (
                    <motion.div 
                      key={acc.id}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-dark-card rounded-[32px] p-6 shadow-xl border border-primary/5 dark:border-white/5 relative group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl ${
                          acc.name.toLowerCase().includes('bkash') ? 'bg-[#D12053]/10 text-[#D12053]' :
                          acc.name.toLowerCase().includes('nagad') ? 'bg-[#F7941D]/10 text-[#F7941D]' :
                          acc.type === 'cash' ? 'bg-secondary/10 text-secondary' :
                          acc.type === 'bank' ? 'bg-primary/10 text-primary' :
                          'bg-pink-500/10 text-pink-500'
                        }`}>
                          {getAccountIcon(acc.type, acc.name)}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditAccount(acc)}
                            className="p-2 rounded-lg bg-bg-light dark:bg-dark-bg text-primary hover:bg-primary hover:text-white transition-all border border-primary/5 dark:border-white/5"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteAccount(acc.id)}
                            className="p-2 rounded-lg bg-bg-light dark:bg-dark-bg text-danger hover:bg-danger hover:text-white transition-all border border-primary/5 dark:border-white/5"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-grey dark:text-dark-text/40 uppercase tracking-widest mb-1">{t[acc.type]}</p>
                        <h4 className="text-lg font-black text-text dark:text-dark-text mb-2">{acc.name}</h4>
                        <p className="text-2xl font-black text-primary">
                          {formatCurrency(acc.balance, acc.currency)}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Total Balance Card */}
              <div className="bg-primary rounded-[32px] p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-1">{lang === 'bn' ? 'মোট ব্যালেন্স' : 'Total Balance'}</p>
                  <p className="text-4xl font-black">
                    {formatCurrency(totalAccountBalance, defaultCurrency)}
                  </p>
                  {defaultCurrency !== 'BDT' && (
                    <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-white/10 dark:bg-black/20 rounded-full w-fit backdrop-blur-sm">
                      <RefreshCw size={10} className="animate-spin-slow opacity-60" />
                      <p className="text-[10px] font-black opacity-80">
                        {formatCurrency(convertCurrency(totalAccountBalance, defaultCurrency, 'BDT'), 'BDT')}
                      </p>
                      <span className="text-[8px] opacity-40 font-bold">|</span>
                      <p className="text-[8px] font-bold opacity-60">
                        1 {defaultCurrency} = {exchangeRates['BDT']?.toFixed(2)} BDT
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <div className="text-center px-6 py-3 bg-white/10 dark:bg-black/20 rounded-2xl backdrop-blur-sm">
                    <p className="text-[10px] font-bold opacity-70 uppercase mb-1">{t.income}</p>
                    <p className="text-lg font-black">{formatCurrency(totalIncome, defaultCurrency)}</p>
                  </div>
                  <div className="text-center px-6 py-3 bg-white/10 dark:bg-black/20 rounded-2xl backdrop-blur-sm">
                    <p className="text-[10px] font-bold opacity-70 uppercase mb-1">{t.expense}</p>
                    <p className="text-lg font-black">{formatCurrency(totalExpense, defaultCurrency)}</p>
                  </div>
                </div>
              </div>

              {/* Category Budgets Section (Moved here) */}
              <section className="bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-xl border border-primary/5 dark:border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-text dark:text-dark-text">{t.categoryBudget}</h2>
                  <button 
                    onClick={() => {
                      setBudgetFormData(prev => ({ ...prev, currency: defaultCurrency }));
                      setIsBudgetModalOpen(true);
                    }}
                    className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryBudgets.length === 0 ? (
                    <p className="text-center text-grey font-bold py-4 italic col-span-full bg-bg-light dark:bg-dark-bg rounded-2xl">{lang === 'bn' ? 'কোন বাজেট লক্ষ্য নেই' : 'No budget goals set'}</p>
                  ) : (
                    categoryBudgets.map((budget) => {
                      const category = categories.find(c => c.id === budget.categoryId);
                      const spent = getCategorySpending(budget.categoryId);
                      const budgetAmountInDefault = convertCurrency(budget.amount, budget.currency, defaultCurrency);
                      const percentage = budgetAmountInDefault > 0 ? Math.min((spent / budgetAmountInDefault) * 100, 100) : 0;
                      const isOverBudget = spent > budgetAmountInDefault;

                      return (
                        <div key={budget.categoryId} className="space-y-3 p-4 bg-bg-light dark:bg-dark-bg rounded-2xl">
                          <div className="flex justify-between items-end">
                            <div className="flex items-center gap-3">
                              <div className={`p-3 rounded-xl ${isOverBudget ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
                                <IconComponent name={category?.icon || ''} className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-sm font-black text-text dark:text-dark-text">
                                  {lang === 'bn' ? category?.name.bn || budget.categoryId : category?.name.en || budget.categoryId}
                                </p>
                                <p className="text-[10px] font-bold text-grey uppercase tracking-wider">{t.budgetGoal}</p>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                              <div>
                                <p className={`text-sm font-black ${isOverBudget ? 'text-danger' : 'text-text dark:text-dark-text'}`}>
                                  {formatCurrency(spent, defaultCurrency)}
                                </p>
                                <p className="text-[10px] font-bold text-grey uppercase">
                                  / {formatCurrency(budget.amount, budget.currency)}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => handleEditBudget(budget)}
                                  className="p-1.5 rounded-lg bg-white dark:bg-dark-card text-primary shadow-sm hover:bg-primary hover:text-white transition-all border border-primary/5 dark:border-white/5"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteBudget(budget.categoryId)}
                                  className="p-1.5 rounded-lg bg-white dark:bg-dark-card text-danger shadow-sm hover:bg-danger hover:text-white transition-all border border-primary/5 dark:border-white/5"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="w-full h-2.5 bg-white rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              className={`h-full ${isOverBudget ? 'bg-danger' : 'bg-primary'}`}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation - Responsive Width */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 z-40 pointer-events-none">
        <nav className="w-full max-w-2xl bg-primary h-16 px-4 flex items-center justify-between rounded-[20px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pointer-events-auto">
          <motion.div 
            whileHover={{ y: -5 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('home')}
            className="relative flex flex-col items-center gap-0.5 cursor-pointer px-2 py-1"
          >
            {activeTab === 'home' && (
              <motion.div 
                layoutId="nav-active"
                className="absolute inset-0 bg-white/10 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Home size={20} className={activeTab === 'home' ? 'text-white' : 'text-white/60'} />
            <span className={`text-[9px] font-black uppercase tracking-tighter ${activeTab === 'home' ? 'text-white' : 'text-white/60'}`}>
              {t.home}
            </span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('stats')}
            className="relative flex flex-col items-center gap-0.5 cursor-pointer px-2 py-1"
          >
            {activeTab === 'stats' && (
              <motion.div 
                layoutId="nav-active"
                className="absolute inset-0 bg-white/10 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <BarChart2 size={20} className={activeTab === 'stats' ? 'text-white' : 'text-white/60'} />
            <span className={`text-[9px] font-black uppercase tracking-tighter ${activeTab === 'stats' ? 'text-white' : 'text-white/60'}`}>
              {t.stats}
            </span>
          </motion.div>
          
          <div className="relative -mt-12">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: '',
                  amount: '',
                  category: '',
                  date: new Date().toISOString().split('T')[0],
                  type: 'expense',
                  accountId: accounts.length > 0 ? accounts[0].id : '',
                  currency: defaultCurrency
                });
                setIsModalOpen(true);
              }}
              className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl border-4 border-bg-light cursor-pointer group"
            >
              <Plus size={24} className="text-primary group-hover:scale-110 transition-transform" />
            </motion.div>
          </div>

          <motion.div 
            whileHover={{ y: -5 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('budget')}
            className="relative flex flex-col items-center gap-0.5 cursor-pointer px-2 py-1"
          >
            {activeTab === 'budget' && (
              <motion.div 
                layoutId="nav-active"
                className="absolute inset-0 bg-white/10 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Wallet size={20} className={activeTab === 'budget' ? 'text-white' : 'text-white/60'} />
            <span className={`text-[9px] font-black uppercase tracking-tighter ${activeTab === 'budget' ? 'text-white' : 'text-white/60'}`}>
              {t.budget}
            </span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setBudgetFormData(prev => ({ ...prev, currency: defaultCurrency }));
              setIsBudgetModalOpen(true);
            }}
            className="flex flex-col items-center gap-0.5 text-white/60 cursor-pointer px-2 py-1 hover:text-white transition-colors"
          >
            <Target size={20} />
            <span className="text-[9px] font-black uppercase tracking-tighter">{t.goal}</span>
          </motion.div>
        </nav>
      </div>

      {/* Transaction Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-text dark:text-dark-text">{editingId ? t.edit : t.addTransaction}</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type Toggle */}
                  <div className="flex p-1 bg-bg-light dark:bg-dark-bg rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                      className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                        formData.type === 'income' ? 'bg-primary text-white shadow-lg' : 'text-text/40 dark:text-dark-text/40'
                      }`}
                    >
                      {t.income}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                      className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                        formData.type === 'expense' ? 'bg-danger text-white shadow-lg' : 'text-text/40 dark:text-dark-text/40'
                      }`}
                    >
                      {t.expense}
                    </button>
                  </div>

                  {/* Title Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.title}</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text"
                      placeholder={lang === 'bn' ? 'যেমন: বাজার খরচ' : 'e.g. Grocery'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Amount & Currency Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.amount}</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-text/40 dark:text-dark-text/40 font-black">
                            {CURRENCIES.find(c => c.code === formData.currency)?.symbol || '৳'}
                          </span>
                          <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text"
                            placeholder="0.00"
                          />
                        </div>
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          className="w-24 px-2 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text appearance-none text-center"
                        >
                          <option value="">{t.selectCurrency}</option>
                          {defaultCurrency && (
                            <option value={defaultCurrency}>{defaultCurrency} ({lang === 'bn' ? 'ডিফল্ট' : 'Default'})</option>
                          )}
                          {CURRENCIES.filter(c => c.code !== defaultCurrency).map(curr => (
                            <option key={curr.code} value={curr.code}>{curr.code}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.date}</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text/40 dark:text-dark-text/40" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-14 pr-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category & Account Select */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest">{t.category}</label>
                        <button 
                          type="button"
                          onClick={() => setIsNewCategoryModalOpen(true)}
                          className="text-[10px] font-black text-primary hover:underline flex items-center gap-1"
                        >
                          <Plus size={10} /> {lang === 'bn' ? 'নতুন' : 'New'}
                        </button>
                      </div>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text appearance-none"
                      >
                        <option value="">{t.selectCategory}</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {lang === 'bn' ? cat.name.bn : cat.name.en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest">{t.accounts}</label>
                        <button 
                          type="button"
                          onClick={() => {
                            setNewAccountData(prev => ({ ...prev, currency: defaultCurrency }));
                            setIsNewAccountModalOpenDirect(true);
                          }}
                          className="text-[10px] font-black text-primary hover:underline flex items-center gap-1"
                        >
                          <Plus size={10} /> {lang === 'bn' ? 'নতুন' : 'New'}
                        </button>
                      </div>
                      <select
                        name="accountId"
                        value={formData.accountId}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text appearance-none"
                      >
                        <option value="">{t.selectAccount}</option>
                        {accounts.map(acc => (
                          <option key={acc.id} value={acc.id}>
                            {acc.name} ({formatCurrency(acc.balance, acc.currency)})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 rounded-2xl font-black text-text/60 dark:text-dark-text/60 bg-bg-light dark:bg-dark-bg hover:bg-bg-light/80 dark:hover:bg-dark-bg/80 transition-all"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 rounded-2xl font-black text-white bg-primary shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {t.save}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Budget Modal */}
      <AnimatePresence>
        {isBudgetModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBudgetModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.setGoal}</h2>
                  <button 
                    onClick={() => setIsBudgetModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleBudgetSubmit} className="space-y-6">
                  {/* Category Select */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.category}</label>
                    <select
                      value={budgetFormData.categoryId}
                      onChange={(e) => setBudgetFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                      required
                      className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text appearance-none"
                    >
                      <option value="">{t.selectCategory}</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {lang === 'bn' ? cat.name.bn : cat.name.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount & Currency Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.budgetGoal}</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-text/40 dark:text-dark-text/40 font-black">
                          {CURRENCIES.find(c => c.code === budgetFormData.currency)?.symbol || '৳'}
                        </span>
                        <input
                          type="number"
                          value={budgetFormData.amount}
                          onChange={(e) => setBudgetFormData(prev => ({ ...prev, amount: e.target.value }))}
                          required
                          className="w-full pl-12 pr-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text"
                          placeholder="0.00"
                        />
                      </div>
                      <select
                        name="currency"
                        value={budgetFormData.currency}
                        onChange={(e) => setBudgetFormData(prev => ({ ...prev, currency: e.target.value as CurrencyCode }))}
                        className="w-24 px-2 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text appearance-none text-center"
                      >
                        <option value="">{t.selectCurrency}</option>
                        {defaultCurrency && (
                          <option value={defaultCurrency}>{defaultCurrency} ({lang === 'bn' ? 'ডিফল্ট' : 'Default'})</option>
                        )}
                        {CURRENCIES.filter(c => c.code !== defaultCurrency).map(curr => (
                          <option key={curr.code} value={curr.code}>{curr.code}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsBudgetModalOpen(false)}
                      className="flex-1 py-4 rounded-2xl font-black text-text/60 dark:text-dark-text/60 bg-bg-light dark:bg-dark-bg hover:bg-bg-light/80 dark:hover:bg-dark-bg/80 transition-all"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 rounded-2xl font-black text-white bg-primary shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {t.save}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Account Modal */}
      <AnimatePresence>
        {isAccountModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-text">{editingAccountId ? t.edit : t.addAccount}</h2>
                  <button 
                    onClick={() => setIsAccountModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light text-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAccountSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-grey uppercase tracking-widest mb-2">{t.accountName}</label>
                    <input
                      type="text"
                      required
                      value={accountFormData.name}
                      onChange={(e) => setAccountFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-6 py-4 bg-bg-light rounded-2xl text-text font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="e.g. My Cash, DBBL Bank"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-grey uppercase tracking-widest mb-2">{t.type}</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['cash', 'bank', 'mobile'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setAccountFormData(prev => ({ ...prev, type }))}
                          className={`py-4 rounded-2xl flex flex-col items-center gap-2 transition-all border-2 ${
                            accountFormData.type === type 
                              ? 'bg-primary/5 border-primary text-primary' 
                              : 'bg-bg-light border-transparent text-text/40'
                          }`}
                        >
                          {getAccountIcon(type, accountFormData.name)}
                          <span className="text-[10px] font-black uppercase">{t[type]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-grey dark:text-dark-text/40 uppercase tracking-widest mb-2">{t.balance}</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-grey dark:text-dark-text/40 font-black">
                          {CURRENCIES.find(c => c.code === accountFormData.currency)?.symbol || '৳'}
                        </span>
                        <input
                          type="number"
                          required
                          value={accountFormData.balance}
                          onChange={(e) => setAccountFormData(prev => ({ ...prev, balance: e.target.value }))}
                          className="w-full pl-12 pr-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl text-text dark:text-dark-text font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                      <select
                        name="currency"
                        value={accountFormData.currency}
                        onChange={(e) => setAccountFormData(prev => ({ ...prev, currency: e.target.value as CurrencyCode }))}
                        className="w-24 px-2 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text appearance-none text-center"
                      >
                        <option value="">{t.selectCurrency}</option>
                        {defaultCurrency && (
                          <option value={defaultCurrency}>{defaultCurrency} ({lang === 'bn' ? 'ডিফল্ট' : 'Default'})</option>
                        )}
                        {CURRENCIES.filter(c => c.code !== defaultCurrency).map(curr => (
                          <option key={curr.code} value={curr.code}>{curr.code}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAccountModalOpen(false)}
                      className="flex-1 py-4 bg-bg-light dark:bg-dark-bg text-text dark:text-dark-text font-black rounded-2xl hover:bg-grey/10 transition-all"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-lg hover:bg-primary/90 hover:scale-[1.02] transition-all"
                    >
                      {t.save}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-text dark:text-dark-text">{lang === 'bn' ? 'মেনু' : 'Menu'}</h2>
                  <button 
                    onClick={() => setIsProfileModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Profile Section */}
                <div className="bg-bg-light dark:bg-dark-bg rounded-3xl p-6 mb-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full border-4 border-primary/10 p-1 overflow-hidden shadow-xl">
                        <img 
                          src={userProfile.photo} 
                          alt="Profile Preview" 
                          className="w-full h-full rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <Camera size={14} />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setUserProfile(prev => ({ ...prev, photo: reader.result as string }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div className="w-full space-y-1">
                      <label className="text-[10px] font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{lang === 'bn' ? 'আপনার নাম' : 'Your Name'}</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="flex-1 px-4 py-3 bg-white dark:bg-dark-card rounded-xl border-2 border-transparent focus:border-primary/20 outline-none transition-all font-bold text-text dark:text-dark-text text-sm"
                          placeholder="e.g. Selva"
                        />
                        <button
                          onClick={() => {
                            triggerSavedToast();
                            setIsProfileModalOpen(false);
                          }}
                          className="px-4 bg-primary text-white rounded-xl font-black text-xs shadow-md hover:bg-primary/90 transition-all"
                        >
                          {t.save}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Options */}
                <div className="space-y-3">
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center justify-between p-4 bg-bg-light dark:bg-dark-bg rounded-2xl hover:bg-primary/5 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-white dark:bg-dark-card text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                      </div>
                      <span className="font-bold text-text dark:text-dark-text">{darkMode ? (lang === 'bn' ? 'লাইট মোড' : 'Light Mode') : (lang === 'bn' ? 'ডার্ক মোড' : 'Dark Mode')}</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full p-1 transition-colors ${darkMode ? 'bg-primary' : 'bg-grey/30 dark:bg-dark-text/20'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                      setIsManageCategoriesModalOpen(true);
                      setIsProfileModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-bg-light dark:bg-dark-bg rounded-2xl hover:bg-primary/5 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-white dark:bg-dark-card text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        <Menu size={20} />
                      </div>
                      <span className="font-bold text-text dark:text-dark-text">{t.manageCategories}</span>
                    </div>
                    <ChevronRight size={18} className="text-text/20 dark:text-dark-text/20 group-hover:text-primary transition-all" />
                  </button>

                  <button 
                    onClick={() => {
                      setIsAboutModalOpen(true);
                      setIsProfileModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-bg-light dark:bg-dark-bg rounded-2xl hover:bg-primary/5 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-white dark:bg-dark-card text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        <Info size={20} />
                      </div>
                      <span className="font-bold text-text dark:text-dark-text">{t.about}</span>
                    </div>
                    <ChevronRight size={18} className="text-text/20 dark:text-dark-text/20 group-hover:text-primary transition-all" />
                  </button>

                  <button 
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setIsProfileModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-bg-light dark:bg-dark-bg rounded-2xl hover:bg-primary/5 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-white dark:bg-dark-card text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        <Phone size={20} />
                      </div>
                      <span className="font-bold text-text dark:text-dark-text">{t.contact}</span>
                    </div>
                    <ChevronRight size={18} className="text-text/20 dark:text-dark-text/20 group-hover:text-primary transition-all" />
                  </button>

                  <button 
                    onClick={() => {
                      setIsTermsModalOpen(true);
                      setIsProfileModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-bg-light dark:bg-dark-bg rounded-2xl hover:bg-primary/5 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-white dark:bg-dark-card text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        <FileText size={20} />
                      </div>
                      <span className="font-bold text-text dark:text-dark-text">{t.terms}</span>
                    </div>
                    <ChevronRight size={18} className="text-text/20 dark:text-dark-text/20 group-hover:text-primary transition-all" />
                  </button>

                  <button 
                    onClick={() => {
                      setIsPrivacyModalOpen(true);
                      setIsProfileModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-bg-light dark:bg-dark-bg rounded-2xl hover:bg-primary/5 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-white dark:bg-dark-card text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="font-bold text-text dark:text-dark-text">{t.privacy}</span>
                    </div>
                    <ChevronRight size={18} className="text-text/20 dark:text-dark-text/20 group-hover:text-primary transition-all" />
                  </button>

                  <div className="pt-4 border-t border-bg-light dark:border-dark-border">
                    <div className="flex items-center justify-between p-4 text-text/40 dark:text-dark-text/40">
                      <div className="flex items-center gap-4">
                        <ShieldCheck size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">{t.security}</span>
                      </div>
                      <span className="text-[10px] font-black">v1.2.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <Info size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.about}</h2>
                  </div>
                  <button 
                    onClick={() => setIsAboutModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4 text-text/70 dark:text-dark-text/70 leading-relaxed font-medium">
                  <p>
                    {lang === 'bn' 
                      ? 'আমাদের ফিন্যান্স ট্র্যাকার অ্যাপে স্বাগতম। আমরা আপনাকে আপনার দৈনন্দিন খরচ এবং বাজেট সহজে পরিচালনা করতে সাহায্য করি।' 
                      : 'Welcome to our Finance Tracker app. We help you manage your daily expenses and budgets with ease.'}
                  </p>
                  <p>
                    {lang === 'bn'
                      ? 'আমাদের লক্ষ্য হলো আর্থিক স্বাধীনতা অর্জনে আপনাকে সহায়তা করা এবং আপনার অর্থ কোথায় যাচ্ছে তা বুঝতে সাহায্য করা।'
                      : 'Our mission is to help you achieve financial freedom and understand where your money goes.'}
                  </p>
                  <div className="pt-4">
                    <div className="bg-bg-light dark:bg-dark-bg p-4 rounded-2xl border-2 border-primary/5">
                      <p className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest mb-2">{lang === 'bn' ? 'ডেভেলপার' : 'Developer'}</p>
                      <p className="font-bold text-text dark:text-dark-text">Ahtasam Zidan</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <Phone size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.contact}</h2>
                  </div>
                  <button 
                    onClick={() => setIsContactModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-bg-light dark:bg-dark-bg rounded-2xl flex items-center gap-4 group hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-dark-card flex items-center justify-center text-primary shadow-sm">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest">{lang === 'bn' ? 'ইমেইল' : 'Email'}</p>
                      <p className="font-bold text-text dark:text-dark-text">support@financetracker.com</p>
                    </div>
                  </div>

                  <div className="p-4 bg-bg-light dark:bg-dark-bg rounded-2xl flex items-center gap-4 group hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-dark-card flex items-center justify-center text-primary shadow-sm">
                      <ExternalLink size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest">{lang === 'bn' ? 'ওয়েবসাইট' : 'Website'}</p>
                      <p className="font-bold text-text dark:text-dark-text">www.financetracker.com</p>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <p className="text-xs font-bold text-text/40 dark:text-dark-text/40">
                      {lang === 'bn' ? 'আমরা ২৪/৭ আপনার সেবায় নিয়োজিত' : 'We are available 24/7 for your support'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms Modal */}
      <AnimatePresence>
        {isTermsModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTermsModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            >
              <div className="p-8 border-b border-bg-light dark:border-dark-border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <FileText size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.terms}</h2>
                  </div>
                  <button 
                    onClick={() => setIsTermsModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-8 overflow-y-auto no-scrollbar space-y-6 text-sm font-medium text-text/70 dark:text-dark-text/70">
                <section>
                  <h3 className="text-text dark:text-dark-text font-black mb-2 uppercase tracking-wider text-xs">1. {lang === 'bn' ? 'শর্তাবলী গ্রহণ' : 'Acceptance of Terms'}</h3>
                  <p>{lang === 'bn' ? 'এই অ্যাপটি ব্যবহার করে আপনি আমাদের শর্তাবলী মেনে নিচ্ছেন।' : 'By using this app, you agree to be bound by these terms and conditions.'}</p>
                </section>
                <section>
                  <h3 className="text-text dark:text-dark-text font-black mb-2 uppercase tracking-wider text-xs">2. {lang === 'bn' ? 'গোপনীয়তা' : 'Privacy Policy'}</h3>
                  <p>{lang === 'bn' ? 'আপনার তথ্য আমাদের কাছে নিরাপদ। আমরা আপনার অনুমতি ছাড়া তথ্য শেয়ার করি না।' : 'Your data is safe with us. We do not share your information without your consent.'}</p>
                </section>
                <section>
                  <h3 className="text-text dark:text-dark-text font-black mb-2 uppercase tracking-wider text-xs">3. {lang === 'bn' ? 'ব্যবহারকারীর দায়িত্ব' : 'User Responsibility'}</h3>
                  <p>{lang === 'bn' ? 'আপনার অ্যাকাউন্টের তথ্যের গোপনীয়তা রক্ষার দায়িত্ব আপনার।' : 'You are responsible for maintaining the confidentiality of your account information.'}</p>
                </section>
                <section>
                  <h3 className="text-text dark:text-dark-text font-black mb-2 uppercase tracking-wider text-xs">4. {lang === 'bn' ? 'নিরাপত্তা' : 'Security'}</h3>
                  <p>{lang === 'bn' ? 'আমরা আপনার তথ্য সুরক্ষিত রাখতে আধুনিক প্রযুক্তি ব্যবহার করি।' : 'We use modern technology to keep your data secure and protected.'}</p>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Privacy Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            >
              <div className="p-8 border-b border-bg-light dark:border-dark-border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.privacy}</h2>
                  </div>
                  <button 
                    onClick={() => setIsPrivacyModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-8 overflow-y-auto no-scrollbar space-y-6 text-sm font-medium text-text/70 dark:text-dark-text/70">
                <p>{lang === 'bn' ? 'আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।' : 'Your privacy is extremely important to us.'}</p>
                <section>
                  <h3 className="text-text dark:text-dark-text font-black mb-2 uppercase tracking-wider text-xs">{lang === 'bn' ? 'তথ্য সংগ্রহ' : 'Data Collection'}</h3>
                  <p>{lang === 'bn' ? 'আমরা শুধুমাত্র আপনার আর্থিক লেনদেনের তথ্য সংগ্রহ করি যা আপনি নিজে ইনপুট দেন।' : 'We only collect financial transaction data that you manually input.'}</p>
                </section>
                <section>
                  <h3 className="text-text dark:text-dark-text font-black mb-2 uppercase tracking-wider text-xs">{lang === 'bn' ? 'তথ্যের ব্যবহার' : 'Use of Data'}</h3>
                  <p>{lang === 'bn' ? 'আপনার তথ্য শুধুমাত্র আপনাকে আর্থিক বিশ্লেষণ প্রদানের জন্য ব্যবহৃত হয়।' : 'Your data is used solely to provide you with financial analysis.'}</p>
                </section>
                <section>
                  <h3 className="text-text dark:text-dark-text font-black mb-2 uppercase tracking-wider text-xs">{lang === 'bn' ? 'তথ্য সুরক্ষা' : 'Data Protection'}</h3>
                  <p>{lang === 'bn' ? 'আমরা আপনার তথ্য এনক্রিপ্টেড অবস্থায় রাখি।' : 'We keep your data in an encrypted state.'}</p>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Month Picker Modal */}
      <AnimatePresence>
        {isMonthPickerOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMonthPickerOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-text dark:text-dark-text">{lang === 'bn' ? 'মাস নির্বাচন করুন' : 'Select Month'}</h2>
                  <button 
                    onClick={() => setIsMonthPickerOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const monthName = new Date(2000, i).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short' });
                    const isSelected = selectedMonth === i;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedMonth(i);
                          setIsMonthPickerOpen(false);
                        }}
                        className={`py-4 rounded-2xl font-black text-sm transition-all border-2 ${
                          isSelected 
                            ? 'bg-primary border-primary text-white shadow-lg' 
                            : 'bg-bg-light dark:bg-dark-bg border-transparent text-text/40 dark:text-dark-text/40 hover:border-primary/20 hover:text-primary'
                        }`}
                      >
                        {monthName}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between bg-bg-light dark:bg-dark-bg p-4 rounded-2xl">
                  <button 
                    onClick={() => setSelectedYear(prev => prev - 1)}
                    className="p-2 bg-white dark:bg-dark-card rounded-xl shadow-sm text-primary hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronRight size={20} className="rotate-180" />
                  </button>
                  <span className="text-xl font-black text-text dark:text-dark-text">{selectedYear}</span>
                  <button 
                    onClick={() => setSelectedYear(prev => prev + 1)}
                    className="p-2 bg-white dark:bg-dark-card rounded-xl shadow-sm text-primary hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manage Categories Modal */}
      <AnimatePresence>
        {isManageCategoriesModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsManageCategoriesModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-bg-light dark:border-white/5">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.manageCategories}</h2>
                  <button 
                    onClick={() => setIsManageCategoriesModalOpen(false)}
                    className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {categories.map(cat => (
                  <div key={cat.id} className="flex items-center justify-between p-4 bg-bg-light dark:bg-dark-bg rounded-2xl group transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-white dark:bg-dark-card text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        <IconComponent name={cat.icon} size={20} />
                      </div>
                      <div>
                        <p className="font-black text-text dark:text-dark-text">{lang === 'bn' ? cat.name.bn : cat.name.en}</p>
                        <p className="text-[10px] font-bold text-text/40 dark:text-dark-text/40 uppercase tracking-widest">{cat.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditCategory(cat)}
                        className="p-2 rounded-lg bg-white dark:bg-dark-card text-primary shadow-sm hover:bg-primary hover:text-white transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 rounded-lg bg-white dark:bg-dark-card text-danger shadow-sm hover:bg-danger hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-bg-light dark:bg-dark-bg">
                <button 
                  onClick={() => {
                    setEditingCategoryId(null);
                    setNewCategoryData({ nameEn: '', nameBn: '', icon: 'Utensils' });
                    setIsNewCategoryModalOpen(true);
                  }}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  {t.newCategory}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Category Modal */}
      <AnimatePresence>
        {isNewCategoryModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewCategoryModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-text dark:text-dark-text">{editingCategoryId ? t.editCategory : t.newCategory}</h2>
                <button 
                  onClick={() => setIsNewCategoryModalOpen(false)}
                  className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleNewCategorySubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">English Name</label>
                  <input
                    type="text"
                    value={newCategoryData.nameEn}
                    onChange={(e) => setNewCategoryData(prev => ({ ...prev, nameEn: e.target.value }))}
                    required
                    className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text"
                    placeholder="e.g. Entertainment"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">বাংলা নাম</label>
                  <input
                    type="text"
                    value={newCategoryData.nameBn}
                    onChange={(e) => setNewCategoryData(prev => ({ ...prev, nameBn: e.target.value }))}
                    required
                    className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text"
                    placeholder="যেমন: বিনোদন"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">Icon</label>
                  <div className="grid grid-cols-4 gap-4 max-h-48 overflow-y-auto p-2 no-scrollbar">
                    {['Utensils', 'ShoppingCart', 'Fuel', 'TrendingUp', 'Home', 'Target', 'Coffee', 'Car', 'Gift', 'Heart', 'Zap', 'Briefcase', 'Music', 'Plane', 'Smartphone', 'Globe'].map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setNewCategoryData(prev => ({ ...prev, icon }))}
                        className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center ${
                          newCategoryData.icon === icon ? 'bg-primary border-primary text-white' : 'bg-bg-light dark:bg-dark-bg border-transparent text-text/40 dark:text-dark-text/40 hover:border-primary/20'
                        }`}
                      >
                        <IconComponent name={icon} className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsNewCategoryModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl font-black text-text/60 dark:text-dark-text/60 bg-bg-light dark:bg-dark-bg hover:bg-bg-light/80 dark:hover:bg-dark-bg/80 transition-all"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-2xl font-black text-white bg-primary shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all"
                  >
                    {t.save}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Account Modal (Direct from Transaction) */}
      <AnimatePresence>
        {isNewAccountModalOpenDirect && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewAccountModalOpenDirect(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-text dark:text-dark-text">{t.addAccount}</h2>
                <button 
                  onClick={() => setIsNewAccountModalOpenDirect(false)}
                  className="p-2 rounded-full bg-bg-light dark:bg-dark-bg text-text/60 dark:text-dark-text/60 hover:text-danger transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleNewAccountSubmitDirect} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.accountName}</label>
                  <input
                    type="text"
                    value={newAccountData.name}
                    onChange={(e) => setNewAccountData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text"
                    placeholder={lang === 'bn' ? 'যেমন: ডাচ বাংলা ব্যাংক' : 'e.g. Dutch Bangla Bank'}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.type}</label>
                    <select
                      value={newAccountData.type}
                      onChange={(e) => setNewAccountData(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text appearance-none"
                    >
                      <option value="cash">{t.cash}</option>
                      <option value="bank">{t.bank}</option>
                      <option value="mobile">{t.mobile}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.currency}</label>
                    <select
                      value={newAccountData.currency}
                      onChange={(e) => setNewAccountData(prev => ({ ...prev, currency: e.target.value as any }))}
                      className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text appearance-none"
                    >
                      <option value="">{t.selectCurrency}</option>
                      {CURRENCIES.map(curr => (
                        <option key={curr.code} value={curr.code}>{curr.code}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-text/40 dark:text-dark-text/40 uppercase tracking-widest px-1">{t.balance}</label>
                  <input
                    type="number"
                    value={newAccountData.balance}
                    onChange={(e) => setNewAccountData(prev => ({ ...prev, balance: e.target.value }))}
                    required
                    className="w-full px-6 py-4 bg-bg-light dark:bg-dark-bg rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-dark-card outline-none transition-all font-bold text-text dark:text-dark-text"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsNewAccountModalOpenDirect(false)}
                    className="flex-1 py-4 rounded-2xl font-black text-text/60 dark:text-dark-text/60 bg-bg-light dark:bg-dark-bg hover:bg-bg-light/80 dark:hover:bg-dark-bg/80 transition-all"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-2xl font-black text-white bg-primary shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all"
                  >
                    {t.save}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Saved Toast */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[150] px-6 py-3 bg-secondary text-white font-black rounded-2xl shadow-2xl flex items-center gap-2"
          >
            <CheckCircle size={18} />
            <span>{lang === 'bn' ? 'সংরক্ষিত হয়েছে!' : 'Saved Successfully!'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

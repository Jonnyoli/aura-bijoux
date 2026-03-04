
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, Review, AuditLog, RestockRequest, SocialPost, SocialAccount } from './types';
import { MOCK_PRODUCTS, MOCK_USER } from './constants';



interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  user: User | null;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addUserAddress: (address: Omit<import('./types').Address, 'id'>) => Promise<boolean>;
  deleteUserAddress: (id: string) => Promise<boolean>;
  siteSettings: {
    name: string;
    logo: string;
    themeColor: string;
    saleMode?: boolean;
    globalDiscount?: number;
    stockAlertThreshold?: number;
    announcementText?: string;
    showAnnouncement?: boolean;
  };
  updateSiteSettings: (settings: Partial<AppContextType['siteSettings']>) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  logs: AuditLog[];
  addLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  restockRequests: RestockRequest[];
  addRestockRequest: (productId: string, email: string) => void;
  socialPosts: SocialPost[];
  addSocialPost: (post: Omit<SocialPost, 'id' | 'date'>) => void;
  updateSocialPost: (id: string, data: Partial<SocialPost>) => void;
  deleteSocialPost: (id: string) => void;
  socialAccounts: SocialAccount[];
  addSocialAccount: (account: Omit<SocialAccount, 'id'>) => void;
  deleteSocialAccount: (id: string) => void;
  vouchers: import('./types').Voucher[];
  addVoucher: (voucher: Omit<import('./types').Voucher, 'id' | 'usageCount'>) => void;
  updateVoucher: (id: string, data: Partial<import('./types').Voucher>) => void;
  deleteVoucher: (id: string) => void;
  appliedVoucher: import('./types').Voucher | null;
  setAppliedVoucher: React.Dispatch<React.SetStateAction<import('./types').Voucher | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          // Map MongoDB _id back to id and provide fallbacks for UI fields missing in DB
          const mappedData = data.map((p: any) => ({
            ...p,
            id: p._id,
            color: p.color || 'Gold',
            rating: p.rating || 4.8,
            isNew: p.isNew || false,
            isBestSeller: p.isBestSeller || false
          }));
          setProducts(mappedData);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);
  const [vouchers, setVouchers] = useState<import('./types').Voucher[]>(() => {
    const saved = localStorage.getItem('aura_vouchers');
    if (saved) return JSON.parse(saved);
    return [{
      id: 'v-aura10',
      code: 'AURA10',
      discountType: 'percentage',
      discountValue: 10,
      isActive: true,
      usageCount: 0,
      minPurchase: 0
    }];
  });
  const [appliedVoucher, setAppliedVoucher] = useState<import('./types').Voucher | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [restockRequests, setRestockRequests] = useState<RestockRequest[]>([]);

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(() => {
    const saved = localStorage.getItem('aura_social_accounts');
    return saved ? JSON.parse(saved) : [
      {
        id: 'acc1',
        type: 'instagram',
        handle: 'aurabijoux_pt',
        avatar: 'https://i.pravatar.cc/150?u=aura',
        status: 'connected',
        followers: 12400,
        lastSync: new Date().toISOString()
      }
    ];
  });

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('aura_social_posts');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        type: 'instagram',
        mediaUrl: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg',
        postUrl: 'https://instagram.com/aurabijoux_pt',
        productIds: ['1', '2'],
        status: 'approved',
        caption: 'Detalhes que iluminam o olhar. ✨ Nossa nova coleção Brisa do Mar já está disponível.',
        userName: 'aurabijoux_pt',
        date: new Date().toISOString()
      },
      {
        id: '2',
        type: 'tiktok',
        mediaUrl: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg',
        postUrl: 'https://tiktok.com/@aurabijoux_pt',
        productIds: ['3', '4'],
        status: 'approved',
        caption: 'GRWM with Aura Bijoux! 💖 Descobre como elevar o teu look básico com as nossas peças.',
        userName: 'aurabijoux_pt',
        date: new Date().toISOString()
      }
    ];
  });

  const [siteSettings, setSiteSettings] = useState<AppContextType['siteSettings']>({
    name: 'Aura',
    logo: '',
    themeColor: '#ec4899',
    saleMode: false,
    globalDiscount: 0,
    stockAlertThreshold: 5,
    announcementText: 'Envio Grátis em encomendas superiores a 50€! 🚚',
    showAnnouncement: true
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('aura_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('aura_social_accounts', JSON.stringify(socialAccounts));
  }, [socialAccounts]);

  useEffect(() => {
    localStorage.setItem('aura_social_posts', JSON.stringify(socialPosts));
  }, [socialPosts]);

  useEffect(() => {
    localStorage.setItem('aura_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setCartOpen(true);
    addLog({
      action: 'Adicionou ao carrinho',
      targetType: 'Cart',
      details: `${product.name} (x${qty})`,
      userId: user?.id || 'anonymous'
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  const login = async (email: string, password?: string) => {
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password || 'password123' })
      });

      if (res.ok) {
        const data = await res.json();
        const mappedAddresses = data.addresses ? data.addresses.map((a: any) => ({ ...a, id: a._id })) : [];
        const newUser = { ...data, id: data._id, addresses: mappedAddresses, avatar: `https://i.pravatar.cc/150?u=${data._id}` };
        setUser(newUser);
        localStorage.setItem('aura_user', JSON.stringify(newUser));
        addLog({ action: 'LOGIN', details: `Login efetuado por ${email}`, userId: newUser.id });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    addLog({ action: 'LOGOUT', details: `Logout efetuado`, userId: user?.id || 'anonymous' });
    setUser(null);
    localStorage.removeItem('aura_user');
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    addLog({ action: 'ORDER_PLACE', details: `Encomenda efetuada: ${order.id}`, userId: user?.id || 'anonymous' });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const [allUsers, setAllUsers] = useState<User[]>([MOCK_USER]);

  const updateUser = (id: string, data: Partial<User>) => {
    setAllUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
    if (user?.id === id) setUser(prev => prev ? { ...prev, ...data } : null);
  };

  const deleteUser = (id: string) => {
    setAllUsers(prev => prev.filter(u => u.id !== id));
  };

  const addUserAddress = async (addressData: Omit<import('./types').Address, 'id'>) => {
    if (!user?.token) return false;
    try {
      const res = await fetch('/api/users/profile/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(addressData)
      });
      if (res.ok) {
        const addresses = await res.json();
        const mappedAddresses = addresses.map((a: any) => ({ ...a, id: a._id }));
        const updatedUser = { ...user, addresses: mappedAddresses };
        setUser(updatedUser);
        localStorage.setItem('aura_user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to add address', error);
      return false;
    }
  };

  const deleteUserAddress = async (id: string) => {
    if (!user?.token) return false;
    try {
      const res = await fetch(`/api/users/profile/address/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        const addresses = await res.json();
        const mappedAddresses = addresses.map((a: any) => ({ ...a, id: a._id }));
        const updatedUser = { ...user, addresses: mappedAddresses };
        setUser(updatedUser);
        localStorage.setItem('aura_user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete address', error);
      return false;
    }
  };

  const updateSiteSettings = (settings: Partial<AppContextType['siteSettings']>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
    addLog({ action: 'SETTINGS_UPDATE', details: 'Definições do site atualizadas', userId: user?.id || 'anonymous' });
  };

  const addReview = (productId: string, review: Omit<Review, 'id' | 'date'>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newReview = {
          ...review,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString()
        };
        return { ...p, reviews: [...(p.reviews || []), newReview] };
      }
      return p;
    }));
  };

  const addLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addRestockRequest = (productId: string, email: string) => {
    setRestockRequests(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), productId, email, date: new Date().toISOString(), status: 'Pendente' }]);
  };

  const addSocialPost = (post: Omit<SocialPost, 'id' | 'date'>) => {
    const newPost = { ...post, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() };
    setSocialPosts(prev => [newPost, ...prev]);
  };

  const updateSocialPost = (id: string, data: Partial<SocialPost>) => {
    setSocialPosts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteSocialPost = (id: string) => {
    setSocialPosts(prev => prev.filter(p => p.id !== id));
  };

  const addSocialAccount = (account: Omit<SocialAccount, 'id'>) => {
    const newAccount = { ...account, id: Math.random().toString(36).substr(2, 9) };
    setSocialAccounts(prev => [newAccount, ...prev]);
  };

  const deleteSocialAccount = (id: string) => {
    setSocialAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  const addVoucher = (voucher: Omit<import('./types').Voucher, 'id' | 'usageCount'>) => {
    setVouchers(prev => [...prev, { ...voucher, id: Math.random().toString(36).substr(2, 9), usageCount: 0 }]);
  };

  const updateVoucher = (id: string, data: Partial<import('./types').Voucher>) => {
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, ...data } : v));
  };

  const deleteVoucher = (id: string) => {
    setVouchers(prev => prev.filter(v => v.id !== id));
  };

  return (
    <AppContext.Provider value={{
      products, setProducts, cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      user, login, logout, orders, addOrder, wishlist, toggleWishlist,
      allUsers, setAllUsers, updateUser, deleteUser, addUserAddress, deleteUserAddress,
      siteSettings, updateSiteSettings, addReview, theme, toggleTheme,
      quickViewProduct, setQuickViewProduct, logs, addLog, restockRequests, addRestockRequest,
      socialPosts, addSocialPost, updateSocialPost, deleteSocialPost,
      socialAccounts, addSocialAccount, deleteSocialAccount,
      vouchers, addVoucher, updateVoucher, deleteVoucher,
      appliedVoucher, setAppliedVoucher,
      isCartOpen, setCartOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

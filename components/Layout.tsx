
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Heart, Settings, LogOut, Moon, Sun, ChevronDown } from 'lucide-react';
import { useApp } from '../store';
import Chatbot from './Chatbot';
import QuickViewModal from './QuickViewModal';
import ExitIntentPopup from './ExitIntentPopup';
import SplashScreen from './SplashScreen';
import SidebarCart from './SidebarCart';
import ScrollToTop from './ScrollToTop';
import WhatsAppButton from './WhatsAppButton'; // Added import

const MEGA_MENU_DATA = [
  {
    title: 'Coleções',
    image: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg',
    links: [
      { name: 'Nova Coleção', href: '/catalog?cat=Nova' },
      { name: 'Bestsellers', href: '/catalog?cat=Bestseller' },
      { name: 'Conjuntos de Luxo', href: '/catalog?cat=Conjuntos' },
      { name: 'Edição Limitada', href: '/catalog?cat=Limitada' }
    ]
  },
  {
    title: 'Produtos',
    image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg',
    links: [
      { name: 'Colares', href: '/catalog?cat=Colares' },
      { name: 'Brincos', href: '/catalog?cat=Brincos' },
      { name: 'Anéis', href: '/catalog?cat=Anéis' },
      { name: 'Pulseiras', href: '/catalog?cat=Pulseiras' }
    ]
  },
  {
    title: 'Explore',
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg',
    links: [
      { name: 'Guia de Tamanhos', href: '/care' },
      { name: 'Video Shopping', href: '/video-shopping' },
      { name: 'Inspirations', href: '/#social' },
      { name: 'Gift Card', href: '/contact' }
    ]
  }
];

const proxySmall = (url: string) => `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=300&fit=cover`;

const Navbar: React.FC = () => {
  const { cart, user, logout, wishlist, siteSettings, theme, toggleTheme, setCartOpen } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Use useLayoutEffect for immediate scroll reset before paint
  React.useLayoutEffect(() => {
    // Override browser's scroll restoration aggressively
    window.scrollTo(0, 0);

    // Double-check after paint
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Handle route changes
    window.scrollTo(0, 0);

    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="relative bg-white dark:bg-black border-b border-slate-100 dark:border-white/10 transition-colors duration-300 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Mobile Menu Toggle */}
          <button
            className="sm:hidden p-2 text-slate-500 dark:text-slate-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-2xl sm:text-3xl font-serif font-bold text-pink-500 tracking-tight"
            >
              {siteSettings.logo ? (
                <img src={siteSettings.logo} alt={siteSettings.name} className="h-10 w-auto object-contain" />
              ) : (
                <>
                  {siteSettings.name?.split(' ')[0] || 'Aura'} <span className="text-gold">{siteSettings.name?.split(' ').slice(1).join(' ') || 'Bijoux'}</span>
                </>
              )}
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-10 items-center">
            <Link to="/catalog" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white hover:text-pink-500 transition-colors">Loja</Link>

            <div className="relative" onMouseEnter={() => setActiveMegaMenu('colecoes')} onMouseLeave={() => setActiveMegaMenu(null)}>
              <button className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-1 ${activeMegaMenu ? 'text-pink-500' : 'text-slate-900 dark:text-white'}`}>
                Coleções
                <ChevronDown size={10} className={`transition-transform duration-300 ${activeMegaMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Overlay */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300 ${activeMegaMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="bg-white dark:bg-black shadow-luxury rounded-[2.5rem] border border-slate-100 dark:border-white/10 p-10 flex gap-12 w-[850px]">
                  {MEGA_MENU_DATA.map((section, idx) => (
                    <div key={idx} className="flex-1 space-y-6">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative group/img">
                        <img src={proxySmall(section.image)} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover/img:bg-transparent transition-colors" />
                      </div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-4">{section.title}</h4>
                      <ul className="space-y-3">
                        {section.links.map((link, lidx) => (
                          <li key={lidx}>
                            <Link
                              to={link.href}
                              className="text-sm text-slate-600 dark:text-slate-300 hover:text-pink-500 transition-colors block font-medium"
                              onClick={() => setActiveMegaMenu(null)}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/catalog?cat=Limitada" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white hover:text-pink-500 transition-colors">Edição Limitada</Link>
            <Link to="/care" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white hover:text-pink-500 transition-colors">Cuidados</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-5">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-slate-900 dark:text-white hover:text-pink-500 transition-colors">
              <Search size={20} />
            </button>
            <button onClick={toggleTheme} className="p-2 text-slate-900 dark:text-white hover:text-pink-500 transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/profile" className="hidden sm:block p-2 text-slate-900 dark:text-white hover:text-pink-500 transition-colors">
              <Heart size={20} className={wishlist.length > 0 ? "fill-pink-500 text-pink-500" : ""} />
            </Link>

            <div className="relative">
              <button
                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : navigate('/login')}
                onMouseEnter={() => user && setIsUserMenuOpen(true)}
                className="p-2 text-slate-900 dark:text-white hover:text-pink-500 transition-colors flex items-center gap-1"
              >
                <User size={20} />
                {user && <ChevronDown size={12} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />}
              </button>

              {user && isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-black rounded-2xl shadow-luxury border border-slate-100 dark:border-white/10 py-3 animate-fade-in-down z-[110]"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-5 py-3 border-b border-slate-50 dark:border-white/10 mb-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link to="/profile" className="block px-5 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Minha Conta</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-5 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center">
                      <Settings size={14} className="mr-2" /> Admin Dashboard
                    </Link>
                  )}
                  <div className="mt-2 pt-2 border-t border-slate-50 dark:border-white/10">
                    <button onClick={() => { logout(); setIsUserMenuOpen(false); }} className="w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center font-bold">
                      <LogOut size={14} className="mr-2" /> Sair
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-slate-900 dark:text-white hover:text-pink-500 transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-t border-slate-100 dark:border-white/10 shadow-2xl py-6 px-6 space-y-6 z-[100]">
          <Link to="/catalog" className="block text-lg font-bold text-slate-900 dark:text-white">Todos os Produtos</Link>
          <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-white/5">
            <Link to="/catalog?cat=Colares" className="block text-slate-600 dark:text-slate-300">Colares</Link>
            <Link to="/catalog?cat=Brincos" className="block text-slate-600 dark:text-slate-300">Brincos</Link>
            <Link to="/catalog?cat=Anéis" className="block text-slate-600 dark:text-slate-300">Anéis</Link>
          </div>
          <div className="pt-6 border-t border-slate-100 dark:border-white/10">
            <Link to="/profile" className="flex items-center text-slate-900 dark:text-white font-bold">
              <Heart size={18} className="mr-2" /> Wishlist ({wishlist.length})
            </Link>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-slate-100 dark:border-white/10 p-4 shadow-lg animate-fade-in-down z-[100]">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center bg-slate-50 dark:bg-white/5 rounded-full px-4 py-2 border border-slate-200 dark:border-white/10">
            <Search size={20} className="text-slate-400 mr-2" />
            <input
              autoFocus
              type="text"
              placeholder="Pesquisar por colar, brincos..."
              className="bg-transparent w-full outline-none text-slate-900 dark:text-white py-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" onClick={() => setIsSearchOpen(false)}><X size={20} className="text-slate-400" /></button>
          </form>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const { siteSettings } = useApp();
  return (
    <footer className="bg-white dark:bg-black border-t border-slate-100 dark:border-white/10 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-pink-500 mb-8 block">
              {siteSettings.logo ? (
                <img src={siteSettings.logo} alt={siteSettings.name} className="h-12 w-auto object-contain" />
              ) : (
                <>
                  {siteSettings.name?.split(' ')[0] || 'Aura'} <span className="text-gold">{siteSettings.name?.split(' ').slice(1).join(' ') || 'Bijoux'}</span>
                </>
              )}
            </Link>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-sm">
              Joalharia artesanal feita com amor para realçar a beleza natural de cada mulher. Peças únicas, modernas e sofisticadas.
            </p>
            <div className="flex space-x-5">
              <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 cursor-pointer hover:text-pink-500 transition-colors">IG</span>
              <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 cursor-pointer hover:text-pink-500 transition-colors">FB</span>
              <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 cursor-pointer hover:text-pink-500 transition-colors">PN</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">Coleções</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
              <li><Link to="/catalog" className="hover:text-pink-500 transition-colors">Lançamentos</Link></li>
              <li><Link to="/catalog?cat=Colares" className="hover:text-pink-500 transition-colors">Colares</Link></li>
              <li><Link to="/catalog?cat=Brincos" className="hover:text-pink-500 transition-colors">Brincos</Link></li>
              <li><Link to="/catalog?cat=Anéis" className="hover:text-pink-500 transition-colors">Anéis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">Apoio ao Cliente</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
              <li><Link to="/faq" className="hover:text-pink-500 transition-colors">Perguntas Frequentes</Link></li>
              <li><Link to="/shipping" className="hover:text-pink-500 transition-colors">Envios e Devoluções</Link></li>
              <li><Link to="/contact" className="hover:text-pink-500 transition-colors">Contactos</Link></li>
              <li><Link to="/care" className="hover:text-pink-500 transition-colors">Cuidados com as Peças</Link></li>
              <li><Link to="/about" className="hover:text-pink-500 transition-colors">Sobre Nós</Link></li> {/* Added 'Sobre Nós' link */}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Receba 10% de desconto na primeira compra.</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Obrigado por subscrever! Verifique o seu email.');
              (e.target as HTMLFormElement).reset();
            }} className="flex flex-col space-y-3">
              <input
                required
                type="email"
                placeholder="O seu e-mail"
                className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-pink-300 dark:text-white transition-colors text-sm"
              />
              <button type="submit" className="bg-pink-500 text-white rounded-xl px-4 py-3 font-bold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20">Subscrever</button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2024 {siteSettings.name}. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <Link to="/privacy" className="hover:text-pink-500 transition-colors">Política de Privacidade</Link>
            <Link to="/terms" className="hover:text-pink-500 transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { siteSettings, theme } = useApp();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-black' : 'bg-white'} text-slate-900 dark:text-white transition-colors duration-300`}>
      <SplashScreen />
      <ScrollToTop />
      <header className="fixed top-0 left-0 right-0 z-[100]">
        {siteSettings.showAnnouncement && siteSettings.announcementText && (
          <div className="bg-slate-900 dark:bg-black text-gold py-2.5 px-4 text-center text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase relative z-[110] border-b border-gold/10 shimmer">
            <p className="flex items-center justify-center gap-2">
              <span className="opacity-50">✦</span>
              {siteSettings.announcementText}
              <span className="opacity-50">✦</span>
            </p>
          </div>
        )}
        <Navbar />
      </header>
      <main key={location.pathname} className={`flex-grow ${siteSettings.showAnnouncement ? 'pt-24 sm:pt-28' : 'pt-16 sm:pt-20'} animate-page-reveal`}>
        {children}
      </main>
      <Footer />
      <Chatbot />
      <QuickViewModal />
      <ExitIntentPopup />
      <SidebarCart />
    </div>
  );
};

export default Layout;

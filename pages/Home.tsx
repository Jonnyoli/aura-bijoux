
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCcw, Instagram, Facebook, Twitter, Zap } from 'lucide-react';
import { useApp } from '../store';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import SocialFeed from '../components/SocialFeed';


const Home: React.FC = () => {
  const { products, theme } = useApp();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter featured products
  const featuredProducts = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  // Dynamic Hero Image based on Theme (4K High Resolution)
  const heroImage = theme === 'dark'
    ? "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=3840&auto=format&fit=crop" // Layered Gold Necklaces
    : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=3840&auto=format&fit=crop"; // Elegant Jewelry Display (Clearer)

  return (
    <div className="space-y-24 pb-24 overflow-hidden">
      {/* Hero Section - Immersive Parallax */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <img
            key={theme}
            src={heroImage}
            alt="Joalharia Aura"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover animate-fade-in transition-opacity duration-700"
            style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.1)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10 transition-colors duration-700"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-[0.3em] border border-white/20 mb-8">
            <Sparkles size={14} className="text-luxury" /> NOVA COLEÇÃO AURA 2024
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            Onde o <span className="text-luxury italic">Brilho</span> <br />
            Encontra a <span className="text-luxury">Alma</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Descubra peças artesanais banhadas a ouro e pedras naturais, desenhadas para realçar a sua beleza única em todos os momentos.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/catalog" className="px-10 py-5 bg-pink-500 text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl shadow-pink-500/20 flex items-center justify-center gap-2 group">
              Descobrir Coleção <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/catalog?cat=Conjuntos" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              Ver Conjuntos
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-12 bg-white"></div>
          <span className="text-[10px] text-white font-bold uppercase tracking-widest vertical-text">Scroll</span>
        </div>
      </section>

      {/* Categories Fast Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { id: 'cat-colares', name: 'Colares', img: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg' },
            { id: 'cat-brincos', name: 'Brincos', img: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg' },
            { id: 'cat-aneis', name: 'Anéis', img: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg' },
            { id: 'cat-pulseiras', name: 'Pulseiras', img: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg' }
          ].map((cat) => (
            <Link key={cat.id} to={`/catalog?cat=${cat.name}`} className="group relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-sm border border-pink-50 dark:border-white/10">
              <img
                src={cat.img}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-pink-900/40 transition-colors flex items-end p-8">
                <div>
                  <h3 className="text-white font-serif text-3xl font-bold mb-1">{cat.name}</h3>
                  <span className="text-pink-100 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ver Tudo</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-4">
          <div className="animate-fade-in-up">
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Seleção Especial</span>
            <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">Destaques da Semana</h2>
          </div>
          <Link to="/catalog" className="text-pink-500 font-bold hover:underline mb-2 flex items-center gap-2 text-sm uppercase tracking-widest group">
            Ver Loja Completa <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.map((p, idx) => (
            <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="relative py-24 bg-slate-50 dark:bg-black transition-colors duration-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white dark:bg-black skew-x-12 translate-x-32 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gold/20 rounded-[4rem] blur-2xl group-hover:bg-pink-500/10 transition-colors duration-1000"></div>
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd"
                  alt="Nossa Oficina"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white dark:bg-black rounded-[2.5rem] shadow-2xl p-6 hidden sm:flex flex-col justify-center border border-slate-100 dark:border-white/10 animate-bounce-slow">
                <p className="text-gold font-serif text-4xl font-bold mb-1">100%</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 leading-tight font-sans">Produção Ética e Manual</p>
              </div>
            </div>

            <div className="space-y-10 animate-fade-in-up">
              <div>
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Manifesto Aura</span>
                <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight mb-6 italic">Beleza que transcende o tempo.</h2>
              </div>
              <p className="text-lg text-slate-500 dark:text-gray-300 leading-relaxed font-light">
                Na Aura Bijoux, acreditamos que a joalharia é mais do que um acessório; é uma extensão da sua identidade. Cada peça é cuidadosamente selecionada e polida para garantir que o seu brilho seja eterno, tal como as suas memórias mais preciosas.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white dark:bg-black rounded-2xl flex items-center justify-center text-gold shadow-sm border border-slate-100 dark:border-white/10">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Garantia Vitalícia</h4>
                    <p className="text-xs text-slate-400 mt-1">Qualidade premium em cada detalhe.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white dark:bg-black rounded-2xl flex items-center justify-center text-gold shadow-sm border border-slate-100 dark:border-white/10">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Envio Expresso</h4>
                    <p className="text-xs text-slate-400 mt-1">Grátis em compras superiores a 50€.</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-gold hover:translate-x-2 transition-transform">
                A nossa história <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">O que dizem sobre nós</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">Família Aura Bijoux</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Maria Inês",
              text: "Comprei o colar Initial e não o largo. Já tomei banho com ele imensas vezes e a cor continua intacta. Muito recomendo!",
              item: "Colar Initial Box",
              rating: 5
            },
            {
              name: "Joana Almeida",
              text: "A entrega foi super rápida, chegou no dia seguinte, e a embalagem é qualquer coisa de maravilhosa. Parecia que estava a abrir um presente.",
              item: "Conjunto Pearl Essential",
              rating: 5
            },
            {
              name: "Sofia Cardoso",
              text: "Finalmente uns brincos que não me fazem alergia! O acabamento é muito premium e o apoio ao cliente pelo WhatsApp foi excelente.",
              item: "Brincos Hoop Classic",
              rating: 5
            }
          ].map((review, i) => (
            <div key={i} className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 p-8 rounded-[2.5rem] shadow-soft dark:shadow-luxury hover:-translate-y-2 transition-transform group animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="flex gap-1 mb-6 text-gold">
                {[...Array(review.rating)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 dark:text-gray-300 italic mb-8 font-light relative">
                <span className="text-4xl text-pink-100 dark:text-white/5 absolute -top-4 -left-2 font-serif font-bold">"</span>
                {review.text}
                <span className="text-4xl text-pink-100 dark:text-white/5 absolute -bottom-4 -right-2 font-serif font-bold">"</span>
              </p>
              <div className="flex items-center gap-4 border-t border-slate-50 dark:border-white/5 pt-6">
                <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center font-bold text-slate-400 dark:text-slate-500 uppercase">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</h4>
                  <span className="text-xs text-pink-500 font-bold tracking-widest uppercase">{review.item}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Feed Section */}
      <section className="bg-white dark:bg-black transition-colors duration-500">
        <SocialFeed />
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;

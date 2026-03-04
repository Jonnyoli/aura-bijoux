
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-white dark:bg-black rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 hover:border-pink-200 dark:hover:border-white/20 transition-all duration-700 flex flex-col hover:-translate-y-2 hover:shadow-soft dark:hover:shadow-luxury">
      {/* Premium Gradient Background - Subtle Mesh */}
      <div className="absolute inset-0 mesh-gradient opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-slate-50 dark:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white text-[9px] uppercase font-bold px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">Novo</span>
        )}
        {product.isBestSeller && (
          <span className="bg-gold/90 backdrop-blur-md text-white text-[9px] uppercase font-bold px-3 py-1 rounded-full border border-gold/20 shadow-lg shadow-gold/10">Bestseller</span>
        )}
      </div>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:opacity-0"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] scale-110 group-hover:scale-100 opacity-0 group-hover:opacity-100"
          />
        )}

        {/* Gloss Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Actions Overlay - Magnetic Buttons Feel */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <button
            onClick={(e) => { e.preventDefault(); setQuickViewProduct(product); }}
            className="w-12 h-12 bg-white dark:bg-black rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-xl hover:bg-gold hover:text-white transition-all duration-300 hover:scale-110 border border-transparent dark:border-white/10"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 border border-transparent dark:border-white/10 ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white dark:bg-black text-slate-920 dark:text-white hover:text-pink-500'}`}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      {/* Info - Refined Typography */}
      <div className="p-3 sm:p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] text-pink-400 font-bold uppercase tracking-[0.2em]">{product.category}</p>
          <div className="flex items-center gap-1">
            <span className="text-gold text-xs">★</span>
            <span className="text-gray-400 text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="text-slate-900 dark:text-white font-serif font-bold text-sm sm:text-lg mb-3 sm:mb-4 hover:text-gold transition-colors line-clamp-2 leading-tight">
          {product.name}
        </Link>

        <div className="mt-auto flex justify-between items-center gap-2">
          <p className="text-slate-900 dark:text-white font-bold text-sm sm:text-xl shrink-0">{product.price.toFixed(2)}€</p>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="flex items-center justify-center sm:justify-start gap-2 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-gold transition-colors transition-transform active:scale-95 bg-slate-50 dark:bg-white/5 sm:bg-transparent p-1 px-2 sm:p-0 rounded-lg"
          >
            <span className="hidden xs:inline">Add</span> <ShoppingBag size={14} className="sm:inline" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

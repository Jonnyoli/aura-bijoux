import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../store';
import { ShoppingBag, ChevronUp, ChevronDown, Heart, MessageCircle, Share2, Play, Pause, Volume2, VolumeX, X, Zap, Star } from 'lucide-react';
import { Product, SocialPost } from '../types';


const VideoShopping: React.FC = () => {
    const { socialPosts, products, addToCart } = useApp();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    // Filter only video-type posts
    const videoPosts = socialPosts.filter(p => p.type === 'tiktok' || p.type === 'instagram');

    const containerRef = useRef<HTMLDivElement>(null);

    const getTaggedProducts = (ids: string[]) => {
        return products.filter(p => ids.includes(p.id));
    };

    const nextVideo = () => {
        if (activeIndex < videoPosts.length - 1) {
            setActiveIndex(prev => prev + 1);
            setShowProducts(false);
        }
    };

    const prevVideo = () => {
        if (activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
            setShowProducts(false);
        }
    };

    if (videoPosts.length === 0) return null;

    return (
        <div className="relative h-screen w-full bg-slate-950 overflow-hidden flex items-center justify-center lg:py-10">
            {/* Background Blur */}
            <div className="absolute inset-0 z-0">
                <img
                    src={videoPosts[activeIndex].mediaUrl}
                    alt=""
                    className="w-full h-full object-cover blur-3xl opacity-20"
                />
            </div>

            <div className="relative h-full aspect-[9/16] max-h-[900px] w-full max-w-[500px] flex flex-col z-10 group overflow-hidden lg:rounded-[3rem] shadow-2xl shadow-black/50 border border-white/5">
                {/* Video Area */}
                <div
                    className="flex-grow relative bg-slate-900"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
                        <div className="h-full bg-pink-500 w-1/3 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                    </div>

                    {/* Controls Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-black/40 via-transparent to-black/60 opacity-100 transition-opacity">
                        <div className="flex justify-between items-start">
                            <div className="px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Aura Live Shop</span>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                            >
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                        </div>

                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white">
                                    <Play size={40} fill="currentColor" />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-end">
                            <div className="flex-grow mr-12 animate-fade-in-up">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${videoPosts[activeIndex].userName}`} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">@{videoPosts[activeIndex].userName}</p>
                                        <p className="text-[10px] text-white/60">Aura Community Influencer</p>
                                    </div>
                                </div>
                                <p className="text-white text-sm line-clamp-2 mb-2 font-light leading-relaxed">
                                    {videoPosts[activeIndex].caption}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="text-pink-400 font-bold text-xs uppercase tracking-widest">#AuraMagic</span>
                                    <span className="text-white/40 text-[10px]">Ver Transmissão Original</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 items-center">
                                <button className="flex flex-col items-center gap-1">
                                    <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-pink-500 transition-colors">
                                        <Heart size={24} />
                                    </div>
                                    <span className="text-white text-[10px] font-bold">12.4K</span>
                                </button>
                                <button className="flex flex-col items-center gap-1">
                                    <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-pink-500 transition-colors">
                                        <MessageCircle size={24} />
                                    </div>
                                    <span className="text-white text-[10px] font-bold">482</span>
                                </button>
                                <button className="flex flex-col items-center gap-1">
                                    <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-pink-500 transition-colors">
                                        <Share2 size={24} />
                                    </div>
                                    <span className="text-white text-[10px] font-bold">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Video Placeholder (Static Image w/ Loading State) */}
                    <div className="w-full h-full relative">
                        <img
                            src={videoPosts[activeIndex].mediaUrl}
                            alt=""
                            className={`w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'scale-100' : 'scale-105 blur-[2px]'}`}
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                </div>

                {/* Tagged Products Pull-up */}
                <div className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-[2.5rem] transition-all duration-700 z-30 ${showProducts ? 'h-[60%]' : 'h-16'}`}>
                    <button
                        onClick={() => setShowProducts(!showProducts)}
                        className="w-full h-16 flex flex-col items-center justify-center gap-1"
                    >
                        <div className="w-10 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mb-1"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Ver Peças no Vídeo</span>
                    </button>

                    <div className="px-6 pb-6 overflow-y-auto h-[calc(100%-64px)] scrollbar-hide">
                        <div className="space-y-4">
                            {getTaggedProducts(videoPosts[activeIndex].productIds).map((p, i) => (
                                <div key={p.id} className="group flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm">
                                        <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        {p.isBestSeller && (
                                            <div className="absolute top-1 left-1 bg-gold text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">TOP</div>
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{p.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-pink-500 font-bold text-sm">{p.price.toFixed(2)}€</span>
                                            <div className="flex items-center gap-0.5 ml-auto">
                                                <Star size={10} className="text-gold fill-gold" />
                                                <span className="text-[10px] font-bold text-slate-400">{p.rating}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { addToCart(p); setShowProducts(false); }}
                                            className="mt-3 w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-pink-500 dark:hover:bg-pink-500 dark:hover:text-white transition-all shadow-lg shadow-black/5"
                                        >
                                            Adicionar ao Carrinho
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-gold/5 border border-gold/10 rounded-2xl text-center">
                            <p className="text-[11px] text-gold font-bold uppercase tracking-widest mb-2">Oferta Exclusiva Aura Live</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Usa o código <span className="text-slate-900 dark:text-white font-bold">LIVE10</span> para teres 10% extra nestas peças! ✨
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vertical Navigation Buttons */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                    <button
                        onClick={(e) => { e.stopPropagation(); prevVideo(); }}
                        disabled={activeIndex === 0}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/40 transition-all shadow-xl"
                    >
                        <ChevronUp size={20} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextVideo(); }}
                        disabled={activeIndex === videoPosts.length - 1}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/40 transition-all shadow-xl"
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>

                {/* Status Bar Mock */}
                <div className="absolute top-0 inset-x-0 h-8 bg-black/10 z-50 flex items-center justify-between px-6">
                    <span className="text-white text-[10px] font-bold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                        <Zap size={10} className="text-white" fill="currentColor" />
                        <div className="w-4 h-2 border border-white/50 rounded-sm"></div>
                    </div>
                </div>
            </div>

            {/* Float Shop Button - Desktop Only */}
            <div className="hidden xl:flex fixed bottom-12 right-12 flex-col gap-4 animate-fade-in">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-white/10 max-w-[280px]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                            <ShoppingBag size={20} />
                        </div>
                        <h4 className="font-serif font-bold dark:text-white">Shopping Feed</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Explora a nossa coleção de forma interativa. Compra o que vês nos vídeos dos nossos embaixadores.
                    </p>
                    <button className="w-full mt-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
                        Ir para a Loja
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoShopping;

import React, { useState } from 'react';
import { useApp } from '../store';
import { Camera, Zap, Users, ShoppingBag, X, ChevronRight } from 'lucide-react';
import { SocialPost } from '../types';
import { Link } from 'react-router-dom';


const SocialFeed: React.FC = () => {
    const { socialPosts, products, addToCart } = useApp();
    const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
    const [filter, setFilter] = useState<'all' | 'instagram' | 'tiktok'>('all');

    const filteredPosts = socialPosts.filter(post => {
        const typeMatch = filter === 'all' || post.type === filter;
        const statusMatch = post.status === 'approved';
        return typeMatch && statusMatch;
    });

    const getTaggedProducts = (ids: string[]) => {
        return products.filter(p => ids.includes(p.id));
    };

    return (
        <div className="py-24 bg-white dark:bg-black overflow-hidden transiton-colors duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="animate-fade-in-up">
                        <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Aura Community</span>
                        <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">Shop the Look</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl">
                            Inspira-te no estilo da nossa comunidade. Partilha o teu look com #AuraBijoux para teres a oportunidade de apareceres aqui.
                        </p>
                    </div>

                    <div className="flex bg-slate-50 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-inner">
                        {[
                            { id: 'all', label: 'Todos', icon: ShoppingBag },
                            { id: 'instagram', label: 'Instagram', icon: Camera },
                            { id: 'tiktok', label: 'TikTok', icon: Zap }
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setFilter(btn.id as any)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${filter === btn.id
                                    ? 'bg-white dark:bg-white/10 text-pink-500 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                    }`}
                            >
                                <btn.icon size={14} />
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer animate-fade-in-up"
                            onClick={() => setSelectedPost(post)}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <img
                                src={post.mediaUrl}
                                alt={`Post ${post.id}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2 shadow-xl">
                                    <span className="text-xs font-bold text-slate-900">Shop the Look</span>
                                    <ChevronRight size={14} className="text-slate-900" />
                                </div>
                            </div>

                            <div className="absolute top-6 left-6 flex items-center gap-2">
                                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20">
                                    {post.type === 'instagram' ? <Camera size={14} className="text-white" /> : <Zap size={14} className="text-white" />}
                                </div>
                                <span className="text-white text-[10px] font-bold drop-shadow-md">@{post.userName}</span>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 flex -space-x-2">
                                {getTaggedProducts(post.productIds).slice(0, 3).map((p) => (
                                    <div key={p.id} className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-lg relative group/item">
                                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center"></div>
                                    </div>
                                ))}
                                {post.productIds.length > 3 && (
                                    <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-900">
                                        +{post.productIds.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shop the Look Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-fade-in" onClick={() => setSelectedPost(null)}></div>
                    <div className="relative w-full max-w-6xl bg-white dark:bg-black rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-in max-h-[90vh] border border-slate-100 dark:border-white/10">
                        <button
                            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
                            onClick={() => setSelectedPost(null)}
                        >
                            <X size={24} />
                        </button>

                        {/* Media side */}
                        <div className="w-full lg:w-3/5 relative bg-slate-100 dark:bg-slate-900 group">
                            <img
                                src={selectedPost.mediaUrl}
                                alt={`Post ${selectedPost.id}`} className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-10 left-10 hidden md:block">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50">
                                        <img src={`https://i.pravatar.cc/150?u=${selectedPost.userName}`} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                        <p className="text-white font-bold text-sm">@{selectedPost.userName}</p>
                                        <div className="flex items-center gap-4 text-[10px] text-white/60 mt-0.5">
                                            <span className="flex items-center gap-1"><Camera size={10} /> Instagram</span>
                                            <span className="flex items-center gap-1"><Zap size={10} /> Community</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info side */}
                        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto bg-slate-50 dark:bg-black">
                            <div className="mb-10">
                                <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed italic">
                                    "{selectedPost.caption}"
                                </p>
                            </div>

                            <div className="space-y-6">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Peças na Publicação</p>
                                {getTaggedProducts(selectedPost.productIds).map(p => (
                                    <Link key={p.id} to={`/product/${p.id}`} className="group flex gap-4 items-center bg-slate-50 dark:bg-white/5 p-3 rounded-3xl border border-slate-100 dark:border-white/10 hover:border-pink-200 transition-colors">
                                        <img src={p.images[0]} alt={p.name} className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-200">{p.name}</h4>
                                            <p className="text-gold font-bold mt-1">{p.price.toFixed(2)}€</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.preventDefault(); addToCart(p); setSelectedPost(null); }}
                                            className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold translate-x-4 group-hover:translate-x-0"
                                        >
                                            <ShoppingBag size={18} />
                                        </button>
                                        <Link to={`/product/${p.id}`} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                            <ChevronRight size={20} />
                                        </Link>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-12 pt-12 border-t border-slate-200 dark:border-white/10">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4">Em destaque</p>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-black shadow-sm border border-slate-50 dark:border-white/5">
                                    <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-xl text-pink-500 font-bold text-xs">Aura Club</div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">Ganha <span className="text-pink-500 font-bold">150 pontos</span> ao partilhares o teu look connosco!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialFeed;


import React from 'react';
import { useApp } from '../store';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarCart: React.FC = () => {
    const { cart, addToCart, removeFromCart, updateCartQuantity, isCartOpen, setCartOpen, vouchers, appliedVoucher, setAppliedVoucher, products } = useApp();
    const [voucherCode, setVoucherCode] = React.useState('');
    const [voucherError, setVoucherError] = React.useState('');
    const [voucherSuccess, setVoucherSuccess] = React.useState('');

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    let discountAmount = 0;
    if (appliedVoucher) {
        if (appliedVoucher.discountType === 'percentage') {
            discountAmount = subtotal * (appliedVoucher.discountValue / 100);
        } else {
            discountAmount = appliedVoucher.discountValue;
        }
    }
    discountAmount = Math.min(discountAmount, subtotal);

    const total = subtotal - discountAmount;

    const handleApplyVoucher = () => {
        setVoucherError('');
        setVoucherSuccess('');
        if (!voucherCode.trim()) return;

        const codeToTry = voucherCode.trim().toUpperCase();
        const v = vouchers.find(v => v.code === codeToTry);

        if (!v) {
            setVoucherError('Inválido');
            return;
        }
        if (!v.isActive) {
            setVoucherError('Inativo');
            return;
        }
        if (v.minPurchase && subtotal < v.minPurchase) {
            setVoucherError(`Min. ${v.minPurchase}€`);
            return;
        }
        if (v.maxUsage && v.usageCount >= v.maxUsage) {
            setVoucherError('Esgotado');
            return;
        }

        setAppliedVoucher(v);
        setVoucherCode('');
        setVoucherSuccess('Aplicado!');
        setTimeout(() => setVoucherSuccess(''), 3000);
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
                onClick={() => setCartOpen(false)}
            />

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white dark:bg-black shadow-2xl animate-slide-in-right flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-6 border-b border-slate-100 dark:border-white/5 flex flex-col gap-4 bg-white dark:bg-black sticky top-0 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-pink-50 dark:bg-pink-900/30 p-2 rounded-xl">
                                    <ShoppingBag size={20} className="text-pink-500" />
                                </div>
                                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">O Meu Carrinho</h2>
                                <span className="bg-slate-50 dark:bg-white/10 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {cart.length}
                                </span>
                            </div>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Free Shipping Progress Bar */}
                        {cart.length > 0 && (
                            <div className="space-y-2 mt-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-slate-500">Portes Grátis</span>
                                    <span className={subtotal >= 50 ? "text-green-500" : "text-pink-500"}>
                                        {subtotal >= 50 ? 'Alcançado! 🎉' : `Faltam ${(50 - subtotal).toFixed(2)}€`}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${subtotal >= 50 ? 'bg-green-500' : 'bg-pink-500'}`}
                                        style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center">
                                    <ShoppingBag size={32} className="text-slate-300" />
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">O seu carrinho está vazio</p>
                                <button
                                    onClick={() => setCartOpen(false)}
                                    className="text-pink-500 font-bold text-sm hover:underline"
                                >
                                    Continuar a comprar
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-24 h-32 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 shrink-0 border border-slate-100 dark:border-white/10">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider mb-1">{item.category}</p>
                                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight line-clamp-2">{item.name}</h3>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center bg-slate-50 dark:bg-white/5 rounded-lg p-1 border border-slate-100 dark:border-white/10">
                                                    <button
                                                        onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                    {(item.price * item.quantity).toFixed(2)}€
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Upsells Section */}
                                <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Complete o look</p>
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {products.filter(p => !cart.find(c => c.id === p.id)).slice(0, 3).map(product => (
                                            <div key={product.id} className="w-28 shrink-0 group">
                                                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 mb-2 relative">
                                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    <button onClick={() => addToCart(product, 1)} className="absolute bottom-2 right-2 w-8 h-8 bg-white dark:bg-black text-slate-900 dark:text-white rounded-full flex items-center justify-center shadow-lg hover:bg-pink-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-900 dark:text-white truncate">{product.name}</p>
                                                <p className="text-[10px] text-pink-500">{product.price.toFixed(2)}€</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-slate-100 dark:border-white/5 space-y-4 bg-white dark:bg-black">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="text-slate-900 dark:text-white font-medium">{subtotal.toFixed(2)}€</span>
                                </div>
                                {appliedVoucher && (
                                    <div className="flex justify-between text-sm">
                                        <div className="flex items-center gap-2 text-pink-500">
                                            <span className="font-bold">Desconto ({appliedVoucher.code})</span>
                                            <button onClick={() => setAppliedVoucher(null)} className="text-slate-400 hover:text-red-500">
                                                <X size={12} />
                                            </button>
                                        </div>
                                        <span className="font-bold text-pink-500">-{discountAmount.toFixed(2)}€</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Envio</span>
                                    <span className="text-green-500 font-medium">Grátis</span>
                                </div>
                                <div className="flex justify-between text-lg font-serif font-bold pt-2 border-t border-slate-200 dark:border-white/10">
                                    <span className="text-slate-900 dark:text-white">Total</span>
                                    <span className="text-gold">{total.toFixed(2)}€</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Cupão"
                                        value={voucherCode}
                                        onChange={(e) => { setVoucherCode(e.target.value); setVoucherError(''); }}
                                        disabled={!!appliedVoucher}
                                        className="bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs outline-none flex-grow text-slate-900 dark:text-white focus:ring-2 ring-pink-100 disabled:opacity-50 uppercase font-bold"
                                    />
                                    <button
                                        onClick={handleApplyVoucher}
                                        disabled={!!appliedVoucher}
                                        className="bg-slate-900 dark:bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gold transition-colors disabled:opacity-50"
                                    >
                                        Aplicar
                                    </button>
                                </div>
                                {voucherError && <p className="text-red-500 text-[10px] mt-1 font-bold">{voucherError}</p>}
                                {voucherSuccess && <p className="text-green-500 text-[10px] mt-1 font-bold">{voucherSuccess}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-3 pt-2">
                                <Link
                                    to="/checkout"
                                    onClick={() => setCartOpen(false)}
                                    className="w-full bg-slate-900 dark:bg-gold text-white dark:text-black h-14 rounded-2xl flex items-center justify-center gap-2 font-bold hover:opacity-90 transition-all group scale-100 active:scale-95 shadow-xl shadow-slate-900/10"
                                >
                                    Finalizar Compra
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    to="/cart"
                                    onClick={() => setCartOpen(false)}
                                    className="w-full h-14 rounded-2xl flex items-center justify-center font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    Ver Carrinho Completo
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidebarCart;

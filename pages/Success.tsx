import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useApp } from '../store';

const Success: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useApp();

    useEffect(() => {
        // Clear cart upon successful payment
        if (sessionId) {
            clearCart();
        }
    }, [sessionId, clearCart]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
            <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-soft dark:shadow-luxury rounded-[2.5rem] p-12 transition-all">
                <div className="bg-green-100 dark:bg-green-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 animate-bounce-slow">
                    <CheckCircle2 size={64} />
                </div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Pagamento Concluído!</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    A sua encomenda Aura Bijoux foi confirmada e está a ser processada. Receberá um recibo detalhado no seu e-mail.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/profile?tab=orders" className="bg-slate-900 dark:bg-gold text-white dark:text-black px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        Ver Encomendas
                    </Link>
                    <Link to="/catalog" className="bg-pink-50 dark:bg-white/5 text-pink-500 dark:text-pink-400 border border-pink-200 dark:border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-pink-100 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <ShoppingBag size={20} /> Voltar à Loja
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;

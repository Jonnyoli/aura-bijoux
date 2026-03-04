import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, RefreshCcw } from 'lucide-react';

const Cancel: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
            <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-soft dark:shadow-luxury rounded-[2.5rem] p-12 transition-all">
                <div className="bg-red-100 dark:bg-red-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
                    <XCircle size={64} />
                </div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Pagamento Cancelado</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    O processo de pagamento foi interrompido. Nenhuma cobrança foi efetuada no seu cartão ou MB WAY. O seu carrinho foi guardado.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/checkout" className="bg-slate-900 dark:bg-gold text-white dark:text-black px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        <RefreshCcw size={20} /> Tentar Novamente
                    </Link>
                    <Link to="/cart" className="bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        Voltar ao Carrinho
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cancel;

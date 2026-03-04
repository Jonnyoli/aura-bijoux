import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('aura_cookie_consent');
        if (!consent) {
            // Delay so it doesn't pop up INSTANTLY on first load
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('aura_cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('aura_cookie_consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111] border-t border-slate-200 dark:border-white/10 p-6 shadow-2xl z-50 animate-fade-in-up transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative">
                <div className="flex items-start md:items-center gap-4 text-sm text-gray-600 dark:text-gray-300 pr-8 md:pr-0">
                    <div className="w-12 h-12 bg-pink-50 dark:bg-pink-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 md:mt-0">
                        <Cookie className="text-pink-500" size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white mb-1">Aura usa cookies 🍪</p>
                        <p className="leading-relaxed">
                            Utilizamos cookies para lhe oferecer a melhor experiência, personalizar conteúdos e analisar o nosso tráfego.
                            Ao continuar, concorda com a nossa <a href="#" className="font-bold text-pink-500 hover:underline">Política de Privacidade e Cookies</a>.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-6 py-3 rounded-xl font-bold bg-slate-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                        Apenas Essenciais
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-8 py-3 rounded-xl font-bold bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-gray-200 dark:shadow-none"
                    >
                        Aceitar Todos
                    </button>
                </div>
                <button
                    onClick={handleDecline}
                    className="absolute -top-2 right-0 md:top-auto text-gray-400 hover:text-gray-600 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    aria-label="Fechar"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;

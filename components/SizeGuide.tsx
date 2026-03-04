import React, { useEffect } from 'react';
import { Ruler, X, ShieldCheck } from 'lucide-react';

interface SizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
    category: 'Anéis' | 'Colares' | string;
}

const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose, category }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-black shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                            <Ruler size={18} />
                        </div>
                        <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white tracking-wide">Guia de Tamanhos</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-slate-50 dark:bg-white/5 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/30 text-slate-400 hover:text-pink-500 transition-all relative z-10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">

                    <div className="text-center mb-8">
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Descubra o seu ajuste perfeito</h4>
                        <p className="text-slate-500 text-sm max-w-md mx-auto">Queremos que a sua peça Aura assente na perfeição. Utilize as nossas tabelas e métodos abaixo para facilitar a sua escolha.</p>
                    </div>

                    {category === 'Anéis' || category === 'Todos' || !category ? (
                        <div className="mb-10 animate-fade-in-up">
                            <h5 className="font-bold text-xl tracking-tight mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gold rounded-full"></span>
                                Medidas para Anéis
                            </h5>

                            <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-6 mb-6">
                                <h6 className="font-bold text-sm mb-2 dark:text-white">Como medir em casa:</h6>
                                <ol className="list-decimal pl-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li>Enrole um pedaço de fio ou tira de papel à volta da base do dedo.</li>
                                    <li>Marque com uma caneta o ponto onde as extremidades se encontram.</li>
                                    <li>Estenda o fio numa régua e meça o comprimento em milímetros (mm).</li>
                                    <li>Use a tabela abaixo para descobrir o seu tamanho EU correspondente.</li>
                                </ol>
                            </div>

                            <div className="overflow-x-auto text-sm">
                                <table className="w-full text-left border-collapse min-w-[400px]">
                                    <thead>
                                        <tr className="bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white">
                                            <th className="p-3 rounded-tl-xl font-bold">Circunferência (mm)</th>
                                            <th className="p-3 font-bold">Tamanho EU (Aura)</th>
                                            <th className="p-3 rounded-tr-xl font-bold">Tamanho US</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        <tr className="dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="p-4 font-medium">50 mm</td><td className="p-4"><span className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold rounded-lg tracking-widest">10</span></td><td className="p-4 text-slate-500">5 - 5.5</td></tr>
                                        <tr className="dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="p-4 font-medium">52 mm</td><td className="p-4"><span className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold rounded-lg tracking-widest">12</span></td><td className="p-4 text-slate-500">6 - 6.5</td></tr>
                                        <tr className="dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="p-4 font-medium">54 mm</td><td className="p-4"><span className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold rounded-lg tracking-widest">14</span></td><td className="p-4 text-slate-500">7</td></tr>
                                        <tr className="dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="p-4 font-medium">56 mm</td><td className="p-4"><span className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold rounded-lg tracking-widest">16</span></td><td className="p-4 text-slate-500">7.5 - 8</td></tr>
                                        <tr className="dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="p-4 font-medium">58 mm</td><td className="p-4"><span className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold rounded-lg tracking-widest">18</span></td><td className="p-4 text-slate-500">8.5</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null}

                    {category === 'Colares' || category === 'Todos' || !category ? (
                        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <h5 className="font-bold text-xl tracking-tight mb-4 text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gold rounded-full"></span>
                                Comprimento de Colares
                            </h5>
                            <p className="text-sm text-slate-500 mb-8 font-light leading-relaxed">A forma como um colar assenta depende muito do seu pescoço e constituição. Use este guia visual de referências padrão para escolher a sua medida ideal.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="flex justify-between items-center">
                                        <h6 className="font-bold text-slate-900 dark:text-white">Gargantilha</h6>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded-md">~35cm</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-light leading-relaxed">Assenta justo à base do pescoço (Choker).</p>
                                </div>
                                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="flex justify-between items-center">
                                        <h6 className="font-bold text-slate-900 dark:text-white">Princesa</h6>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded-md">40-45cm</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-light leading-relaxed">Assenta graciosamente sobre a clavícula. A medida mais comum.</p>
                                </div>
                                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="flex justify-between items-center">
                                        <h6 className="font-bold text-slate-900 dark:text-white">Matiné</h6>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded-md">50-60cm</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-light leading-relaxed">Chega ao centro do peito. Ideal para peças sobrepostas ou decotes.</p>
                                </div>
                                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="flex justify-between items-center">
                                        <h6 className="font-bold text-slate-900 dark:text-white">Ópera / Corda</h6>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded-md">+70cm</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-light leading-relaxed">Colar longo e dramático, muitas vezes usado de lado ou com voltas duplas.</p>
                                </div>
                            </div>
                        </div>
                    ) : null}

                </div>

                {/* Footer info */}
                <div className="p-4 bg-pink-50 dark:bg-pink-900/10 border-t border-pink-100 dark:border-pink-900/20 text-center shrink-0">
                    <p className="text-xs font-bold text-pink-600 dark:text-pink-400 flex items-center justify-center gap-1">
                        <ShieldCheck size={14} /> Compre sem medo! As devoluções são fáceis e rápidas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SizeGuide;

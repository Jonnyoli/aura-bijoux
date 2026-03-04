import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Package, Truck, CheckCircle, Clock, ChevronLeft, HelpCircle } from 'lucide-react';

const OrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { orders } = useApp();
    const navigate = useNavigate();

    const order = orders.find(o => o.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!order) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                <Package size={48} className="mx-auto text-slate-300 mb-6" />
                <h2 className="text-2xl font-serif font-bold mb-4">Encomenda não encontrada</h2>
                <p className="text-slate-500 mb-8">Esta encomenda pode não existir ou não pertencer à sua conta.</p>
                <Link to="/profile" className="inline-block bg-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-600 transition-colors">
                    Voltar ao Perfil
                </Link>
            </div>
        );
    }

    const steps = ['Pendente', 'Processando', 'Enviado', 'Entregue'];
    const currentStepIndex = steps.indexOf(order.status);

    const getStepStatus = (index: number) => {
        if (order.status === 'Cancelado') return 'cancelado';
        if (index < currentStepIndex) return 'completo';
        if (index === currentStepIndex) return 'atual';
        return 'pendente';
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
            <Link to="/profile" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-pink-500 transition-colors mb-8">
                <ChevronLeft size={16} className="mr-1" /> Voltar ao Perfil
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Encomenda #{order.id}</h1>
                    <p className="text-slate-500 mt-2">Feita a {new Date(order.date).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link to={`/contact?subject=Encomenda ${order.id}`} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl font-bold flex items-center hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-sm">
                        <HelpCircle size={16} className="mr-2" /> Precisa de Ajuda?
                    </Link>
                </div>
            </div>

            {order.status !== 'Cancelado' && (
                <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-soft dark:shadow-luxury rounded-3xl p-8 mb-10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>
                    <h3 className="text-lg font-bold mb-8 relative z-10 text-slate-900 dark:text-white">Estado do Envio</h3>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between w-full max-w-2xl mx-auto">
                        {/* Linha de progresso no fundo (Desktop) */}
                        <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-1 bg-slate-100 dark:bg-white/10 rounded-full z-0">
                            <div className="h-full bg-pink-500 transition-all duration-1000" style={{ width: `${Math.max(0, (currentStepIndex / (steps.length - 1)) * 100)}%` }}></div>
                        </div>

                        {/* Steps */}
                        {steps.map((step, idx) => {
                            const status = getStepStatus(idx);
                            let Icon = Clock;
                            if (idx === 0) Icon = CheckCircle;
                            if (idx === 1) Icon = Package;
                            if (idx === 2) Icon = Truck;
                            if (idx === 3) Icon = CheckCircle;

                            return (
                                <div key={step} className="flex flex-row md:flex-col items-center gap-4 md:gap-2 relative z-10 mb-6 md:mb-0 w-full md:w-32">
                                    {/* Linha de progresso vertical (Mobile) */}
                                    <div className="absolute left-[24px] top-[48px] bottom-[-24px] w-0.5 bg-slate-100 dark:bg-white/10 md:hidden z-0">
                                        {status === 'completo' && <div className="w-full h-full bg-pink-500"></div>}
                                    </div>

                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 ${status === 'completo' ? 'bg-pink-500 border-pink-100 dark:border-pink-900/30 text-white' :
                                            status === 'atual' ? 'bg-white dark:bg-black border-pink-500 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]' :
                                                'bg-slate-50 dark:bg-white/5 border-white dark:border-black text-slate-300 dark:text-slate-600'
                                        } transition-all duration-500 relative z-10`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="md:text-center pt-1">
                                        <p className={`text-sm font-bold ${status === 'atual' ? 'text-pink-500' :
                                                status === 'completo' ? 'text-slate-900 dark:text-white' :
                                                    'text-slate-400 dark:text-slate-500'
                                            }`}>{step}</p>
                                        {status === 'atual' && idx === 1 && <p className="text-[10px] text-slate-500 mt-1">A preparar a sua encomenda</p>}
                                        {status === 'atual' && idx === 2 && <p className="text-[10px] text-slate-500 mt-1">Estimativa: 1-2 dias úteis</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {order.status === 'Cancelado' && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-3xl p-6 mb-10 text-center">
                    <p className="text-red-500 font-bold mb-2">Esta encomenda foi cancelada.</p>
                    <p className="text-sm text-red-400">Se não efetuou este cancelamento, por favor contacte o nosso suporte.</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-soft dark:shadow-luxury rounded-3xl p-6 md:p-8">
                        <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-50 dark:border-white/5 pb-4">Artigos</h3>
                        <div className="space-y-6">
                            {order.items.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 overflow-hidden shrink-0">
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow flex justify-between">
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{item.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1">Qtd: {item.quantity}</p>
                                            <p className="text-xs text-slate-500">{item.color || 'Standard'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900 dark:text-white">{(item.price * item.quantity).toFixed(2)}€</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-soft dark:shadow-luxury rounded-3xl p-6">
                        <h3 className="font-bold mb-4 text-slate-900 dark:text-white border-b border-slate-50 dark:border-white/5 pb-3">Resumo</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span>{(order.total + (order.discountAmount || 0)).toFixed(2)}€</span>
                            </div>

                            {order.discountAmount && order.discountAmount > 0 ? (
                                <div className="flex justify-between text-pink-500 font-bold">
                                    <span>Desconto</span>
                                    <span>-{order.discountAmount.toFixed(2)}€</span>
                                </div>
                            ) : null}

                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Portes</span>
                                <span>Grátis</span>
                            </div>
                            <div className="border-t border-slate-100 dark:border-white/10 my-4"></div>
                            <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-white">
                                <span>Total Pago</span>
                                <span>{order.total.toFixed(2)}€</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-soft dark:shadow-luxury rounded-3xl p-6">
                        <h3 className="font-bold mb-4 text-slate-900 dark:text-white border-b border-slate-50 dark:border-white/5 pb-3">Morada de Entrega</h3>
                        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <p className="font-bold text-slate-900 dark:text-white">{order.address.fullName}</p>
                            <p>{order.address.street}</p>
                            <p>{order.address.zipCode} {order.address.city}</p>
                            <p>{order.address.country}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

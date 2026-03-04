
import React, { useState } from 'react';
// Added Link to the imports from react-router-dom
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../store';

const Checkout: React.FC = () => {
  const { cart, user, addOrder, clearCart, vouchers, appliedVoucher, setAppliedVoucher, updateVoucher } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');
  const [giftOptions, setGiftOptions] = useState({
    isGift: false,
    luxuryPackaging: false,
    giftMessage: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      discountAmount = subtotal * (appliedVoucher.discountValue / 100);
    } else {
      discountAmount = appliedVoucher.discountValue;
    }
  }
  discountAmount = Math.min(discountAmount, subtotal);

  const shippingFee = subtotal > 50 ? 0 : 5.90;
  const giftFee = giftOptions.luxuryPackaging ? 2.00 : 0;
  const total = subtotal - discountAmount + shippingFee + giftFee;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    zipCode: user?.addresses?.[0]?.zipCode || '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.address) newErrors.address = 'Morada é obrigatória';
    if (!formData.city) newErrors.city = 'Cidade é obrigatória';
    if (!/^\d{4}-\d{3}$|^\d{4}$/.test(formData.zipCode)) newErrors.zipCode = 'Código Postal inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Cartão inválido (16 dígitos)';
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'Validade inválida (MM/AA)';
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'CVV inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      setVoucherError(`Mínimo ${v.minPurchase}€`);
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

  const handlePlaceOrder = async () => {
    if (!user || !user.token) {
      alert('Por favor, inicie sessão para finalizar a encomenda de forma segura.');
      navigate('/login?redirect=/checkout');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('1. Starting Checkout. Cart size:', cart.length);
      const orderItems = cart.map(item => ({
        name: item.name,
        qty: item.quantity,
        image: item.images[0],
        price: item.price,
        product: item.id
      }));

      const shippingAddress = {
        fullName: formData.name,
        address: formData.address,
        city: formData.city,
        postalCode: formData.zipCode,
        country: 'Portugal'
      };

      console.log('2. Requesting session from Express backend...');
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/checkout/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          orderItems,
          shippingAddress,
          email: formData.email,
        })
      });

      console.log('3. Received response. Status:', res.status);
      const text = await res.text();
      console.log('4. Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Servidor retornou resposta inválida');
      }

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao comunicar com a plataforma de pagamentos');
      }

      console.log('5. Success! Redirecting to:', data.url);
      // Redirect to Stripe Hosted Checkout
      window.location.href = data.url;

    } catch (error: any) {
      console.error('Checkout error stack:', error);
      alert(`Servidor ocupado ou falha no pagamento: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Steps UI */}
      <div className="flex items-center justify-center mb-12">
        {[
          { id: 1, label: 'Envio' },
          { id: 2, label: 'Pagamento' },
          { id: 3, label: 'Confirmação' }
        ].map((s, i, arr) => (
          <React.Fragment key={s.id}>
            <div className={`flex items-center ${step >= s.id ? 'text-pink-500' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${step >= s.id ? 'border-pink-500 bg-pink-50 dark:bg-pink-500/10 scale-110' : 'border-slate-200 dark:border-white/10'}`}>
                {step > s.id ? <CheckCircle2 size={20} /> : s.id}
              </div>
              <span className="hidden sm:block ml-2 text-sm font-bold">{s.label}</span>
            </div>
            {i < arr.length - 1 && (
              <div className={`w-12 md:w-24 h-0.5 mx-4 transition-colors duration-500 ${step > s.id ? 'bg-pink-500' : 'bg-slate-200 dark:bg-white/10'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-8">
          {step === 1 && (
            <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-soft dark:shadow-luxury transition-all">
              <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-2">
                <MapPin className="text-gold" /> Morada de Envio
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); if (validateShipping()) setStep(2); }}>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={`w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-pink-100 dark:ring-white/10 transition-all dark:text-white`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Morada</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className={`w-full bg-slate-50 dark:bg-white/5 border ${errors.address ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 dark:border-white/10'} rounded-xl px-4 py-3 outline-none focus:ring-2 ring-pink-100 dark:ring-white/10 transition-all dark:text-white`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1 font-bold">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Cidade</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className={`w-full bg-slate-50 dark:bg-white/5 border ${errors.city ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 dark:border-white/10'} rounded-xl px-4 py-3 outline-none focus:ring-2 ring-pink-100 dark:ring-white/10 transition-all dark:text-white`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1 font-bold">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Código Postal</label>
                  <input
                    type="text"
                    placeholder="0000-000"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    required
                    className={`w-full bg-slate-50 dark:bg-white/5 border ${errors.zipCode ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 dark:border-white/10'} rounded-xl px-4 py-3 outline-none focus:ring-2 ring-pink-100 dark:ring-white/10 transition-all dark:text-white`}
                  />
                  {errors.zipCode && <p className="text-red-500 text-xs mt-1 font-bold">{errors.zipCode}</p>}
                </div>
                <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${giftOptions.isGift ? 'bg-pink-100 text-pink-500' : 'bg-gray-200 text-gray-400'}`}>
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">Esta encomenda é para presente?</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Adicione uma nota personalizada ou embalagem de luxo.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGiftOptions({ ...giftOptions, isGift: !giftOptions.isGift })}
                      className={`w-12 h-6 rounded-full relative transition-colors ${giftOptions.isGift ? 'bg-pink-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${giftOptions.isGift ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>

                  {giftOptions.isGift && (
                    <div className="space-y-4 animate-fade-in pl-4 border-l-2 border-pink-100 ml-4">
                      <div className="flex items-center gap-4 p-4 bg-white border border-pink-50 rounded-2xl shadow-sm">
                        <input
                          type="checkbox"
                          id="luxuryPack"
                          checked={giftOptions.luxuryPackaging}
                          onChange={(e) => setGiftOptions({ ...giftOptions, luxuryPackaging: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500 cursor-pointer"
                        />
                        <label htmlFor="luxuryPack" className="flex-grow cursor-pointer">
                          <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">Embalagem de Luxo Aura (+2.00€)</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 italic">Caixa rígida premium, papel de seda e selo de cera.</p>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Mensagem Personalizada</label>
                        <textarea
                          placeholder="Escreva aqui a sua dedicatória..."
                          rows={3}
                          value={giftOptions.giftMessage}
                          onChange={(e) => setGiftOptions({ ...giftOptions, giftMessage: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-pink-100 dark:ring-white/10 transition-all resize-none dark:text-white"
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 pt-6">
                  <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center shadow-lg shadow-gray-200 active:scale-95">
                    Continuar para Pagamento <ChevronRight size={18} className="ml-2" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 shadow-soft dark:shadow-luxury transition-all">
              <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-2">
                <CreditCard className="text-gold" /> Pagamento Seguro
              </h2>

              <div className="space-y-6 mb-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Será redirecionado para a plataforma segura do Stripe para concluir o seu pagamento.
                  Suportamos <strong>MB WAY</strong>, Cartão de Crédito, Apple Pay e Google Pay.
                </p>

                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
                  <ShieldCheck className="text-blue-500 flex-shrink-0" size={20} />
                  <p className="text-[11px] text-blue-700 leading-relaxed">
                    A sua transação é encriptada de ponta a ponta. Não guardamos os dados do seu método de pagamento nos nossos servidores.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} disabled={isProcessing} className="flex-1 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-all active:scale-95 disabled:opacity-50">
                  Voltar
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-[2] bg-pink-500 text-white py-4 rounded-xl font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-100 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Conectando ao Stripe...</span>
                    </div>
                  ) : (
                    <>Pagar {total.toFixed(2)}€ no Stripe</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>


        {/* Order Summary Sidebar */}
        {step < 3 && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-black/50 border border-slate-100 dark:border-white/5 shadow-inner rounded-[2.5rem] p-8 transition-all">
              <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2 dark:text-white">
                Resumo <span className="text-sm font-sans text-gray-400 font-normal">({cart.length} itens)</span>
              </h3>
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.images[0]} alt="" referrerPolicy="no-referrer" className="w-16 h-16 rounded-xl object-cover bg-white border border-gray-100" />
                    <div>
                      <p className="font-bold text-sm text-gray-800 dark:text-gray-200 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500 mb-1">{item.color}</p>
                      <p className="text-xs font-bold text-pink-500">{item.quantity}x {item.price.toFixed(2)}€</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-gray-900 dark:text-white">{subtotal.toFixed(2)}€</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-sm">
                    <span className="text-pink-500 font-bold">Desconto ({appliedVoucher.code})</span>
                    <span className="font-bold text-pink-500">-{discountAmount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Envio</span>
                  <span className="font-bold text-gray-900 dark:text-white">{subtotal > 50 ? 'Grátis' : '5.90€'}</span>
                </div>
                {giftOptions.luxuryPackaging && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Embalagem Luxo</span>
                    <span className="font-bold text-pink-500">+2.00€</span>
                  </div>
                )}
                {subtotal > 50 && (
                  <div className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg text-center">
                    Oferta de portes aplicada!
                  </div>
                )}

                <div className="pt-4 space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Cupão de Desconto?</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Código"
                      value={voucherCode}
                      onChange={(e) => { setVoucherCode(e.target.value); setVoucherError(''); }}
                      disabled={!!appliedVoucher}
                      className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs outline-none flex-grow text-gray-900 dark:text-white focus:ring-2 ring-pink-100 dark:ring-white/10 disabled:opacity-50 uppercase font-bold"
                    />
                    <button
                      onClick={handleApplyVoucher}
                      disabled={!!appliedVoucher}
                      className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-pink-500 transition-colors disabled:opacity-50"
                    >
                      Aplicar
                    </button>
                  </div>
                  {voucherError && <p className="text-red-500 text-[10px] font-bold pl-1">{voucherError}</p>}
                  {voucherSuccess && <p className="text-green-500 text-[10px] font-bold pl-1">{voucherSuccess}</p>}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-gray-900 dark:text-white font-bold text-lg">Total</span>
                  <span className="text-3xl font-serif font-bold text-pink-500">{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Chrome, Github } from 'lucide-react';
import { useApp } from '../store';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);

    if (success) {
      if (email === 'admin@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else {
      setError('Credenciais inválidas. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#fffafb] dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#111] p-10 rounded-[2.5rem] shadow-xl shadow-pink-100/50 dark:shadow-none border border-pink-50 dark:border-white/10 animate-fade-in transition-all">
        <div className="text-center">
          <Link to="/" className="text-3xl font-serif font-bold text-pink-500 mb-2 block">
            Aura <span className="text-gold">Bijoux</span>
          </Link>
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Bem-vinda de volta' : 'Criar nova conta'}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {isLogin
              ? 'Introduza os seus dados para aceder à sua área.'
              : 'Junte-se a nós e receba ofertas exclusivas.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl border border-red-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 ring-pink-100 dark:ring-white/10 focus:bg-white dark:focus:bg-white/10 transition-all dark:text-white"
                  placeholder="Nome completo"
                />
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 ring-pink-100 dark:ring-white/10 focus:bg-white dark:focus:bg-white/10 transition-all dark:text-white"
                placeholder="E-mail"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 ring-pink-100 dark:ring-white/10 focus:bg-white dark:focus:bg-white/10 transition-all dark:text-white"
                placeholder="Palavra-passe"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center text-gray-500 dark:text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded text-pink-500 mr-2 accent-pink-500" />
              Lembrar-me
            </label>
            {isLogin && (
              <a href="#" className="text-pink-500 font-bold hover:underline">Esqueceu-se da senha?</a>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent font-bold rounded-2xl text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all shadow-lg shadow-pink-100 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                A processar...
              </span>
            ) : (
              <span className="flex items-center">
                {isLogin ? 'Entrar' : 'Registar'} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </span>
            )}
          </button>
        </form>

        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-4 bg-white dark:bg-[#111] text-gray-400 dark:text-gray-500 tracking-widest font-bold transition-colors">Ou continuar com</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <button
            type="button"
            onClick={() => login('google-user@gmail.com').then(() => navigate('/profile'))}
            className="flex items-center justify-center px-4 py-3 border border-gray-100 dark:border-white/10 rounded-2xl bg-gray-50 dark:bg-white/5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-white/10 hover:border-pink-100 transition-all gap-3"
          >
            <Chrome size={18} className="text-red-500" /> Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-pink-500 font-bold hover:underline"
          >
            {isLogin ? 'Registe-se agora' : 'Inicie sessão'}
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;

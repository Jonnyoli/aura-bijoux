import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Leaf } from 'lucide-react';

const About: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white dark:bg-black transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 scale-105">
                    <img
                        src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop"
                        alt="Mãos a trabalhar com joalharia"
                        className="w-full h-full object-cover opacity-60 dark:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent flex items-end"></div>
                </div>
                <div className="relative z-10 text-center max-w-3xl px-4 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 dark:text-white mb-6">A Nossa História</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 font-light">
                        Nascida da paixão pela elegância e pelos detalhes que fazem a diferença.
                    </p>
                </div>
            </section>

            {/* Story Content */}
            <section className="max-w-4xl mx-auto px-4 py-24">
                <div className="prose prose-lg dark:prose-invert prose-pink mx-auto">
                    <p className="lead text-2xl font-serif italic text-center mb-12 text-slate-800 dark:text-slate-200">
                        "A Aura Bijoux começou com uma ideia simples: a joalharia de qualidade não precisa de ser inacessível, e o design moderno não tem de sacrificar o conforto."
                    </p>

                    <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-16 mb-6 text-center">A Origem do Nome</h2>
                    <p>
                        O nome <strong>Aura</strong> reflete a nossa crença central: todas as mulheres têm uma energia única e luminosa. As nossas peças não
                        são feitas para ofuscar, mas sim para realçar essa luz natural. Queremos que, ao colocar um colar ou uns brincos Aura,
                        sinta uma extensão da sua própria personalidade.
                    </p>

                    <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-16 mb-6 text-center">A Nossa Promessa</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-3xl text-center">
                            <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 shadow-sm">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-3 dark:text-white">Qualidade Premium</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Trabalhamos apenas com banhos de ouro resistente e prata de lei, garantindo durabilidade e brilho duradouro.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-3xl text-center">
                            <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 shadow-sm">
                                <Heart size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-3 dark:text-white">Hipoalergénico</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Todas as nossas peças são livres de níquel e pensadas para as peles mais sensíveis. O seu conforto é prioridade.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-3xl text-center">
                            <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 shadow-sm">
                                <Sparkles size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-3 dark:text-white">Design Exclusivo</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Desenhado em Portugal, inspirado nas maiores tendências globais de joalharia fina e moda intemporal.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-3xl text-center">
                            <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 shadow-sm">
                                <Leaf size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-3 dark:text-white">Embalagem Ecológica</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">O nosso packaging premium é feito com materiais recicláveis, protegendo a sua joia e o nosso planeta.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <Link to="/catalog" className="inline-block bg-pink-500 text-white px-10 py-5 rounded-2xl font-bold hover:bg-pink-600 hover:scale-105 transition-all shadow-xl shadow-pink-500/20">
                        Descubra as Nossas Coleções
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;

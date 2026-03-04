
import React, { useEffect, useState } from 'react';
import { useApp } from '../store';

const SplashScreen: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const { siteSettings } = useApp();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Trigger entrance animations shortly after mount
        const mountTimer = setTimeout(() => setIsMounted(true), 100);

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        const fadeTimer = setTimeout(() => {
            setIsFadingOut(true);
            // Re-enable body scroll
            document.body.style.overflow = '';
        }, 2200);

        const unmountTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3200); // Wait 1s for fade out

        return () => {
            clearTimeout(mountTimer);
            clearTimeout(fadeTimer);
            clearTimeout(unmountTimer);
            document.body.style.overflow = '';
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black transition-opacity duration-1000 ${!isFadingOut ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative flex flex-col items-center">
                {/* Logo with reveal effect */}
                <div className="overflow-hidden mb-4">
                    <h1
                        className="text-5xl sm:text-7xl font-serif font-bold text-slate-900 dark:text-white transition-all duration-1000 ease-out"
                        style={{
                            opacity: isMounted ? 1 : 0,
                            transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
                        }}
                    >
                        {siteSettings.name?.split(' ')[0] || 'Aura'}
                        <span className="text-gold ml-2">{siteSettings.name?.split(' ').slice(1).join(' ') || 'Bijoux'}</span>
                    </h1>
                </div>

                {/* Shimmer bar replacing complex animation with a simpler animated width */}
                <div className="w-32 h-0.5 bg-slate-100 dark:bg-white/10 relative overflow-hidden rounded-full">
                    <div
                        className="absolute inset-y-0 left-0 bg-gold transition-all duration-[2000ms] ease-out"
                        style={{
                            width: isMounted ? '100%' : '0%',
                            opacity: isMounted ? 1 : 0.5
                        }}
                    ></div>
                </div>

                {/* Subtitle */}
                <p
                    className="mt-8 text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold transition-all duration-700 ease-out"
                    style={{
                        opacity: isMounted ? 1 : 0,
                        transform: isMounted ? 'translateY(0)' : 'translateY(-10px)',
                        transitionDelay: '600ms'
                    }}
                >
                    Elegância Feminina
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;

import React, { useState, useEffect } from 'react';

const WhatsAppButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show button after a small delay to not distract immediately
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const phoneNumber = "351900000000"; // Placeholder phone number
    const message = encodeURIComponent("Olá Aura Bijoux! Gostava de tirar uma dúvida sobre uma peça.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
            {/* Tooltip */}
            <div className="absolute -top-12 right-0 bg-white dark:bg-black text-slate-800 dark:text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg border border-slate-100 dark:border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Precisa de ajuda?
                {/* Triangle pointer */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-black border-r border-b border-slate-100 dark:border-white/10 rotate-45 transform"></div>
            </div>

            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
                aria-label="Contactar no WhatsApp"
            >
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2C6.534 2 2.085 6.448 2.08 11.908c0 1.748.458 3.45 1.321 4.956L2 22l5.255-1.377a9.916 9.916 0 0 0 4.737 1.206h.005c5.46 0 9.908-4.448 9.913-9.913A9.872 9.872 0 0 0 19.001 4.908zm-7.009 13.55a8.239 8.239 0 0 1-4.205-1.152l-.302-.18-3.127.82.833-3.047-.198-.314a8.176 8.176 0 0 1-1.258-4.381c.005-4.536 3.698-8.23 8.239-8.23a8.2 8.2 0 0 1 5.825 2.413 8.196 8.196 0 0 1 2.41 5.825c-.006 4.55-3.699 8.246-8.235 8.246zm4.52-6.166c-.247-.124-1.463-.723-1.692-.808-.228-.08-.394-.123-.556.124-.166.246-.641.808-.784.969-.143.166-.29.185-.537.062-.247-.125-1.045-.385-1.99-1.23-.738-.657-1.235-1.47-1.38-1.716-.142-.247-.015-.38.108-.504.11-.11.247-.29.37-.432.126-.143.167-.248.25-.413.082-.167.043-.314-.018-.433-.063-.124-.557-1.345-.765-1.838-.2-.486-.404-.419-.557-.425-.142-.009-.309-.009-.475-.009a.911.911 0 0 0-.661.309c-.228.248-.864.845-.864 2.067s.885 2.4 1.007 2.564c.124.167 1.748 2.666 4.237 3.74.593.255 1.055.408 1.415.524.595.192 1.138.165 1.565.1.48-.075 1.463-.6 1.673-1.18.21-.58.21-1.076.147-1.18-.061-.105-.226-.167-.474-.292z" />
                </svg>
            </a>
        </div>
    );
};

export default WhatsAppButton;

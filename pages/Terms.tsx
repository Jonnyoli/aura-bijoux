import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
            <h1 className="text-4xl font-serif font-bold mb-8">Termos de Uso</h1>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-lg">Bem-vinda à Aura Bijoux. Ao aceder ao nosso site, concordas com os termos e condições abaixo estabelecidos.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">1. Produtos e Preços</h2>
                <p>Os preços dos nossos artigos são em Euros (€) e incluem IVA à taxa legal em vigor. Reservamo-nos o direito de alterar os preços a qualquer momento sem aviso prévio.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">2. Encomendas</h2>
                <p>Após concluída a encomenda, receberás um e-mail de confirmação. A encomenda só será processada após a receção do pagamento. Em caso de rutura de stock, serás contactada imediatamente com alternativas ou direito a reembolso.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">3. Devoluções</h2>
                <p>Tal como descrito na nossa política de envios, tens até 14 dias para devolver artigos que não apresentem sinais de uso. Não efetuamos devoluções de brincos por razões de higiene.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">4. Propriedade Intelectual</h2>
                <p>Todos os conteúdos deste website (textos, imagens, logótipos) são propriedade da Aura Bijoux. A sua reprodução sem autorização prévia é estritamente proibida.</p>
            </div>
        </div>
    );
};

export default Terms;

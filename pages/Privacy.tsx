import React from 'react';

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
            <h1 className="text-4xl font-serif font-bold mb-8">Política de Privacidade</h1>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-lg">Esta é uma página de exemplo. Na versão final, deves colocar um texto redigido com base no RGPD (Regulamento Geral de Proteção de Dados).</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">1. Recolha de Dados</h2>
                <p>A Aura Bijoux recolhe dados pessoais (como nome, endereço de e-mail e morada) apenas para processamento de encomendas e apoio ao cliente. Os teus dados nunca são vendidos a terceiros.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">2. Cookies</h2>
                <p>O nosso website utiliza cookies para melhorar a experiência de navegação, entender o comportamento do utilizador e personalizar campanhas. Podes gerir as tuas preferências de cookies em qualquer altura.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">3. Os Teus Direitos</h2>
                <p>De acordo com o RGPD, tens o direito de aceder, corrigir ou apagar os teus dados pessoais da nossa base de dados. Para tal, basta contactares-nos através dos canais oficiais disponíveis na nossa página de Contactos.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">4. Segurança</h2>
                <p>Tomamos medidas rigorosas para garantir a segurança dos teus dados, encriptando palavras-passe e utilizando protocolos seguros para processamento de pagamentos.</p>
            </div>
        </div>
    );
};

export default Privacy;

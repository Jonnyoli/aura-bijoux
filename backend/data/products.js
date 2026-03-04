const products = [
    {
        name: 'Colar Pérola Aura',
        price: 45.00,
        description: 'Um colar clássico com pérolas cultivadas em água doce e fecho banhado a ouro 18k.',
        category: 'Colares',
        stock: 12,
        images: [
            '/images/products/premium_necklace_aura.png',
            '/images/products/premium_necklace_detail.png'
        ],
        isBestSeller: true,
        isNew: false,
        color: 'Gold',
        materials: ['Pérolas de água doce', 'Ouro 18k']
    },
    {
        name: 'Brincos Estrela Dourada',
        price: 29.90,
        description: 'Brincos delicados em formato de estrela, perfeitos para o dia a dia.',
        category: 'Brincos',
        stock: 25,
        images: ['/images/products/premium_earrings_star.png'],
        isBestSeller: true,
        isNew: true,
        color: 'Gold',
        materials: ['Prata 925', 'Banho de Ouro 18k']
    },
    {
        name: 'Pulseira Cristal Rosa',
        price: 35.00,
        description: 'Pulseira com cristais de quartzo rosa naturais e corrente ajustável.',
        category: 'Pulseiras',
        stock: 8,
        images: ['/images/products/premium_bracelet_rosa.png'],
        isBestSeller: false,
        isNew: true,
        color: 'Rose Gold',
        materials: ['Quartzo Rosa', 'Aço Inoxidável']
    },
    {
        name: 'Anel Vintage Flor',
        price: 32.00,
        description: 'Anel ajustável com design floral vintage e banho de ouro envelhecido.',
        category: 'Anéis',
        stock: 5,
        images: ['/images/products/premium_ring_flower.png'],
        isBestSeller: true,
        isNew: false,
        color: 'Gold',
        materials: ['Latão', 'Zircónias']
    },
    {
        name: 'Conjunto Noiva Elegance',
        price: 120.00,
        description: 'Conjunto completo de colar e brincos em zircónia premium para ocasiões especiais.',
        category: 'Conjuntos',
        stock: 3,
        images: ['/images/products/premium_set_bridal.png'],
        isBestSeller: false,
        isNew: true,
        color: 'Silver',
        materials: ['Prata 925', 'Zircónia Premium']
    }
];

export default products;

import fs from 'fs';

const runTest = async () => {
    try {
        console.log('1. Logging in to get token...');
        const loginRes = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'ana.silva@email.com', password: 'password123' })
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.message);
        console.log('Logged in successfully. Token:', loginData.token.substring(0, 10) + '...');

        console.log('2. Creating Stripe Checkout Session...');
        const res = await fetch('http://localhost:5000/api/checkout/create-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginData.token}`
            },
            body: JSON.stringify({
                orderItems: [
                    { name: 'Colar Teste', price: 10, qty: 1, image: 'https://aurabijoux.pt/test.png', product: '64adcb3989c9e519e4a3b111' }
                ],
                shippingAddress: {
                    fullName: 'Test User',
                    address: 'Rua de Teste',
                    city: 'Lisboa',
                    postalCode: '1000-000',
                    country: 'Portugal'
                },
                email: 'ana.silva@email.com'
            })
        });
        const text = await res.text();
        fs.writeFileSync('error.txt', text);
        console.log('Error saved to error.txt');
    } catch (error) {
        console.error('FETCH ERROR:', error.message || error);
    }
};
runTest();

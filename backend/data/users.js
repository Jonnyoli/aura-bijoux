import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Sónia Admin',
        email: 'sonia@aurabijoux.pt',
        password: 'Adminbomba123', // Will be hashed by Mongoose pre-save middleware
        role: 'admin',
    },
    {
        name: 'Cliente Exemplo',
        email: 'cliente@exemplo.com',
        password: 'password123',
        role: 'user',
    }
];

export default users;

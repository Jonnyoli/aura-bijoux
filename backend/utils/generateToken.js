import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Since React typically runs on a different port () during dev, we'll return the token
    // in the JSON response instead of a Strict Cookie to avoid CORS credential issues right now.
    // In a full production app on a single domain, using HttpOnly cookies is safer.
    return token;
};

export default generateToken;

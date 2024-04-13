import jwt from 'jsonwebtoken';

const passwording = process.env.PASSWORD_HASH;

const validateLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const token = authorization.replace('Bearer ', '');

        const { id } = jwt.verify(token, passwording);

        if (!id) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        req.user = { id };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export { validateLogin };

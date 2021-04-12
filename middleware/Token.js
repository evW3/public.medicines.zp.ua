const jwt = require('jsonwebtoken');
const config = require('config');

const secretKey = config.token.secretKey;
const expiresIn = config.token.expiresIn;


class AuthToken {
    async create(code) {
        return await jwt.sign({ code }, secretKey, { expiresIn });
    }

    async verify(req, res, next) {
        let requestBody = req.body;
        const token = req.headers.authorization.split(' ')[1];
        try {
            const { code } = await jwt.verify(token, secretKey);
            req.body = { ...requestBody, code };
            next();
        } catch (e) {
            res.status(402).json({ message: '[Error]: incorrect token' });
        }
    }
}

module.exports = new AuthToken();
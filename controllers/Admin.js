const { AdminService } = require('../services/Admin');
const token = require('../middleware/Token')
const sha256 = require('crypto-js/sha256');

class Admin {
    async signIn(req, res) {
        const { code } = req.body;
        const encryptedCode = sha256(code).toString();
        try {
            if(await AdminService.isValid(encryptedCode))
                res.status(200).json({ token: await token.create(encryptedCode) });
            else
                res.status(401).json({ message: 'incorrect code' });
        } catch (e) {
          res.status(500).json({ error: `[Error]: ${ e }` })
        }
    }

    async isValid(req, res) {
        const { code } = req.body;
        try {
            if(await AdminService.isValid(code))
                res.status(200).json({ isValid: true });
            else
                res.status(401).json({ message: 'incorrect code' });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` })
        }
    }
}

module.exports = { AdminController: new Admin() }
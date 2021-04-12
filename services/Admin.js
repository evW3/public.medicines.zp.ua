const { admin: { access } } = require('config');

class AdminService {
    isValid(code) {
       return access === code;
    }
}

module.exports = { AdminService: new AdminService() };
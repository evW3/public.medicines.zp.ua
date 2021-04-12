const express = require('express');
const Token = require('../middleware/Token');
const formidableMiddleware = require('express-formidable');
const router = express.Router();
const { AdminController } = require('../controllers/Admin');

router.post('/sign-in', AdminController.signIn);
router.post('/isValid', Token.verify, AdminController.isValid);

module.exports = router;
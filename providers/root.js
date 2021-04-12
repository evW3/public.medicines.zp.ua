const express = require('express');
const hospitalRoute = require('./hospital');
const drugsRoute = require('./drugs');
const adminRoute = require('./admin');
const router = express.Router();

router.get('/', (_, res) => res.status(200).json({ message: 'Welcome to API!' }));
router.use('/hospitals', hospitalRoute);
router.use('/drugs', drugsRoute);
router.use('/admin', adminRoute);

module.exports = router;
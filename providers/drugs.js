const express = require('express');
const formidableMiddleware = require('express-formidable');
const { DrugsController } = require('../controllers/Drugs');

const router = express.Router();

router.post('/', DrugsController.getDrugs);
router.post('/search', DrugsController.search);
router.post('/filter', DrugsController.filter);
router.get('/types', DrugsController.getDrugTypes);
router.get('/:id', DrugsController.getByDrugId);
router.get('/date', DrugsController.getDate)

module.exports = router;
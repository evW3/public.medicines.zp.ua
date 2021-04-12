const express = require('express');
const formidableMiddleware = require('express-formidable');
const { HospitalsController } = require('../controllers/Hospitals');
const router = express.Router();

router.get('/', HospitalsController.getHospitals);
router.put('/', formidableMiddleware(), () => {});
router.put('/update', HospitalsController.updateHospital);
router.get('/names/:id', HospitalsController.getHospitalNames);
router.put('/names/:id', HospitalsController.createHospitalNames);
router.delete('/names/:id', HospitalsController.removeHospitalName);
router.post('/names/:id', HospitalsController.updateHospitalName);

module.exports = router;
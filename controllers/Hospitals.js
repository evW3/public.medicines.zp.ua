const { HospitalsService } = require('../services/Hospitals');
const token = require('../middleware/Token');
const sha256 = require('crypto-js/sha256');

class Hospitals {
    async getHospitals(req, res) {
        try {
            res.status(200).json({ hospitals: await HospitalsService.getAll() });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async updateHospital(req, res) {
        try {
            const { params, id } = req.body;
            await HospitalsService.updateHospital(id, params);
            res.status(200).json({ message: '[Update]: Success' });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }   
    }

    async getHospitalNames(req, res) {
        try {
            const { id } = req.params;
            res.status(200).json({ hospitalNames: await HospitalsService.getHospitalNames(id) });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async createHospitalNames(req, res) {
        try {
            const { name } = req.body;
            const { id } = req.params;
            const { hospitalNameId } = await HospitalsService.createHospitalName({ hospitalId: id, name });
            res.status(200).json({ id: hospitalNameId });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async removeHospitalName(req, res) {
        try {
            const { id } = req.params;
            await HospitalsService.removeHospitalName(id);
            res.status(200).json({ error: `Name was removed` });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async updateHospitalName(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await HospitalsService.updateHospitalName(id, name);
            res.status(200).json({ error: `Name was updated` });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }
}

module.exports = { HospitalsController: new Hospitals() }
const { DrugsService } = require('../services/Drugs');
const { DrugsListService } = require('../services/DrugList');
const { DrugTypesService } = require('../services/DrugTypes');
const { getInfoAboutFile } = require('../parser/index');

class DrugsController {
    async getDrugs(req, res) {
        try {
            const { offset } = req.body;
            const drugs = await DrugsService.getByLimit(30, offset);
            res.status(200).json({ drugs });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async search(req, res) {
        try {
           const { search, offset } = req.body;
           const searched = await DrugsService.search(search,30, offset);
           res.status(200).json({ searched });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async filter(req, res) {
        try {
            const { types, offset } = req.body;
            const filtered = await DrugsService.filter(types, 30, offset);
            res.status(200).json({ filtered });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async getByDrugId(req, res) {
        try {
            const { id } = req.params;
            const hospitals = await DrugsListService.getAllByDrugId(id);
            res.status(200).json({ hospitals });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async getDrugTypes(_, res) {
        try {
            const types = await DrugTypesService.getAllWithDesc();
            res.status(200).json({ types });
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }

    async getDate(_, res) {
        try {
            const { update } = getInfoAboutFile();
        } catch (e) {
            res.status(500).json({ error: `[Error]: ${ e }` });
        }
    }
}

module.exports = { DrugsController: new DrugsController() };
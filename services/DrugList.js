const { DrugsList, Hospitals } = require('../models/relations');

class DrugsListService {
    async add(data) {
        await DrugsList.create(data);
    }

    async getAllByDrugId(id) {
        return (await DrugsList.findAll({ attributes: ['amount'], where: { drugId: id }, include: { model: Hospitals, attributes: ['markerName', 'markerAddress', 'lat', 'lng'] }, raw: true })).toFormat('hospital.');
    }
}

module.exports = { DrugsListService: new DrugsListService() };
const { Drugs, DrugTypes } = require('../models/relations');
const { or, substring } = require('../utils/baseDB');

class DrugsService {
    async create(data) {
        const { id } = await Drugs.create(data);
        return { drugId: id }
    }

    async getByLimit(limit, offset) {
        return (await Drugs.findAll({ limit, offset, attributes:['id', 'name'], include: { model: DrugTypes, attributes: ['type', ['name', 'typeName']] }, raw: true })).toFormat('drug_type.');
    }

    async search(search, limit, offset) {
        return (await Drugs.findAll({ limit, offset, attributes:['id', 'name'], where: { name: { [substring]: search  } }, include: { model: DrugTypes, attributes: ['type', ['name', 'typeName']] }, raw: true })).toFormat('drug_type.');
    }

    async filter(types, limit, offset) {
        console.log('types', types, 'offset', offset);
        return (await Drugs.findAll({ limit, offset, attributes:['id', 'name'], include: { model: DrugTypes, where: { type: { [or]: types } }, attributes: ['type', ['name', 'typeName']] }, raw: true })).toFormat('drug_type.');
    }
}

module.exports = { DrugsService: new DrugsService() };
const { DrugTypes } = require('../models/relations');

class DrugTypesService {
    async getAll() {
        return Object.fromEntries((await DrugTypes.findAll({ raw: true })).map(item => [item.type, item.id]));
    }

    async getAllWithDesc() {
        return await DrugTypes.findAll({ raw: true, attributes:['type', 'name'] } );
    }

    async initBase() {
        await DrugTypes.bulkCreate([
            { type: 'BOTTLE', name: 'флакон' },
            { type: 'BLISTER', name: 'пігулки' },
            { type: 'PACKAGING', name: 'упаковка' },
            { type: 'AMPULE', name: 'ампула' },
            { type: 'CAPSULE', name: 'капсула' },
            { type: 'NEBULI', name: 'небули' },
            { type: 'VACCINE', name: 'вакцина доза' },
            { type: 'OINTMENT', name: 'мазь' },
            { type: 'SYRINGE', name: 'шприц' },
            { type: 'UNKNOWN', name: '???' }
        ]);
    }
}

module.exports = { DrugTypesService: new DrugTypesService() };
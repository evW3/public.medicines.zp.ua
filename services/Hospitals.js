const { Hospitals, HospitalsName } = require('../models/relations');

class HospitalsService {
    async createIfNotExists(data) {
        const recordsCount = await Hospitals.count({ where: data });
        const { id } = (recordsCount) ? (await Hospitals.findOne({ where: data })) : (await Hospitals.create(data));
        return { hospitalId: id };
    }

    async getAll() {
        return await Hospitals.findAll({ raw: true });
    }

    async updateHospital(id, data) {
        await Hospitals.update({ ...data }, { where: { id } });
    }

    async getHospitalNames(id) {
        return await HospitalsName.findAll({ where: { hospitalId: id }, raw: true });
    }

    async createHospitalName(data) {
        const { id } = await HospitalsName.create(data);
        return { hospitalNameId: id };
    }

    async removeHospitalName(id) {
        await HospitalsName.destroy({ where: { id } });
    }

    async updateHospitalName(id, name) {
        await HospitalsName.update({ name }, { where: { id } });
    }
}

module.exports = { HospitalsService: new HospitalsService() };
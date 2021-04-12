const { Hospitals } = require('./Hospitals');
const { HospitalsName } = require('./HospitalsName');
const { Drugs } = require('./Drugs');
const { DrugTypes } = require('./DrugTypes');
const { DrugsList } = require('./DrugsList');

Hospitals.hasMany(HospitalsName, { foreignKey: 'hospitalId' });
HospitalsName.belongsTo(Hospitals,{ foreignKey: 'hospitalId' });

Hospitals.hasMany(DrugsList,{ foreignKey: 'hospitalId' });
DrugsList.belongsTo(Hospitals, { foreignKey: 'hospitalId' });

DrugTypes.hasMany(Drugs, { foreignKey: 'typeId' });
Drugs.belongsTo(DrugTypes,{ foreignKey: 'typeId' });

Drugs.hasMany(DrugsList, { foreignKey: 'drugId' });
DrugsList.belongsTo(Drugs,{ foreignKey: 'drugId' });

module.exports = {
    Hospitals,
    HospitalsName,
    Drugs,
    DrugTypes,
    DrugsList
};
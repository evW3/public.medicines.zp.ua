const { sequelize, DataTypes } = require('../utils/baseDB');

const DrugTypes = sequelize.define('drug_types', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    alter: true
});

module.exports = { DrugTypes: DrugTypes };
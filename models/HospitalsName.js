const { sequelize, DataTypes } = require('../utils/baseDB');

const HospitalsName = sequelize.define('hospitals_name', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hospitalId: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    alter: true
});

module.exports = { HospitalsName };
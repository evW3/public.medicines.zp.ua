const { sequelize, DataTypes } = require('../utils/baseDB');

const DrugsList = sequelize.define('drugs_list', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hospitalId: {
        type: DataTypes.INTEGER
    },
    drugId: {
        type: DataTypes.INTEGER
    },
    amount: {
        type: DataTypes.DOUBLE
    }
}, {
    timestamps: false,
    alter: true
});

module.exports = { DrugsList };
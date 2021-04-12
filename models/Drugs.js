const { sequelize, DataTypes } = require('../utils/baseDB');

const Drugs = sequelize.define('drugs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    typeId: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false,
    alter: true
});

module.exports = { Drugs };
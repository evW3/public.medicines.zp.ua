const { sequelize, DataTypes } = require('../utils/baseDB');

const Hospitals = sequelize.define('hospitals', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    primaryName: {
        type: DataTypes.TEXT
    },
    markerName: {
        type: DataTypes.TEXT
    },
    markerAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lat: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    lng: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
}, {
    timestamps: false,
    alter: true
});

module.exports = { Hospitals };
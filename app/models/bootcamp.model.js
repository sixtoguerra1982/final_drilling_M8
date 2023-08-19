const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Bootcamp = sequelize.define('bootcamp', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
          }
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
}
);

module.exports = Bootcamp;
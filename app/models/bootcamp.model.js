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
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El Titulo es requerido'
            },
            notEmpty: {
                msg: 'Debe ingresar un Titulo'
            }
        }
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
        allowNull: false,
        validate: {
            notNull: {
                msg: 'descripción requerido'
            },
            notEmpty: {
                msg: 'Debe ingresar descripcion'
            }
        }
    },
}
);

module.exports = Bootcamp;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('user', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "users_email_key",
        validate: {
            isEmail: {
                msg: "Email no cumple con el formato requerido (ejemplo@gmail.com)"
            }
        },
    },
}
);

module.exports = User;
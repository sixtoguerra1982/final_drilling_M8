const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.PG_DATABASE, 
    process.env.PG_USER, 
    process.env.PG_PASSWORD, 
    {
        host: process.env.PG_HOST, 
        port: process.env.PG_PORT, 
        dialect: 'postgres', 
        pool: { 
            max: Number(process.env.PG_MAX), 
            min: 0, 
            acquire: Number(process.env.PG_CONNECTIONTIMEOUTMILLIS), 
            idle: Number(process.env.PG_IDLETIMEOUTMILLIS) 
        },
        define: {
            freezeTableName: true,
            underscored: true
        }
    }
);

module.exports = sequelize;
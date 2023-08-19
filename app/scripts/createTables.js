const { 
    Bootcamp,
    User 
} = require('../models');

const { load_data } = require('./loadSeed')
const sequelize = require('../config/db.config');

(async () => {
    try {
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error(error);
    } finally {
        await load_data();
        await sequelize.close();
    }
})();
const User = require('./user.model');
const Bootcamp = require('./bootcamp.model');

User.belongsToMany(Bootcamp, {
    through: 'user_bootcamp',
    as: 'bootcamp',
    foreignKey: 'user_id'
});

Bootcamp.belongsToMany(User, {
    through: 'user_bootcamp',
    as: 'user',
    foreignKey: 'bootcamp_id'
});

module.exports = {
    User,
    Bootcamp
}
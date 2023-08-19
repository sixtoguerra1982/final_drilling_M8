const { 
    Bootcamp,
    User 
} = require('../models');

const createUser = async (user) => {
    try {
        const userfind = await User.findAll({where: {email: user.email.toLowerCase()}});
        if (userfind[0] && userfind[0]['dataValues']) 
        {
            console.log(`email ${user.email.toLowerCase()} ya existe`)
            return { message: `email ${user.email.toLowerCase()} ya existe` };
        } else {
            const userResponse = await User.create({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email.toLowerCase()
            });
            console.log(`Se ha creado el usuario ${JSON.stringify(userResponse, null, 4)}`);
            return userResponse;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findAllUser = async () => {
    try {
        const allUsers = await User.findAll({order: ['id'], 
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamp',
                    attributes: ['id', 'title'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se han encontrado los usuarios ${JSON.stringify(allUsers, null, 4)}`);
        return allUsers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findUserById = async (id) => {
    try {
        const user = await User.findByPk(id,{include: [
            {
                model: Bootcamp,
                as: 'bootcamp',
                attributes: ['id', 'title'],
                through: {
                    attributes: []
                }
            }
        ]});
        if (user) {
            console.log(`Se ha encontrado el usuario ${JSON.stringify(user, null, 4)}`);
            return user;
        } else {
            console.log(`No Se ha encontrado el usuario con id ${id}`);
            return { message: 'Usuario no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateUserById = async (id, user) => {
    try {
        const userFound = await User.findByPk(id);
        if (userFound) {
            const userResponse = await User.update(user, {
                where: { id }
            });
            return userResponse;            
        } else {
            return { message: 'Usuario no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteUserById = async (id) => {
    try {
        const userFound = await User.findByPk(id);
        if (userFound) {
            const userResponse = await User.destroy({
                where: { id }
            });
            return [userResponse, userFound];            
        } else {
            return { message: 'Usuario no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createUser, findAllUser, findUserById, updateUserById, deleteUserById }
const { 
    Bootcamp,
    User 
} = require('../models');


const createBootcamp = async (bootcamp) => {
    try {
        const bootcampResponse = await Bootcamp.create({
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description
        });
        console.log(`Se ha creado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
        return bootcampResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findBootcampById = async (id) => {
    try {
        const bootcampResponse = await Bootcamp.findByPk(id, {include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'first_name', 'last_name', 'email'],
                through: {
                    attributes: []
                }
            }
        ]});
        if (bootcampResponse) {
            console.log(`Se ha encontrado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
            return bootcampResponse;
        } else {
            console.log(`No Se ha encontrado el Bootcamp con id ${id}`);
            return { message: 'Bootcamp no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


const findAllBootcamp = async () => {
    try {
        const bootcamps = await Bootcamp.findAll({order: ['id'], include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'first_name', 'last_name', 'email'],
                through: {
                    attributes: []
                }
            }
        ]});
        console.log(`Se han encontrado Bootcamps ${JSON.stringify(bootcamps, null, 4)}`);
        return bootcamps;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addUserToBootcamp = async (bootcampId, userId) => {
    try {
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.log(`No se encontró bootcamp con id ${bootcampId}`);
            return null;
        }
        const user = await User.findByPk(userId);
        if (!user) {
            console.log(`No se encontró usuario con id ${userId}`);
            return null;
        }
        await bootcamp.addUser(user);
        console.log(`Agredado el usuario id ${user.id} al bootcamp con id ${bootcamp.id}`);
        return [bootcamp, user];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createBootcamp, findBootcampById, findAllBootcamp , addUserToBootcamp }
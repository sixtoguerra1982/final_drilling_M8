const { 
    Bootcamp,
    User 
} = require('../models');

const { StatusCodes } = require('http-status-codes');

//  -> CREATE BOOTCAMP <-
//  http://localhost:3000/api/bootcamp?title=JS27&cue=100&description=HTML, CCS, JS , POSTGRESQL
const createBootcamp = async (req, res) => {
    try {
        const bootcamp = req.query;
        if (req.query.title && req.query.cue && req.query.description) {
            const bootcampResponse = await Bootcamp.create({
                title: bootcamp.title,
                cue: bootcamp.cue,
                description: bootcamp.description
            });
            console.log(`Se ha creado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
            res.status(StatusCodes.OK).json({
                message: `Bootcamp ${bootcamp.title} fue creado con éxito`,
                bootcamp: bootcampResponse
            });
        } else {
            res.status(StatusCodes.BAD_REQUEST)
            .json({ message: `Query Params de Entrada, Insufucientes (title, cue, description)` });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

//  -> SEARCH BOOTCAMP BY ID
// http://localhost:3000/api/bootcamp/:id
const findBootcampById = async (req, res) => {
    try {
        const id = req.params.id;
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
            res.status(StatusCodes.OK).json(bootcampResponse);
        } else {
            console.log(`No Se ha encontrado el Bootcamp con id ${id}`);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Bootcamp no Encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// -> ALL BOOTCAMP
// http://localhost:3000/api/bootcamp
const findAllBootcamp = async (req, res) => {
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
        res.json(bootcamps);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// BOOTCAMP ADD TO USER
// http://localhost:3000/bootcamp/adduser/idbootcamp/1/iduser/2
const addUserToBootcamp = async (req, res) => {
    try {
        const bootcampId = Number(req.params.idBootcamp);
        const userId = Number(req.params.idUser); 
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.log(`No se encontró bootcamp con id ${bootcampId}`);
            res.status(StatusCodes.BAD_REQUEST).json({message: 'Bootcamp No encontrado!'});
            return
        }
        const user = await User.findByPk(userId);
        if (!user) {
            console.log(`No se encontró usuario con id ${userId}`);
            res.status(StatusCodes.BAD_REQUEST).json({message: 'Usuario No encontrado!'});
            return
        }
        bootcamp.addUser(user);
        console.log(`Agredado el usuario id ${user.id} al bootcamp con id ${bootcamp.id}`);
        res.status(StatusCodes.CREATED).json({ 
            message: `Se agregó usuario id ${userId} al bootcamp id ${bootcampId}`,
            user,
            bootcamp
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

module.exports = { 
    createBootcamp,
    findBootcampById,
    findAllBootcamp,
    addUserToBootcamp
 }
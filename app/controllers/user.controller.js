const {
    Bootcamp,
    User
} = require('../models');

const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const findAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll({
            order: ['id'],
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
        res.status(200).json({
            message: `se encontraron ${allUsers.length} usuarios`,
            users: allUsers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const findUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id, {
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

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `usuario id ${id} no fue encontrado`
            });
            return;
        }
        console.log(`Se ha encontrado el usuario ${JSON.stringify(user, null, 4)}`);
        res.json({
            message: `usuario ${user.email} fue encontrado con éxito`,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const updateUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.body;
            // Validar los datos de entrada
            if (!(user.email && user.password && user.firstName && user.lastName && id)) {
                res.status(400).json({ message: 'Todos los campos son requeridos' });
                return;
            }
            const userFound = await User.findByPk(id);
            let actualizados = [], actualizado;
    
            if (userFound) {
                //Generamos aleatoriamente el salt
                const salt = await bcrypt.genSalt(10);
                console.log("Salt generado: " + salt);
                const encryptedPassword = await bcrypt.hash(user.password, salt);
                if ((userFound.firstName !== user.firstName) ||
                    (userFound.lastName !== user.lastName) ||
                    (userFound.email !== user.email) ||
                    (userFound.password !== encryptedPassword)) {
                    actualizados = await User.update({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: encryptedPassword
                    }, {
                        where: { id }
                    });
                    actualizado = actualizados[0];
                    console.log(`actualizados: ${actualizados}`);
                    console.log(`Se ha actualizado el usuario con id ${user.id}`);
                } else {
                    actualizado = -1;
                }
            } else {
                actualizado = 0;
            }
            if (!actualizado) {
                res.status(404).json({
                    message: `proyecto id ${id} no fue encontrado`
                });
                return;
            }
            res.status(201).json({
                message: `proyecto id ${id} fue actualizado con éxito`
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userFound = await User.findByPk(id);
        if (userFound) {
            const userResponse = await User.destroy({
                where: { id }
            });
            if (userResponse){
                res.status(201).json({
                    message: `usuario id ${id} fue borrado con éxito`
                });
            } else {
                res.status(500).json({
                    message: `usuario id ${id} NO fue eliminado`
                });
            }
        } else {
            res.status(404).json({
                message: `usuario id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById
}
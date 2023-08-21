const { User } = require('../models');

const verifySingUp = async (req, res, next) => {
    try {
        // obteniendo los valores de entrada
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        
        // Validar los datos de entrada
        if (!(email && password && firstName && lastName)) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ message: 'El password debe tener mínimo 8 caracteres'});
            return;
        }
        // Chequeando si el usuario existe
        // Validar si el usuario existe en la bases de datos
        try {
            const {
                email
            } = req.body;
            const oldUser = await User.findOne({
                where: {
                    email
                }
            });
            if (oldUser) {
                console.log(`Se ha encontrado el usuario ${JSON.stringify(oldUser, null, 4)}`);
                res.status(409).json({
                    message: `usuario ${oldUser.email} existe, inicie login en http://localhost:${process.env.PORT}/login`,
                });
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
            return;
        }
        // next() indica que el req paso la prueba y continue su camino
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
        return;
    }
}

module.exports = verifySingUp;
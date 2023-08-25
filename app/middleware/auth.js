const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const { StatusCodes } = require('http-status-codes');

const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = async (req, res, next) => {
    let token;
    if (req.headers["authorization"]) {
        token = (req.headers["authorization"].split(' '))[1];
    } else {
        token = req.body.token || req.query.token;
    }
    
    if (!token) {
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Un token es requerido para la autorización'});
        return;
    }
    try {
        // Verificamos el token usando la dependencia de jwt y el método .verify
        const decoded = await verify(token, TOKEN_KEY);
        // si el token es correcto nos devolvera los datos que colocamos en el token
        console.log('decoded:', decoded);
        
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token no valido, acceso denegado'});
        console.log('error:', err);
        return;
    }
    // next() indica que el req paso la prueba y continue su camino
    next();
};

module.exports = verifyToken;
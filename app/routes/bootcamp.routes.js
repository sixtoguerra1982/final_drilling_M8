const express = require('express');
const router = express.Router();
const {
    createBootcamp,
    findBootcampById,
    findAllBootcamp,
    addUserToBootcamp
} = require('../controllers/bootcamp.controller');


const { verifyToken } = require('../middleware');

router.get('/', findAllBootcamp);

// Aplicamos seguridad de aquí en adelante
router.use('/', verifyToken);

router.post('/', createBootcamp);

router.get('/:id', findBootcampById);

router.post('/adduser/idbootcamp/:idBootcamp/iduser/:idUser', addUserToBootcamp);

module.exports = router;

// POST /api/bootcamp Crea  un  bootcamp,  acceso  por  medio  de  token,  previamente iniciado sesión


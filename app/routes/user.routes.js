const express = require('express');
const router = express.Router();
const {
    findUserById,
    findAllUsers,
    updateUserById,
    deleteUserById
} = require('../controllers/user.controller');

const { verifyToken } = require('../middleware');

router.use('/api/user', verifyToken); // protegemos todas las rutas de user

router.get('/', findAllUsers);

router.get('/:id', findUserById);

router.put('/:id', updateUserById);

router.delete('/:id', deleteUserById);

module.exports = router;
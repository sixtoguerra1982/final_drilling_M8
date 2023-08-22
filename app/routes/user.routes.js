const express = require('express');
const router = express.Router();
const {
    findUserById,
    findAllUsers,
    updateUserById,
    deleteUserById
} = require('../controllers/user.controller');

/**
method: GET
url: http://localhost:3000/api/user
*/
router.get('/', findAllUsers);

/**
method: GET
url: http://localhost:3000/api/user/1
*/
router.get('/:id', findUserById);

/**
method: PUT
url: http://localhost:3000/api/user/1
body:
{
    "firstName": "Pedro",
    "lastName": "Picapiedra",
    "email": "mailtest@mail.com",
    "password": "mypassword"
}
*/
router.put('/:id', updateUserById);

/**
method: DELETE
url: http://localhost:3000/api/user/1
*/
router.delete('/:id', deleteUserById);

module.exports = router;
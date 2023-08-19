const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const { StatusCodes } = require('http-status-codes');

// IMPORTAR CONTROLADORES
const { createUser, findAllUser, findUserById, updateUserById, deleteUserById } = require('./app/controllers/user.controller');
const { createBootcamp, findBootcampById, findAllBootcamp, addUserToBootcamp } = require('./app/controllers/bootcamp.controller');
// MIDDELEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//  http://localhost:3000
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//  -> CREATE USER <-
//  http://localhost:3000/user?first_name=Sixto&last_name=Guerra&email=sixto.guerra1982@gmail.com
app.post('/user/', async (req, res) => {
  try {
    if (req.query.first_name && req.query.last_name && req.query.email) {
      const user = await createUser(req.query);
      if (user.message) {
        res.status(StatusCodes.BAD_REQUEST).json(user);
      } else {
        res.status(StatusCodes.CREATED).json({
          message: `usuario ${user.email} fue creado con éxito`,
          user
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST)
        .json({ message: `Query Params de Entrada, Insufucientes (first_name, last_name, email )` });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

//  -> INDEX USERS <-
// http://localhost:3000/users/
app.get('/users/', async (req, res) => {
  try {
    const users = await findAllUser();
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})

//  -> SEARCH BY USERS <-
// http://localhost:3000/user/:id
app.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    res.status((user.message) ? StatusCodes.NOT_FOUND : StatusCodes.OK ).json(user);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})

//  -> UPDATE USER <-
// http://localhost:3000/user/10?email=guerrasoft@gmail.com&first_name=Felipe&last_name=Guerra
app.put('/user/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (req.query.first_name || req.query.last_name || req.query.email){
      const user = {firstName: req.query.first_name, 
                    lastName: req.query.last_name, 
                    email: req.query.email};
      // Eliminar llaves con valores undefined
      for (let key in user) {
        if (user.hasOwnProperty(key) && user[key] === undefined) {
            delete user[key];
        }
      }
      const userUpdate = await updateUserById(id, user);
      if (userUpdate.message) {
        res.status(StatusCodes.NOT_FOUND).json(userUpdate);
      } else {
        let obj
        if (userUpdate[0] == 1){
            obj = { message: `Usuario con id ${id}, efectivamente actualizado`, data: user};
        } else {
            obj = { message: `Usuario con id ${id}. No fue actualizado`};
        }
        res.status((obj['data']) ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST).json(obj);
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST)
      .json({ message: `Query Params de Entrada, Insufucientes (first_name, last_name, email)` });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})


//  -> DELETE USER BY ID <-
// http://localhost:3000/user/:id
app.delete('/user/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userDelete = await deleteUserById(id);
      if (userDelete.message) {
        res.status(StatusCodes.NOT_FOUND).json(userDelete);
      } else {
        console.log(userDelete)
        let obj
        if (userDelete[0] == 1){
            obj = { message: `Usuario con id ${id}, efectivamente Eliminado`, data: userDelete[1]};
        } else {
            obj = { message: `Usuario con id ${id}. No fue Eliminado`};
        }
        res.status((obj['data']) ? StatusCodes.OK : StatusCodes.BAD_REQUEST).json(obj);
      }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})

//  -> CREATE BOOTCAMP <-
//  http://localhost:3000/bootcamp?title=JS27&cue=100&description=HTML, CCS, JS , POSTGRESQL
app.post('/bootcamp/', async (req, res) => {
  try {
    if (req.query.title && req.query.cue && req.query.description) {
      const bootcamp = await createBootcamp(req.query);
      res.status(StatusCodes.CREATED).json({
        message: `Bootcamp ${bootcamp.title} fue creado con éxito`,
        bootcamp
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST)
        .json({ message: `Query Params de Entrada, Insufucientes (title, cue, description)` });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

//  -> SEARCH BOOTCAMP BY ID
// http://localhost:3000/bootcamp/:id
app.get('/bootcamp/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findBootcampById(id);
    res.status((user.message) ? StatusCodes.NOT_FOUND : StatusCodes.OK ).json(user);

  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
);

//  -> INDEX BOOTCAMP <-
// http://localhost:3000/bootcamps
app.get('/bootcamps/', async (req, res) => {
  try {
    const bootcamps = await findAllBootcamp();
    res.json(bootcamps)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})

// BOOTCAMP ADD TO USER
// http://localhost:3000/bootcamp/adduser/idbootcamp/1/iduser/2
app.post('/bootcamp/adduser/idbootcamp/:idBootcamp/iduser/:idUser', async (req, res) => {
  const idBootcamp = Number(req.params.idBootcamp);
  const idUser = Number(req.params.idUser); 
  try {
      const bootcamp = await addUserToBootcamp(idBootcamp, idUser);
      if (bootcamp) {
        res.status(StatusCodes.CREATED).json({ 
            message: `Se agregó usuario id ${idUser} al bootcamp id ${idBootcamp}`,
            user: bootcamp[1],
            bootcamp: bootcamp[0]
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Usuario o Bootcamp No encontrado!'});
      }
  } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Ruta desconocida.");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
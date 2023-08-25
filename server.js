const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const { StatusCodes } = require('http-status-codes');
const { User } = require('./app/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const sign = util.promisify(jwt.sign);
const userRoutes = require('./app/routes/user.routes');
const bootcampRoutes = require('./app/routes/bootcamp.routes');

const { 
    verifySingUp 
} = require('./app/middleware');
// MIDDELEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

app.use('/api/bootcamp', bootcampRoutes);

//  http://localhost:3000
//  In the future it will be the view to consume API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API SIGN UP
// http://localhost:3000/api/signup
app.post('/api/signup', verifySingUp, async (req, res) => {
    // lógica del registro
    try {
        // obteniendo los valores de entrada
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        //Generamos aleatoriamente el salt
        const salt = await bcrypt.genSalt(10);
        console.log("Salt generado: " + salt);
        // Encriptando la contraseña del usuario
        const encryptedPassword = await bcrypt.hash(password, salt);

        // Password encriptado
        console.log("\nPassword encriptado: " + encryptedPassword);

        // Creando el usuario en la bases de datos
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // Convertimos a minuscula
            password: encryptedPassword,
        });

        // Creación del Token
        const token = await sign(
          {
              userId: user.id,
              email
          },
          process.env.TOKEN_KEY,
          {
              expiresIn: "10m",
          }
        );  
        // retornamos el nuevo usuario
        res.status(StatusCodes.CREATED).json({
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// API SIGN IN
http://localhost:3000/api/signin
app.post('/api/signin', async (req, res) => {
  // lógica del inicio de sesión
  try {
      const {
          email,
          password
      } = req.body;

      // Validar los datos de entrada
      if (!(email && password)) {
          res.status(StatusCodes.BAD_REQUEST).json({ message: 'Todos los datos son requeridos, email y password' });
          return;
      }

      // Validando la existencia del usuario en la base de datos
      const user = await User.findOne({
          where: {
              email
          }
      });

      if (user && (await bcrypt.compare(password, user.password))) {
          // Se genera el Token
          const token = await sign(
              {
                  userId: user.id,
                  email
              },
              process.env.TOKEN_KEY, 
              {
                  expiresIn: "10m",
              }
          );
          // Impresion por el terminal del Token generado para el usuario
          console.log("Usuario: " + email + "\nToken: " + token);

          // Retornando los datos del usuario
          res.json({
              token,
              message: 'Autenticado'
          });
          return;
      }
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credenciales invalidas'});
  } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

// Capturar Request en caso de que ruta no exista
app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Ruta desconocida.");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
const express = require('express');
const router = express.Router();
const models = require('../models');
const middleware = require('../utilidades/middleware');

// Controllers
const AuthController = require('../utilidades/authController');

// Home es solo de prueba
router.get('/', (req, res) => {
  console.log('Peticion GET recibida en /user');
  res.json({ hello: "World" });
});

// Dos rutas: login y registro
router.post('/signin', AuthController.signIn);// luego de esta autenticacion se genera un token

router.post('/signup', AuthController.signUp);

module.exports = router;
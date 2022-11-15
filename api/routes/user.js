const express = require('express');
const router = express.Router();
const models = require('../models');
const middleware = require('../utilidades/middleware');

// Controllers
const AuthController = require('../utilidades/authController');

// Home
router.get('/', (req, res) => {
  console.log('Peticion GET recibida en /user');
  res.json({ hello: "World" });
});

// Dos rutas: login y registro
router.post('/signin', AuthController.signIn);

router.post('/signup', AuthController.signUp);

module.exports = router;
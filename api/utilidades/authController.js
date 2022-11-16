const model = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {

    // Login
    signIn(req, res) {

        let { email, password } = req.body;

        // Buscar usuario

        model.user.findOne({
            where: {
              email: email
            }
        }).then(user => {

            if (!user) {
                res.status(404).json({ msg: "Correo no encontrado" });
            } else {

                if (bcrypt.compareSync(password, user.password)) {

                    // Creamos el token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expiresIn
                    });

                    res.json({
                        user: user,
                        token: token
                    })

                } else {

                    // Unauthorized Access
                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }

            }

        }).catch(err => {
            res.status(500).json({ msg: "Error al buscar usuario", err: err })
            //res.status(500).json(err);
        })

    },

    // Registro
    signUp(req, res) {
        
        // Encriptamos la contraseña
        let pass = ( req.body.password.length > 5 ) ? bcrypt.hashSync(req.body.password, parseInt(authConfig.rounds)) : req.body.password;
        // Crear un usuario
        model.user.create({
            email: req.body.email,
            password: pass
        }),
       model.alumno.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido}

        ).then(user => { //si se cumple esta promesa se crea los usuarios

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
                }
            );

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
          //console.log("Error al crear usuario");
            res.status(500).json({ msg: "Error al crear usuarios", err: err })
            
        });
    }
}
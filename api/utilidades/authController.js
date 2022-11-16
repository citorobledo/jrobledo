const model = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {

    // Login
    signIn(req, res) {
        let { email, password } = req.body; // se obtiene el email y el password del body
        // Buscar usuario
        model.user.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ msg: "Correo no encontrado" });
            } else {
                if (bcrypt.compareSync(password, user.password)) {// si los pass coinciden
                    // Creamos el token con el usuario
                    let token = jwt.sign({ user: user }, authConfig.secret, {expiresIn: authConfig.expiresIn});
                    // enviamos el token y el usuario al cliente
                    res.json({
                        user: user,
                        token: token
                    })
                } else {// acceso no autorizado
                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }
            }}).catch(err => {
                res.status(500).json({ msg: "Error en el lognIn", err: err })
            })
    },

    // Registro
    signUp(req, res) {
        // Encriptamos la contraseña
        let pass = (255 > req.body.password.length > 5)// valido si el pass es mayor a 5 y menor a 255
            ?bcrypt.hashSync(req.body.password, parseInt(authConfig.rounds))// encripto el password
            :req.body.password;// si no es valido lo dejo como esta
        // Crear un usuario
        model.user.create({
            email: req.body.email,
            password: pass
        }).then(user => { //si se cumple esta promesa se crea el usuario
            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            });
            res.json({// enviamos el token y el usuario al cliente
                user: user,
                token: token
            });
        }).catch(err => {
            res.status(500).json({ msg: "Error al crear usuarios", err: err })
        });
    }
}
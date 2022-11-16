const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const moment = require("moment");



module.exports = {
  verifyToken(req, res, next)  {//verifico el token
    if (!req.headers.authorization) { //si no hay cabecera de autorizacion
      return res
        .status(403)
        .send({ message: "Tu petición no tiene autorización" });
    }
    //comprobar si el token es valido
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Token no válido" });
      }
      //Con moment().unix() conseguimos el tiempo actual en formato UNIX, y con moment().add(14, "days").unix() le estamos añadiendo 14 días al momento actual. Muy útil para establecer una fecha de creación y expiración.
      if(decoded.exp < moment().unix()){// compruebo si el token ha expirado
        return res.status(401).send({ message: "Token expirado" });
      }
      req.user = decoded; //guardo el usuario en la peticion para que pueda ser usado 
      next();
    });
  }
}

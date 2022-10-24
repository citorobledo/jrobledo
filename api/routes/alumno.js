var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.alumno
    .findAll({
      attributes: ["id", "dni", "nombre", "apellido"],
    })
    .then(alumno => res.send(alumno))
    .catch(() => res.sendStatus(500));
});

router.get("/prof/:dni", (req, res) => {   // este get trae los profesores del alumno con el dni que se le pasa por parametro
  console.log("Esto es un mensaje para ver en consola");
  models.alumno
    .findOne({
      attributes: ["id", "dni", "nombre", "apellido"],           //muestra el dni y el nombre del alumno
      where: { dni: req.params.dni },                       //busca el alumno con el id que se le pasa por parametro
      include: [{
        model: models.matricula,              //incluye la tabla matricula
        attributes: ["id_alumno"],            //muestra solo el id del alumno
        include: [{                
          attributes: ["nombre", 'apellido'], //incluye la tabla profesor
          model: models.profesor,             //muestra el nombre y el apellido del profesor
        }]
      }]

    })
    .then(alumno => res.send(alumno))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.alumno
    .create({
      dni: req.body.dni,
      nombre: req.body.nombre,
      apellido: req.body.apellido
    })
    .then(alumno => res.status(201).send({
      id: alumno.id,
      dni: alumno.dni,
      nombre: alumno.nombre,
      apellido: alumno.apellido
    }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra alumno con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findalumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: [
        "id",
        "dni",
        "nombre",
        "apellido"],
      where: { id }
    })
    .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findalumno(req.params.id, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .update({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido
      }, {
        fields: [
          "dni",
          "nombre",
          "apellido"]
      })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otro alumno con el mismo dato')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findalumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findalumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;

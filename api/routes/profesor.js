var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.profesor
    .findAll({
      attributes: [
        "id",
        "nombre",
        "apellido"
      ],
      //se agrega la asociacion a materia:
      include: [{
        as: 'Materia-dictada',// nombre de la relacion en el modelo
        model: models.materia, // modelo al que pertenece la asociacion (materia)
        attributes: ["id", "nombre"],
        include: [{
          as: 'Carrera-Relacionada',// nombre de la relacion en el modelo
          model: models.carrera, // modelo al que pertenece la asociacion (carrera)
          attributes: ["id", "nombre"]
          //,
          //include: [{
          //  as: 'alumnos-relacionados',// nombre de la relacion en el modelo
          //  model: models.alumno, // modelo al que pertenece la asociacion (alumno)
          //  attributes: ["id", "nombre", "apellido"],
          //}]
        }]
      }]
    })
    .then(profesor => res.send(profesor))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.profesor
    .create({
      nombre: req.body.nombre,
      apellido: req.body.apellido
    })
    .then(profesor => res.status(201).send({
      id: profesor.id,
      nombre: profesor.nombre,
      apellido: profesor.apellido
    }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra profesor con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findprofesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: [
        "id",
        "nombre",
        "apellido"],
      where: { id }
    })
    .then(profesor => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findprofesor(req.params.id, {
    onSuccess: profesor => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = profesor =>
    profesor
      .update({
        nombre: req.body.nombre,
        apellido: req.body.apellido
      }, {
        fields: [
          "nombre",
          "apellido"
        ]
      })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra profesor con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
  findprofesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = profesor =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findprofesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
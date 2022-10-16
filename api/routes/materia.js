var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.materia
    .findAll({
      attributes: ["id", "nombre"],
    })
    .then(materia => res.send(materia))
    .catch(() => res.sendStatus(500));
});

router.get("/prof", (req, res) => {//trae todos los profesores de la materia
  console.log("Esto es un mensaje para ver en consola");
  models.materia
    .findAll({
      attributes: ["id", "nombre"],
       include:[{
        model:models.matricula, 
        attributes: ["id_profesor"],
        include:[{
          model:models.profesor,
          attributes: ["nombre", "apellido"],
       }]
      }]
    })
    .then(materia => res.send(materia))
    .catch(() => res.sendStatus(500));
});

router.get("/alum", (req, res) => {//trae todos los alumnos de la materia
  console.log("Esto es un mensaje para ver en consola");
  models.materia
    .findAll({
      attributes: ["id", "nombre"],
       include:[{
        model:models.matricula, 
        attributes: ["id_alumno"],
        include:[{
          model:models.alumno,
          attributes: ["nombre", "apellido"],
       }]
      }]
    })
    .then(materia => res.send(materia))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.materia
    .create({
      nombre: req.body.nombre,
      id_carrera: req.body.id_carrera
    })
    .then(materia => res.status(201).send({
      id: materia.id,
      nombre: materia.nombre,
      id_carrera: materia.id_carrera
    }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra materia con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      attributes: [
        "id", 
        "nombre", 
        "id_carrera"],
      where: { id }
    })
    .then(materia => (materia ? onSuccess(materia) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findMateria(req.params.id, {
    onSuccess: materia => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra materia con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
var express = require("express");
var router = express.Router();
var models = require("../models");

const findMateria = (id, { onSuccess, onNotFound, onError }) => { //funcion para encontrar una materia por id
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

router.get("/", (req, res) => { //obtener todas las materias
  console.log("Petición GET a /mat");
  models.materia
    .findAll({
      attributes: ["id", "nombre"],
    })
    .then(materia => res.send(materia))
    .catch(() => res.sendStatus(500));
});

router.get("/mat/:id", (req, res) => { //obtener una materia por id
  console.log("Petición GET a /mat/:id");
  findMateria(req.params.id, {
    onSuccess: materia => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/pro", (req, res) => {//trae todos los profesores de las materias
  console.log("Petición GET a /mat/pro");
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

router.get("/alu", (req, res) => {//trae todos los alumnos de las materias
  console.log("Petición GET a /mat/alu");
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

router.post("/", (req, res) => { //crear una materia
  console.log("Petición POST a /mat");
  models.materia
    .create({
      nombre: req.body.nombre,
    })
    .then(materia => res.status(201).send({
      id: materia.id,
      nombre: materia.nombre,
    }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra materia con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.json({ error })
      }
    });
});

router.put("/:id", (req, res) => { //actualizar una materia
  console.log("Petición PUT a /mat/:id");
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

router.delete("/:id", (req, res) => { //eliminar una materia
  console.log("Petición DELETE a /mat/:id");
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
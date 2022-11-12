var express = require("express");
var router = express.Router();
var models = require("../models");

const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
  models.carrera
    .findOne({
      attributes: [
        "id",
        "nombre"],
      where: { id }
    })
    .then(carrera => (carrera ? onSuccess(carrera) : onNotFound()))
    .catch(() => onError());
};

const findCarreraNombre = (nombre, { onSuccess, onNotFound, onError }) => {
  models.carrera
    .findOne({
      attributes: [
        "id",
        "nombre"],
      where: { nombre }
    })
    .then(carrera => (carrera ? onSuccess(carrera) : onNotFound()))
    .catch(() => onError());
};

router.get("/", (req, res) => {// trae todas las carreras
  console.log("Petición GET a /car");
  models.carrera
    .findAll({
      attributes: ["id", "nombre"],
    })
    .then(carreras => res.send(carreras))
    .catch(() => res.sendStatus(500));
});

router.get("/:id", (req, res) => { // trae una carrera por id
  console.log("Petición GET a /car/:id");
  findCarrera(req.params.id, {
    onSuccess: carrera => res.send(carrera),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/nomb/:nombre", (req, res) => { // trae una carrera por nombre
  console.log("Petición GET a /car/nomb/:nombre");
  findCarreraNombre(req.params.nombre, {
    onSuccess: carrera => res.send(carrera),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/mat/:id", (req, res) => {// trae todas las materias de una carrera por id
  console.log("Petición GET a /car/mat/:id");
  findCarrera(req.params.id, {
    onSuccess: carrera => {
      models.carrera
        .findOne({
          attributes: ["id", "nombre"],
          where: { id: req.params.id },
          include: [{
            model: models.matricula,
            attributes: ["id_carrera"],
            include: [{
              attributes: ["nombre"],
              model: models.materia,
            }]
          }]
        })
        .then(carrera => res.send(carrera))
        .catch(() => res.sendStatus(500));
    },
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.post("/", (req, res) => { // crea una carrera
  console.log("Petición POST a /car");
  models.carrera.create({nombre: req.body.nombre})
    .then(carrera => res.status(201).send({
      nombre: carrera.nombre
    }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra carrera con el mismo dato')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.json({ error });
      }
    });
});

router.put("/:id", (req, res) => { // actualiza una carrera por id
  const onSuccess = carrera =>
    carrera
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.json({ error });
        }
      });
    findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => { // elimina una carrera por id
  const onSuccess = carrera => carrera.destroy()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.matricula
    .findAll({
      attributes: ["id"]
    })
    .then(matricula => res.send(matricula))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.matricula
    .create({ nombre: req.body.nombre })
    .then(matricula => res.status(201).send({ id: matricula.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra matricula con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findmatricula = (id, { onSuccess, onNotFound, onError }) => {
  models.matricula
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(matricula => (matricula ? onSuccess(matricula) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findmatricula(req.params.id, {
    onSuccess: matricula => res.send(matricula),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = matricula =>
    matricula
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra matricula con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findmatricula(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = matricula =>
    matricula
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findmatricula(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
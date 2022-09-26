var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.matricula
    .findAll({
      attributes: ["id"]
    })
    .then(matriula => res.send(matriula))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.matriula
    .create({ nombre: req.body.nombre })
    .then(matriula => res.status(201).send({ id: matriula.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra matriula con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findmatriula = (id, { onSuccess, onNotFound, onError }) => {
  models.matriula
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(matriula => (matriula ? onSuccess(matriula) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findmatriula(req.params.id, {
    onSuccess: matriula => res.send(matriula),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = matriula =>
    matriula
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra matriula con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findmatriula(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = matriula =>
    matriula
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findmatriula(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
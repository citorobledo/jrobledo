const utilidades = require ('../utilidades/paginacion.js');
var express = require("express");
var router = express.Router();
var models = require("../models");

const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: [
        "id",
        "dni",
        "nombre",
        "apellido"],
      where: { id }
    })
    .then(profesor => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};

const findProfesorDNI = (dni, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: [
        "id",
        "dni",
        "nombre",
        "apellido"],
      where: { dni }
    })
    .then(profesor => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};

router.get("/", (req, res) => {//obtener todos los profesores
  console.log("Petición GET a /pro");
  models.profesor
    .findAll({
      attributes: ["id", "dni", "nombre", "apellido"],
    })
    .then(profesor => res.send(profesor))
    .catch(() => res.sendStatus(500));
});

router.get("/:id", (req, res) => { //obtener un profesor por id
  console.log("Petición GET a /pro/:id");
  findProfesor(req.params.id, {
    onSuccess: profesor => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/dni/:dni", (req, res) => { //obtener un profesor por dni
  console.log("Petición GET a /pro/dni/:dni");
  findProfesorDNI(req.params.dni, {
    onSuccess: profesor => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/alum/:dni", (req, res) => {        //obtener todos los alumnos de un profesor con el dni con paginacion
  console.log("Petición GET a /pro/alum/:dni");
  models.profesor                               // busca en la tabla profesor
    .findOne({
      attributes: ["id", "dni", "nombre", "apellido"], //muestra el dni y el nombre del profesor  
      where: { dni: req.params.dni },
      include: [{
        offset: utilidades.getOffset(req.query.pagina, req.query.limite), //offset es el numero de registros que se salta
        limit: utilidades.reqSino(req.query.limite, 10),                  //limit es el numero de registros que muestra
        model: models.matricula,                //incluye la tabla matricula
        attributes: ["id_profesor"],            //muestra solo el id del profesor
        include: [{
          attributes: ["nombre", "apellido"],  //muestra el nombre y el apellido del alumno
          model: models.alumno,                 //incluye la tabla alumno
        }]
      }]
    })
    .then(profesor => res.send(profesor))
    .catch(() => res.sendStatus(500));
});

router.get("/mat/:dni", (req, res) => {        //obtener todas las materias de un profesor con dni 
  console.log("Petición GET a /pro/mat/:dni");
  models.profesor                               // busca en la tabla profesor
    .findOne({
      attributes: ["id", "dni", "nombre", "apellido"],
      where: { dni: req.params.dni },
      include: [{
        model: models.matricula,                //incluye la tabla matricula
        attributes: ["id_profesor"],            //muestra solo el id del profesor que machee con el id del profesor
        include: [{
          attributes: [ "nombre"],              //muestra el nombre y el apellido del alumno
          model: models.materia,                //incluye la tabla materia
        }]
      }]
    })
    .then(profesor => res.send(profesor))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => { //crear un profesor
  console.log("Petición POST a /pro");
  models.profesor
    .create({
      dni: req.body.dni,
      nombre: req.body.nombre,
      apellido: req.body.apellido
    })
    .then(profesor => res.status(201).send({
      id: profesor.id,
      dni: profesor.dni,
      nombre: profesor.nombre,
      apellido: profesor.apellido
    }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        console.log(` ${error.errors[0].value} ya existe]`);
        res.status(400).send('Bad request: existe otro profesor con datos iguales')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.json({ error});
      }
    });
});

router.put("/:id", (req, res) => { //actualizar un profesor
  console.log("Petición PUT a /pro/:id");
  const onSuccess = profesor =>
    profesor.update({
      dni: req.body.dni,
      nombre: req.body.nombre,
      apellido: req.body.apellido
    }, { fields: ["dni", "nombre", "apellido"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra profesor con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.json({ error });
        }
      });
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => { //borrar un profesor
  const onSuccess = profesor =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
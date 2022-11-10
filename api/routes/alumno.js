const utilidades = require ('../utilidades/utilidades.js');
var express = require("express");
var router = express.Router();
var models = require("../models");

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
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

const findAlumnoDNI = (dni, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: [
        "id",
        "dni",
        "nombre",
        "apellido"],
      where: { dni }
    })
    .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

router.get("/", (req, res) => {                             //obtener todos los alumnos con paginacion
  console.log("Peticion GET recibida en /alu");
  models.alumno                                             //busca en la tabla alumno
    .findAll({
      attributes: ["id", "dni", "nombre", "apellido"],      //muestra solo los atributos id, dni, nombre y apellido
      offset: utilidades.getOffset(req.query.pagina, req.query.limite), //offset es el numero de registros que se salta
      limit: utilidades.reqSino(req.query.limite, 10),      //limit es el numero de registros que muestra
      order: [                                              // ordeno por apellido y nombre la lista de alumnos de forma ascendente
        ['apellido', 'ASC'], ['nombre', 'ASC']
      ]
    })
    .then(alumno => res.send(alumno))
    .catch(() => res.sendStatus(500));
});

router.get("/:id", (req, res) => {              // obtener un alumno por id
  console.log("Peticion GET recibida en /alu/:id");
  findAlumno(req.params.id, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/dni/:dni", (req, res) => {         // obtener un alumno por dni.
  console.log("Peticion GET recibida en /alu/dni/:dni");
  findAlumnoDNI(req.params.dni, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/prof/:dni", (req, res) => {   // este get trae los profesores del alumno con el dni que se le pasa por parametro
  console.log("Peticion GET recibida en /alu/prof/:dni");
  models.alumno
    .findOne({
      attributes: ["id", "dni", "nombre", "apellido"],   //muestra el dni y el nombre del alumno
      where: { dni: req.params.dni },                    //busca el alumno con el dni que se le pasa por parametro
      include: [{
        model: models.matricula,              //incluye la tabla matricula
        attributes: ["id_alumno" ],            //muestra solo el id del alumno
        include: [{                
          attributes: ["nombre", 'apellido'], //muestra el nombre y el apellido del profesor
          model: models.profesor,             //incluye la tabla profesor
        }]
      }]

    })
    .then(alumno => res.send(alumno))
    .catch(() => res.sendStatus(500));
});

router.get("/mat/:dni", (req, res) => {   // este get trae las materias del alumno con el dni que se le pasa por parametro
  console.log("Peticion GET recibida en /alu/mat/:dni");
  models.alumno
    .findOne({
      attributes: ["id", "dni", "nombre", "apellido"],   //muestra el dni y el nombre del alumno
      where: { dni: req.params.dni },                    //busca el alumno con el dni que se le pasa por parametro
      include: [{
        model: models.matricula,              //incluye la tabla matricula
        attributes: ["id_alumno" ],            //muestra solo el id del alumno
        include: [{                
          attributes: ["nombre"], //muestra el nombre de la materia
          model: models.materia,             //incluye la tabla materia
        }]
      }]

    })
    .then(alumno => res.send(alumno))
    .catch(() => res.sendStatus(500));
});

router.get("/car/:dni", (req, res) => {   // este get trae las carreras del alumno con el dni que se le pasa por parametro
  console.log("Peticion GET recibida en /alu/car/:dni");
  models.alumno
    .findOne({
      attributes: ["id", "dni", "nombre", "apellido"],   //muestra el dni y el nombre del alumno
      where: { dni: req.params.dni },                    //busca el alumno con el dni que se le pasa por parametro
      include: [{
        model: models.matricula,              //incluye la tabla matricula
        attributes: ["id_alumno" ],            //muestra solo el id del alumno
        include: [{                
          attributes: ["nombre"], //muestra el nombre de la materia
          model: models.carrera,             //incluye la tabla carrera
        }]
      }]

    })
    .then(alumno => res.send(alumno))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {               // crear un alumno
  console.log("Peticion POST recibida en /alu");
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
        console.log(` ${error.errors[0].value} ya existe]`);
        res.status(400).send('Bad request: existe otro alumno con datos iguales')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.json({ error});
      }
    });
});

router.put("/:id", (req, res) => {            // modificar un alumno
  console.log("Peticion PUT recibida en /alu/:id");
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
    findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {        // eliminar un alumno
  console.log("Peticion DELETE recibida en /alu/:id");
  const onSuccess = alumno =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;

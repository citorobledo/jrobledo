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
    .create({ 
      id_alumno: req.body.id_alumno, 
      id_profesor: req.body.id_profesor, 
      id_materia: req.body.id_materia, 
      id_carrera: req.body.id_carrera 
    })
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
      attributes: [
        "id", 
        "id_alumno", 
        "id_profesor", 
        "id_materia", 
        "id_carrera"
      ],
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

const findAlumno = ( dni, { onSuccess, onNotFound, onError }) => {// funcion para buscar un alumno por dni
  models.alumno // busca en la tabla alumno
    .findOne({// busca un alumno
      attributes: [// muestra los atributos que se detallan
        "id",
        "dni",
        "nombre",
        "apellido"    
      ],
        where: { dni }//en donde el dni sea igual al dni que se pasa por parametro
    })
      .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))// si encuentra un alumno ejecuta onSuccess, sino ejecuta onNotFound
        .catch(() => onError());// si hay un error ejecuta onError
};

router.get("/alumn_dni/:dni", (req, res) => {// busca el alumno por dni y devuelve sus datos.
  findAlumno(req.params.dni, {// se pasa por parametros el dni del alumno
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});
// TODO: implementar un get que devuelva todas las matriculas de un alumno

router.put("/:id", (req, res) => { // actualiza los datos de la matricula del id
  const onSuccess = matricula => matricula.update({ //funcion onSuccess que actualiza los datos de la matricula
    id_alumno: req.body.id_alumno, 
    id_profesor: req.body.id_profesor, 
    id_materia: req.body.id_materia, 
    id_carrera: req.body.id_carrera},
      {fields: [ // campos que se actualizan
        "id_alumno",
        "id_profesor",
        "id_materia",
        "id_carrera"]})
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
    findmatricula(req.params.id, {// busca la matricula por id
    onSuccess,// si la encuentra ejecuta onSuccess
    onNotFound: () => res.sendStatus(404), // si no la encuentra ejecuta onNotFound
    onError: () => res.sendStatus(500) // si hay un error ejecuta onError
  });
});

router.put("/alumn_dni/:dni", (req, res) => { // actualiza los datos de la matricula del alumno con el dni pasado por parametro
  const onSuccess = matricula => matricula.update({ // funcion onSuccess que actualiza los datos de la matricula
    id_alumno: req.params.id, 
    id_profesor: req.body.id_profesor, 
    id_materia: req.body.id_materia, 
    id_carrera: req.body.id_carrera},
      {fields: [
        "id_alumno",
        "id_profesor",
        "id_materia",
        "id_carrera"]})
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
    findAlumno(req.params.dni, {
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
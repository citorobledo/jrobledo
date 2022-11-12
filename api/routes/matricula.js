var express = require("express");
var router = express.Router();
var models = require("../models");

const findmatricula = (id, { onSuccess, onNotFound, onError }) => { // funcion para buscar una matricula por id
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

router.get("/", (req, res) => { // este get trae todas las matriculas
  console.log("Petición GET a /matr");
  models.matricula
    .findAll({
      attributes: ["id"]
    })
    .then(matricula => res.send(matricula))
    .catch(() => res.sendStatus(500));
});

router.get("/:id", (req, res) => {// devuelve la matricula con el id que se le pasa por parametro
  console.log("Petición GET a /matr/:id");
  findmatricula(req.params.id, {
    onSuccess: matricula => res.send(matricula),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/alumn_dni/:dni", (req, res) => {// busca el alumno por dni y devuelve sus datos.
  console.log("Petición GET a /matr/alumn_dni/:dni");
  findAlumno(req.params.dni, {// se pasa por parametros el dni del alumno
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.get("/alumn_matr/:dni", (req, res) => { // busca el alumno por dni y devuelve sus matriculas
  console.log("Petición GET a /matr/alumn_matr/:dni");
  findAlumno(req.params.dni, {    // busca el alumno por dni y devuelve sus datos.
    onSuccess: alumno => {        // si encuentra el alumno ejecuta onSuccess
      models.matricula
        .findAll({
          attributes: ["id", "id_alumno", "id_profesor", "id_materia", "id_carrera"],
          where: { id_alumno: alumno.id }
        })
        .then(matricula => res.send(matricula)) // devuelve las matriculas del alumno
        .catch(() => res.sendStatus(500));      // si hay un error devuelve 500
    },
    onNotFound: () => res.sendStatus(404),      // si no encuentra el alumno devuelve 404
    onError: () => res.sendStatus(500)          // si hay un error devuelve 500
  });
});


router.post("/", (req, res) => { // crea una matricula
  console.log("Petición POST a /matr");
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
        res.status(400).send('Bad request: existe otra matricula con mismos datos')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.json({ error });
      }
    });
});

router.put("/:id", (req, res) => { // actualiza los datos de la matricula del id
  console.log("Peticion PUT en matr/:id");
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
                res.json({ error });
              }
            });
    findmatricula(req.params.id, {// busca la matricula por id
    onSuccess,// si la encuentra ejecuta onSuccess
    onNotFound: () => res.sendStatus(404), // si no la encuentra ejecuta onNotFound
    onError: () => res.sendStatus(500) // si hay un error ejecuta onError
  });
});

router.delete("/:id", (req, res) => { // elimina la matricula con el id que se le pasa por parametro
  console.log("Peticion DELETE en matr/:id");
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
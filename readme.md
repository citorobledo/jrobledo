
<div style="background-color:#f612; text-align:left;  padding:40px 15px;">
<h1 style="color:#429; font-size: 40px; font-weight: 300; margin: 0;">Readme</h1>
<h3 style="color:#429">

## Titulo: TP Estrategias de Persistencia
## Author: Javier Robledo

# Documentacion acerca de la API

# Metodos:

### A continuacion se detallan los metodos de la API, a los cuales se les debe anteponer la direccion base de la API, la cual es: http://localhost:3001


## Ruta alumnos:

```sh
GET:
/alu/: (obtener todos los alumnos con paginacion), tiene los parametros por defecto pagina = 1, y limite = 10. Para definir una paginacion manualente se deben incluir los paraetros que los definen.
ejemplo:
 /alu?pagina=n&limite=m (donde n,m son enteros positivos)

 GET/ID:
 /alu/:id/: (obtener un alumno referenciado por el ID),deuelve todos los datos del aluno on ese ID.

 GET/DNI:
 /alu/dni/:dni: (obtener un alumno referenciado por el DNI),deuelve todos los datos del aluno con ese DNI.
 /alu/dni/xxxxxxxx (donde xxxxxxxx es unnuero entero de 8 digitos)

 GET/PROF:
 /alu/prof/:dni (obtener los profesores de un alumno referenciado por el DNI), deuelve todos los datos de los profesores del aluno con ese DNI.
 /alu/prof/dni/xxxxxxxx (donde xxxxxxxx es unnuero entero de 8 digitos)

 GET/MAT:
 /alu/mat/:dni (obtener las materias de un alumno referenciado por el DNI), deuelve todas las materias del aluno con ese DNI.
 /alu/mat/dni/xxxxxxxx (donde xxxxxxxx es unnuero entero de 8 digitos)

 GET/CAR:
 /alu/car/:dni (obtener las carreras de un alumno referenciado por el DNI), deuelve todas las carreras del aluno con ese DNI.
 /alu/car/dni/xxxxxxxx (donde xxxxxxxx es unnuero entero de 8 digitos)

 POST/ALU:
 /alu/: (Crea un alumno en la base de datos)
 los campos son los siguientes:
 dni: admite solo numeros enteros de 8 digitos
 nombre: admite solo letras entre 3-50 acracteres
 apellido: admite solo letras entre 3-50 acracteres

 PUT/ALU:
 /alu/:id: (actualiza un alumno en la base de datos referenciado por el id)
 los campos son los siguientes:
 dni: admite solo numeros enteros de 8 digitos
 nombre: admite solo letras entre 3-50 acracteres
 apellido: admite solo letras entre 3-50 acracteres
 el registro debe existir previamente.

 DELETE/ALU:
 /alu/:id (Elimina un registro de la base de datos)
  (donde id es un nuero entero que referencia a un alumno )
```

## Ruta profesores:

```sh
GET/PRO:
/pro/: (obtiene todos los registros de la tabla profesores)

GET/PRO/ID:
/pro/:id (obtiene los datos del profesor referenciado por el id) 

GET/PRO/DNI:
/pro/dni/:dni (obtiene los datos del profesor referenciado por el dni) 

GET/PRO/ALUM/DNI:
/pro/alum/:dni (obtiene todos los alumnos del profesor referenciado por el dni. con paginaion)

GET/PRO/MAT/DNI:
/pro/mat/:dni (obtiene todas las materias del profesor referenciado por el dni)

POST/PRO:
/pro/: (crea un profesor en la base de datos)
los campos son los siguientes:
 dni: admite solo numeros enteros de 8 digitos
 nombre: admite solo letras entre 3-50 acracteres
 apellido: admite solo letras entre 3-50 acracteres

 PUT/PRO:
 /pro/:id: (actualiza un profesor en la base de datos referenciado por el id)
 los campos son los siguientes:
 dni: admite solo numeros enteros de 8 digitos
 nombre: admite solo letras entre 3-50 acracteres
 apellido: admite solo letras entre 3-50 acracteres
 el registro debe existir previamente.

 DELETE/PRO:
 /pro/:id (Elimina un registro de la base de datos)
  (donde id es un nuero entero que referencia a un profesor )
```
## Ruta carreras:

```sh
GET/CAR:
/car/: (obtiene todos los registros de la tabla carrera)

GET/CAR/ID:
/car/:id (obtiene los datos de la carrera referenciado por el id) 

GET/CAR/NOMB:
/car/nomb/:nombre (obtiene los datos de la carrera referenciado por el nombre) 

GET/CAR/MAT/:
/car/mat/:id (obtiene todas las materias de la carrera referenciada por id)

POST/CAR:
/car/: (crea una carrera en la base de datos)
los campos son los siguientes:
 nombre: admite solo letras entre 3-50 acracteres

 PUT/CAR:
 /car/:id: (actualiza una carrera en la base de datos referenciado por el id)
 los campos son los siguientes:
 nombre: admite solo letras entre 3-50 acracteres
 el registro debe existir previamente.

  DELETE/CAR:
 /car/:id (Elimina un registro de la base de datos)
  (donde id es un nuero entero que referencia a una carrera )
 ```
## Ruta materias:
  
```sh
GET/MAT:
/mat/: (obtiene todos los registros de la tabla materias)

GET/MAT/ID:
/mat/:id (obtiene los datos de la materia referenciada por el id)

GET/MAT/PROF:
/mat/prof/:id (obtiene todos los profesores de la materia referenciada por el id)

GET/MAT/ALU:
/mat/alu/:id (obtiene todos los alumnos de la materia referenciada por el id)

POST/MAT:
/mat/: (crea una materia en la base de datos)
los campos son los siguientes:
 nombre: admite solo letras entre 3-50 acracteres

PUT/MAT:
/mat/:id: (actualiza una materia en la base de datos referenciado por el id)
los campos son los siguientes:
 nombre: admite solo letras entre 3-50 acracteres
 el registro debe existir previamente.

DELETE/MAT:
/mat/:id (Elimina un registro de la base de datos referenciado por el id)
(donde id es un nuero entero que referencia a una materia )
```
## Ruta matriculas:

```sh
GET/MATR:
/matr/: (obtiene todos los registros de la tabla matriculas)

GET/MATR/ID:
/matr/:id (obtiene los datos de la matricula referenciada por el id)

GET/MATR/ALUMN_DNI:
/matr/alumn_dni/:dni (obtiene los datos del alumno referenciado por el dni)

GET/MATR/ALUMN_MATR:
/matr/alumn_matr/:dni (obtiene las matriculas del alumno referenciado por el dni)

POST/MATR:
/matr/: (crea una matricula en la base de datos)
los campos son los siguientes:
 id_alumno: admite solo numeros enteros
 id_materia: admite solo numeros enteros
 id_profesor: admite solo numeros enteros
 id_carrera: admite solo numeros enteros

PUT/MATR:
/matr/:id: (actualiza una matricula en la base de datos referenciado por el id)
los campos son los siguientes:
 id_alumno: admite solo numeros enteros
 id_materia: admite solo numeros enteros
 id_profesor: admite solo numeros enteros
 id_carrera: admite solo numeros enteros
 el registro debe existir previamente.

DELETE/MATR:
/matr/:id (Elimina un registro de la base de datos referenciado por el id)
(donde id es un nuero entero que referencia a una matricula )
```

# **pasos semana a semana sobre el progreso de TP**

### semana 5 - 6:
### COMANDOS GIT:
```sh
- para saber la rama donde esta parado:
git branch
- para saber el estado del repositorio:
git status
- para pushear en el repositorio en la rama jrobledo:
git push jrobledo 


- clonar el código del repositorio:
git clone https://gitlab.com/pmarcelli/unahur_alumnos_1_2020.git unahur
- crear una rama para trabajar:
git branch jrobledo
- para cambiar de rama:
git checkout jrobledo
- para crear un archivo:
touch readme.md
- para agregar el archivo al repositorio:
git add readme.md
- para agregar todo los archivos al repositorio:
git add .
- para hacer un commit:
git commit -m "agrego readme"
- para pushear en el repositorio en la rama jrobledo:
git push jrobledo
- para traer los cambios del repositorio:
git pull
```


### COMANDOS DEPENDENCIAS:
```sh
- Realizar la instalación de sus dependencias.
npm install

- instalar nodemon:
    Es un wrapper de node, para reiniciar nuestro API Server cada vez que detecte modificaciones. La instalamos como dependencia de desarrollo.

    npm i -D nodemon

    Cada vez que ejecutemos npm start ejecutaremos nodemon en vez de node. Para ello habrá que cambiar el script en el fichero package.json la siguiente linea a la nueva:
    (vieja)
    "scripts": {
      "start": "node ./bin/www" 
    }
    (nueva)
    "scripts": {
      "start": "nodemon ./bin/www" 
    }

    
```
### COMANDOS SEQUELIZE:

```sh
- para instalar sequelize:
npm install sequelize-cli –save

- para crear el modelo(tabla) para luego insertar en la base de datos:
npx sequelize-cli model:generate --name materia --attributes nombre:string,id_carrera:integer

- luego para que impacte la tabla o (modelo) en la base de datos corremos el comando:
npx sequelize db:migrate 

- para crear un seed (datos de prueba):
npx sequelize-cli seed:generate --name demo-materia

- para correr el seed:
npx sequelize-cli db:seed:all

- para correr el seed de forma individual:
npx sequelize-cli db:seed --seed nombre-del-seed

- para lanzar el servidor:
npm start
```

### semana 7:

### COMANDOS SEQUELIZE:
```sh
- crear el modelo alumno:
npx sequelize-cli model:generate --name alumno --attributes nombre:string,apellido:string

- crear el modelo profesor:
npx sequelize-cli model:generate --name profesor --attributes nombre:string,apellido:string

- crear el modelo matricula:
npx sequelize-cli model:generate --name matricula --attributes id_alumno:integer,id_profesor:integer,id_materia:integer,id_carrera:integer

- para que impacte la tabla (modelo) en la base de datos corremos el comando:
npx sequelize db:migrate 

- para lanzar el servidor:
npm start
```

### semana 8:

### COMANDOS SEQUELIZE:
```sh
- crear el modelo profesor que reemplaza al anterior:
npx sequelize-cli model:generate --name profesor --attributes id_materia:integer,nombre:string,apellido:string

- para que impacte la tabla (modelo) en la base de datos corremos el comando (en este caso se borra la tabla anterior y se crea una nueva):
npx sequelize db:migrate

```
### TIPO DE RELACIONES SEQUELIZE:
```sh
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B); // A HasOne B (con la clave foranea en la tabla B)
A.belongsTo(B); // A BelongsTo B (con la clave foranea en A)
A.hasMany(B); // A HasMany B (con la clave foranea en la tabla B)
A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C (usando la tabla C como tabla de unión)

El orden en que se define la asociación es relevante. En otras palabras, el orden importa, para los cuatro casos. En todos los ejemplos anteriores, "A" se llama el modelo fuente y "B" se llama el modelo objetivo . Esta terminología es importante.

las asociaciones A.hasOne(B)  significa que existe una relación uno a uno entre A y B, con la clave FORANEA definida en el modelo de destino ( B).

las asociaciones A.belongsTo(B)  significa que existe una relación uno a uno entre A y B, con la clave FORANEA definida en el modelo fuente ( A).

las asociaciones A.hasMany(B)  significa que existe una relación de uno a muchos entre A y B, con la clave FORANEA definida en el modelo de destino ( B).

Estas tres llamadas harán que Sequelize agregue automáticamente claves foráneas a los modelos apropiados (a menos que ya estén presentes).

las asociaciones A.belongsToMany(B, { through: 'C' })  significa que existe una relación de muchos a muchos entre A y B, usando la tabla C como tabla de unión , que tendrá las claves foráneas ( A_Id y B_Id, por ejemplo). Sequelize creará automáticamente este modelo C. (a menos que ya exista) y defina las claves externas apropiadas en él. 
```
### COMANDOS POST-MAN:
```sh
- hace un get a la tabla carrera que en el codigo esta definida como "app.use('/car', carrerasRouter);" en app.js
GET: http://localhost:3001/car  

- para hacer un post hay que agregar en Body -> raw -> Json el codigo coerrespondiente a los atributos del campo que se quiere agregar.
POST: http://localhost:3001/car 
-en Body -> raw -> Json:
{
    "nombre": "tecnicatura en programacion"
}
- para eliminar un registro se pone la ruta despues una barra y el id del elemneto a eliminar.
DELETE:http://localhost:3001/car/1 

- para hacer un update es en la ruta + el id y hay que agregar en Body -> raw -> Json el dato a modificar en el registro
PUT: http://localhost:3001/car/1 .
-en Body -> raw -> Json:
{
    "nombre": "tecnicatura en informatica" (nuevo nombre)
}
```

### semana 11:
```sh

se creo la carpeta utilidades con el archivo "utilidades.js" que contiene funciones.
Para exportar funciones de un archivo a otro se usa el comando "module.exports = {nombre de la funcion}" al final del archivo.
Para usarlas se importa el archivo con: "const utilidades = require ('../utilidades/utilidades.js');" y se llama a la funcion con: "utilidades.nombreFuncion(parametros);"

Se crearon funcione que se utilizaron para la paginacion.
se implemento la paginacion en alumnos.
Luego de attributes se agrega la paginacion:
offset: utilidades.getOffset(req.query.pagina, req.query limite), //offset es el numero de registros que se salta
limit: utilidades.reqSino(req.query.limite, 10)

```

### semana 12:
```sh
Se agregaron validaciones a los campos de los formularios para que no se ingresen datos erroneos.
por ejemplo:
validate: {
    notEmpty: {
    msg: 'El campo no puede estar vacio'
    },
    isAlpha: {
      args: true,
      msg: 'El campo solo puede contener letras'
    }
}

se cambio el sendStatus(500) por res.json({ error}); en las rutas para que se envie un mensaje de error al postman.

se agrego un console.log en el catch de la ruta POST  para que se vea el error en la consola. 
console.log(` ${error.errors[0].value} ya existe]`);

```
## funcionalidad de registro y login:
```sh
creamos un modelo y una ruta para el usuario.


```
## dependencias para el registro y login:

```sh
npm install bcrypt
npm install jsonwebtoken

```
</h3> 
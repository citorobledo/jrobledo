<!--- 
<div style="background-color:#f612; text-align:left;  padding:40px 15px;">
<h1 style="color:#fff; font-size: 40px; font-weight: 300; margin: 0;">Readme</h1>
-->

<table> <td bgcolor =  #807000 >
# **pasos semana a semana para la realizacion de TP**

## Titulo: TP Estrategias de Persistencia
## Author: Javier Robledo

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
    Es un wrapper de node, para reiniciar nuestro API Server cada vez que detecte modificaciones.

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

Se crearon funcione que se utilizaron para la paginacoion.
se implemento la paginacion en alumnos
luego de attributes se agrega la paginacion:
offset: utilidades.getOffset(req.query.pagina, req.query.limite), //offset es el numero de registros que se salta
limit: utilidades.reqSino(req.query.limite, 10)

```

### semana 12:
```sh
se agregaron validaciones a los campos de los formularios para que no se ingresen datos erroneos.
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
</table> </td>

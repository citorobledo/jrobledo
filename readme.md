# **pasos semana a semana para la realizacion de TP**

## Titulo: TP Persistencia
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



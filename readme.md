# **pasos semana a semana para la realizacion de TP**

## Titulo: TP Persistencia
## Author: Javier Robledo

### semana 7:

### COMANDOS SEQUELIZE:
```sh
- crear el modelo alumno:
npx sequelize-cli model:generate --name alumno --attributes nombre:string, apellido:string

- crear el modelo profesor:
npx sequelize-cli model:generate --name profesor --attributes nombre:string, apellido:string

- crear el modelo matricula:
npx sequelize-cli model:generate --name matricula --attributes id_alumno:integer, id_profesor:integer, id_materia:integer, id_carrera:integer

- para que impacte la tabla (modelo) en la base de datos corremos el comando:
npx sequelize db:migrate 
```
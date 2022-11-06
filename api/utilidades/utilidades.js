//definimos una funcion tipica para validar que un campo no sea nulo
function reqSino  (req, int) {// si no viene la request por parametro, devuelve el valor int
  
  return parseInt(req, 10) || int;//(base 10) 
};
//definimos una funcion flecha para validar que un campo no sea nulo
const getOffset = (req1, req2) => { // esta funcion es para paginar devuelvo la cantidad de registros que quiero saltar
  const pagina = reqSino(req1, 1); 
  const limite = reqSino(req2, 10); 
  
  return (pagina * limite) - limite;
 }



 module.exports = {
  reqSino,
  getOffset
 }

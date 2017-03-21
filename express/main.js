let enviroment = process.env.ENV || 'development'; //Por default, el environment es development
let config     = require(`./config/${enviroment}`); //config con el enviroment development.json

let serverService = require('./services/server').init();//init como funcion anonima de server.js. De esta manera, serverService se convierte en el servidor
let databaseService = require('./services/database').init(config.database); //init como funcion anonima de database.js. config.database={"name" : "hola","port" : 1234}

require('./routes'); //requiere el directorio routes para usar las rutas

/*console.log('environment:');
console.dir(enviroment);
console.log('config:');
console.dir(config);*/

serverService.server.listen(config.PORT); //Servidor iniciado y escuchando en el puerto config. config.PORT="3030"

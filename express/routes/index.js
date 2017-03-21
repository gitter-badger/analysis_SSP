let { app } = require('../services/server'); //app se transforma en el servidor


let homeController = require('../controllers/home'); //homeController se convierte en una funciona anonima index en home.js

app.get('/',homeController.index); //al rootear '/' se dispara la funcion anonima index de homeController
app.get('/listCollections',homeController.listCollections);

app.post('/login',homeController.login);


const Server  = require('http').Server;
const express = require('express');
var bodyParser=require('body-parser');

module.exports = {
  init : function(){
    this.app    = new express();
    this.app.use(bodyParser.urlencoded({extended:false}));
    this.app.use(bodyParser.json());
    this.app.use(function(req,res,next){
    	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
  		next();
    });
    this.server = new Server(this.app)
    /*console.log('server.js this:');
  	console.dir(this);*/
    return this; //retorno del servidor construido. init es el servidor
  }
};

var jwt = require('jsonwebtoken');
var vp=require('./verification_process');
var key=vp.get_key();

exports.session_authenticate=function(req,res,next){
	vp.draw_headers(req);
	vp.draw_body(req);
	var usrlog=req.body;
	req.getConnection(function(error,connection){
		if(error){
			console.log('error in connection:')
			console.log(error);
			res.sendStatus(500);
		}else{
			connection.query('SELECT us_username,us_nombre,us_apellido FROM usuarios WHERE us_username=? AND us_password=?',[usrlog.username,usrlog.password],function(errquery,resquery){
				if(errquery){
					console.log('error in query:');
					console.dir(errquery);
					res.sendStatus(500);
				}else{
					console.log('query successful:');
					console.dir(resquery);
					if(resquery!=''){
						var user = {
							username: resquery[0].us_username,
							name: resquery[0].us_nombre,
							lastname: resquery[0].us_apellido
						}
						process.env.SECRET_KEY = key;
						var _token = jwt.sign(user, process.env.SECRET_KEY);
						res.body={token: _token};
						console.log('----------USER LOGGED----------');
						res.json(res.body);
					}else{
						console.log('----------USER NO LOGGED----------');
						res.json('User no logged');
					}
				}
			});
		}
	});
};


var jwt = require('jsonwebtoken');
var vp = require('./verification_process');
var key=vp.get_key();

exports.session_user=function(req,res,next){
	vp.draw_headers(req);
	var token=req.headers.authorization;
	if(token){
		jwt.verify(token,key,function(errverify,decode){
			console.log('key:'+key);
			if(errverify){
				console.log('error in verify');
				console.dir(errverify);
				res.status(500).json('INTERNAL ERROR');
			}else{
				req.getConnection(function(errconnection,connection){
					if(errconnection){
						console.log('error in connection session_users');
						console.dir(errconnection);
					}else{
						connection.query('SELECT us_username,us_nombre,us_apellido,us_nivelseg FROM usuarios WHERE us_username=?',[decode.username],function(errquery,dataquery){
							if(errquery){
								console.log('error in query session_user');
								console.dir(errquery);
							}else{
								res.status(200).json(dataquery);
							}
						});
					}
				});
			}
		});
	}else{
		res.status(403).json('FORBIDDEN');
	}
};


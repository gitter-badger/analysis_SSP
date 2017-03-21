var jwt = require('jsonwebtoken');


exports.verification_process=function(token,key,req,res){
  if(!token){ return res.status(403).json('FORBIDDEN'); }

  return new Promise( function(resolve, reject){
  });
var result=false; console.log('passed token');
  jwt.verify(token,key,function(errverify,decode){
    if(errverify){
      console.log('error in verify');
      console.dir(errverify);
      res.status(500).json('INTERNAL ERROR');
    }else{
      console.log('passed verify');
      req.getConnection(function(errconnv,connv){
        if(errconnv){
          console.log('error in connection');
          console.dir(errconnv);
        }else{
          console.log('passed connection');
          connv.query('SELECT us_username FROM usuarios WHERE us_username=?',[decode.username],function(eqv,dqv){
            if(eqv){
              console.log('error in query');
              console.dir(eqv);
            }else{
              console.log('passed query');
              if(dqv){
                console.log('AUTHORIZED');
                result=true;
              }else{
                res.status(401).json('UNAUTHORIZED');
              }
            }
          });
        }
      });
    }
  });

  return result;
};

exports.draw_headers=function(request){
	console.log('----------REQUEST HEADERS----------');
	console.dir(request.headers);
	console.log('-----------------------------------');
};

exports.draw_body=function(request){
	console.log('----------REQUEST BODY----------');
	console.dir(request.body);
	console.log('-----------------------------------');
};

exports.get_key=function(){
	return 'test';
}


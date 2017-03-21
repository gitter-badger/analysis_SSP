let { client } = require('../services/database');

module.exports.index=function(req,res,next){
	res.status(300).send('Server works!!');
};

module.exports.login=function(req,res,next){
	client.login(req.body,function(response){
		if(response){
			var fakeToken='sdcfkwpefpcpwmekc';
			return res.json({token:fakeToken});
		}else{
			return res.status(404).send('User no logged. Check console');
		}
	});
};

module.exports.listCollections=function(req,res,next){
	client.listCollections(function(response){
		if(response){
			return res.json(response);
		}else{
			return res.status(500).send('Internal error. Check console');
		}
	});
}
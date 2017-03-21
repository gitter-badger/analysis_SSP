var mongodb=require('mongodb');
var MongoClient=mongodb.MongoClient;
var url='mongodb://localhost:27017/bd_delitos';

module.exports = {
	init : function(config){
		this.client = {
			login: function(data,cb){
				console.dir(data);
				MongoClient.connect(url,function(errconn,db){
					if(errconn){
						console.log('Error in Mongodb connection:');
						console.dir(errconn);
						return cb(false);
					}else{
						console.log('Login connection established');
						var collection=db.collection('usuarios');
						collection.find({$and:[{'username':data.username},{'password':data.password}]}).toArray(function(findErr,findRes){
							if(findErr){
								console.log('Error in find collection:');
								console.dir(findErr);
								return cb(false);

							}else if(findRes.length){
								console.log('User logged');
								return cb(findRes);
							}else{
								console.log('User not found');
								return cb(false);
							}
							db.close();
						});
					}
				});
			},

		    listCollections:function(cb){
		    	MongoClient.connect(url,function(errconn,db){
		    		if(errconn){
		    			console.log('Error in Mongodb connection:');
						console.dir(errconn);
						return cb(false);
		    		}else{
		    			db.listCollections().toArray(function(errColl,collections){
		    				if(errColl){
		    					console.log('Error in list collection names:');
								console.dir(errColl);
								return cb(false);
		    				}else{
		    					return cb(collections);
		    				}
		    				db.close();
		    			});
		    		}
		    	});
		    }
		};
		return this;
	}
};

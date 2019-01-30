var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;
var db_str="mongodb://127.0.0.1:27017/"
var upload=require('./upload')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册
router.post('/regist',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user',(err,coll)=>{
			coll.find({username:req.body.username}).toArray((err,data)=>{
				if(data.length>0){
					res.send('2')
					database.close()
				}else{
					coll.insert(req.body,()=>{
						res.send('1')
						database.close()	
					})
				}
			})
			

		})
	})
})

//登录
router.post('/login',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user',(err,coll)=>{
			coll.find(req.body).toArray((err,data)=>{
				if(data.length>0){
					req.session.name=data[0].username;
					res.send('1')
					database.close()	
				}else{
					res.send('2');
					database.close()
					
				}
			})
		})
	})
})

module.exports = router;

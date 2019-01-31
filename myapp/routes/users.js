var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;
var db_str="mongodb://127.0.0.1:27017"
var upload=require('./upload')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/register",(req,res)=>{
	var data = req.body;
	var username = data.username;
	//查询是否重名
	mongodb.connect(db_str,{ useNewUrlParser: true },(err,db)=>{
		if(err) throw err;
		var dbase = db.db("mydb");
		var cols = dbase.collection("users");
		cols.find({username:username}).toArray((err,result)=>{
			if(result.length != 0){
				res.send("0");
			}else{
				cols.insertOne(data,(err,result)=>{
					res.send("1");
				})
			}
			db.close();
		})
	})
});
//登录接口
router.post("/login",(req,res)=>{
	var data = req.body;
	mongodb.connect(db_str,{ useNewUrlParser: true },(err,db)=>{
		var dbase = db.db("mydb");
		var cols = dbase.collection("users");
		cols.find(data).toArray((err,result)=>{
			if(result.length==0){
				res.send("0");
			}else{
				//存session 默认存在内存里
				//console.log(req.session);
				req.session.username = data.username;
				res.send("1");
			}
		})
		db.close();
	})
})

//注册
/*router.post('/register',(req,res)=>{
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
})*/

module.exports = router;

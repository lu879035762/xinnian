var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;
var db_str="mongodb://127.0.0.1:27017/lpf"
var upload=require('./upload')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




//管理员
router.post('/root',(req,res,next)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('root',(err,coll)=>{
			console.log(req.body)
			coll.find({"username":req.body.username}).toArray((err,data)=>{
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



//删除用户
router.post('/deleteuser',(req,res)=>{
	var 	id=ObjectId(req.body.id);
	console.log(req.body.id)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user',(err,coll)=>{
			coll.remove({_id:id},(err,data)=>{
				console.log(data)
				res.send('1')
				database.close();
			})
		})
	})
})







//注册
router.post('/register',(req,res)=>{
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

//作品
router.post('/zuopin',(req,res)=>{
	
})


//文章
router.post('/wenzhang',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		console.log(req.body)
		database.collection('wenzhang',(err,coll)=>{
			coll.insert(req.body,()=>{
				res.send('1')
				database.close()
			})
		})
	})
})

//书籍
router.post('/book',(req,res)=>{
	console.log(req.body)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('book',(err,coll)=>{
			coll.insert(req.body,()=>{
				res.send('1')
				database.close()
			})
		})
	})
})



//删除留言
router.post('/deleteTravel',(req,res)=>{
	var 	id=ObjectId(req.body.id);
	console.log(req.body.id)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('wenzhang',(err,coll)=>{
		
			coll.remove({_id:id},(err,data)=>{
				res.send('1')
				database.close();
			})
		})
	})
})


//删除书籍
router.post('/deletebook',(req,res)=>{
	var 	id=ObjectId(req.body.id);
	console.log(req.body.id)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('book',(err,coll)=>{
		
			coll.remove({_id:id},(err,data)=>{
				res.send('1')
				database.close();
			})
		})
	})
})


//查找书籍
router.post('/findbook',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('book',(err,coll)=>{
			//console.log(req.body.titles)
			coll.find({'titles':eval("/"+req.body.titles+"/i")}).toArray((err,data)=>{
				console.log(data);
				if(data.length>0){
						res.send(data)
					database.close()	
				}else{
					res.send('2');
					database.close()
				}
				
			})
		})
	})
})






//修改密码
router.post('/updatePwd',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user',(err,coll)=>{
			console.log(req.body.username,req.body.oldpass)
			coll.find({"username":req.body.username,"pass":req.body.oldpass}).toArray((err,data)=>{
				if(data.length>0){
					console.log(data);
					req.session.name=data[0].username;
					req.session.password=data[0].pass;
					
					coll.update({username:req.session.name},{$set:{pass:req.body.newpass}},()=>{
							//console.log(req.body)
						res.send('1')
					database.close()	
					})
				}else{
					res.send('2');
					database.close()
				}
				
			})
		})
	})
})

//富文本图片
router.post('/uploadImg',(req,res)=>{
	upload(req,res)
})




module.exports = router;

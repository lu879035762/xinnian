var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://127.0.0.1:27017"
var ObjectId=require('mongodb').ObjectId;
var async=require('async')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//登陆
router.get("/login",(req,res)=>{
	
	res.render("login");
	
})
//注册
router.get("/register",(req,res)=>{
	res.render("register");
})

//主页
router.get('/',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('wenzhang',(err,coll)=>{
			
//			页码
			var pageNo=req.query.pageNo;
			pageNo=pageNo?pageNo:1;
//			每页展示的条数
			var size=3;
//			总页数
			var page=0;
//			总条数
			var totals=0;
			
			async.series([
				function(callback){
					coll.find({}).toArray((err,data)=>{
						
						totals=data.length;
						page=Math.ceil(totals/size)
//						上一页下一页
						pageNo=pageNo<1?1:pageNo;
						pageNo=pageNo>page?page:pageNo;	
					})
					callback(null,'')
				},
				function(callback){
					coll.find({}).sort({_id:-1}).limit(size).skip((pageNo-1)*size).toArray((err,data)=>{
						callback(null,data)
					})	
				}
			],function(err,data){
//				data  [ '',data ]
				res.render('index',{data:data[1],pageNo:pageNo,page:page,totals:totals,name: req.session.name})
				database.close()
			})
		})
	})
})

//管理员
router.get('/root',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user',(err,coll)=>{
			
//			页码
			var pageNo=req.query.pageNo;
			pageNo=pageNo?pageNo:1;
//			每页展示的条数
			var size=3;
//			总页数
			var page=0;
//			总条数
			var totals=0;
			
			async.series([
				function(callback){
					coll.find({}).toArray((err,data)=>{
						
						totals=data.length;
						page=Math.ceil(totals/size)
//						上一页下一页
						pageNo=pageNo<1?1:pageNo;
						pageNo=pageNo>page?page:pageNo;	
					})
					callback(null,'')
				},
				function(callback){
					coll.find({}).sort({_id:-1}).limit(size).skip((pageNo-1)*size).toArray((err,data)=>{
						callback(null,data)
					})	
				}
			],function(err,data){
//				data  [ '',data ]
				res.render('root',{data:data[1],pageNo:pageNo,page:page,totals:totals,name: req.session.name})
				database.close()
			})
		})
	})
})


module.exports = router;

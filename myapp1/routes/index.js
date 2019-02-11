var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://127.0.0.1:27017/lpf"
var ObjectId=require('mongodb').ObjectId;
var async=require('async')
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: '<span>Express</span>',name: req.session.name});
});*/


/*router.get('/', function(req, res, next) {
	mongodb.connect(db_str,(err,database)=>{
		database.collection('wenzhang',(err,coll)=>{
			coll.find({}).sort({_id:-1}).toArray((err,data)=>{
				res.render('index',{name: req.session.name,data:data})
				console.log(data)
				database.close()
			})
		})
	})
});*/
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



//修改密码
router.get('/updatePwd', (req, res, next)=>{
	res.render('updatePwd',{name: req.session.name})
});




//登陆
router.get('/login',(req,res)=>{
	
	res.render('login',{})
	
})





//书籍
router.get('/book',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('book',(err,coll)=>{
			
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
				res.render('book',{data:data[1],pageNo:pageNo,page:page,totals:totals,name: req.session.name})
				database.close()
			})
		})
	})
	
})














router.get('/design',(req,res)=>{
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
			
			
			
			
//			coll.find({})
//			
//			coll.find({}).sort().limit().skip()
			
			
//			coll.find({}).sort({_id:-1}).toArray((err,data)=>{
//				res.render('wenzhang',{data:data})
//				database.close()
//			})
		})
	})
})


















//注册
router.get('/register',(req,res)=>{
	res.render('register',{})
})





//退出
router.get('/relogin',(req,res)=>{
	req.session.destroy((err)=>{
		if(err){
			
		}else{
			res.redirect('/')
		}
	})
})

//作品
router.get('/zuopin', (req, res, next)=>{
	res.render('zuopin',{name: req.session.name})
});






//文章
router.get('/wenzhang',(req,res)=>{
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
				res.render('wenzhang',{data:data[1],pageNo:pageNo,page:page,totals:totals,name: req.session.name})
				database.close()
			})
			
			
			
			
//			coll.find({})
//			
//			coll.find({}).sort().limit().skip()
			
			
//			coll.find({}).sort({_id:-1}).toArray((err,data)=>{
//				res.render('wenzhang',{data:data})
//				database.close()
//			})
		})
	})
})

//详情
router.get('/detail',(req,res)=>{
	
	console.log(req.query)
	var id=ObjectId(req.query.id);
	
	mongodb.connect(db_str,(err,database)=>{
		database.collection('wenzhang',(err,coll)=>{
			coll.find({_id:id}).toArray((err,data)=>{
				res.render('detail',{detail:data[0].con})
				database.close()
			})
		})
	})
	
	
	

})




module.exports = router;

var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://127.0.0.1:27017/"
var ObjectId=require('mongodb').ObjectId;
var async=require('async')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//注册
router.get('/regist',(req,res)=>{
	res.render('regist',{})
})

//登陆
router.get('/login',(req,res)=>{
	
	res.render('login',{})
	
})

module.exports = router;

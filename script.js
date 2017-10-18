var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//database name is users
//collection name is credentials

var url = 'mongodb://localhost:27017/users';

//api to login. Parameters are username and password.
app.get('/login', function (req, res) {
	MongoClient.connect(url,function(err,db){
		assert.equal(err,null);
		console.log("connected to db");
		var query = {username:req.query.username, password:req.query.password};
  		db.collection("credentials").find(query).toArray(function(err, result) {
    	if (err) throw err;
    	var count = 0;
    	for (k in result)
    	{
    		count++;
    	}
    	if(count>0)
    	{
    		res.send("Successfull login");
    	}
    	else
    	{
    		res.send("Wrong credentials");
    	}
    	db.close();
  		});;
		
	});   
})

//api to sign up a new user. Parameters are name, username and password.
app.post('/signup', function (req, res) {

	if(req.query.name=="" || req.query.username=="" || req.query.password=="" || req.query.name==null || req.query.username==null || req.query.password==null)
	{
		res.send("All the parameters : name, username and password must be filled");
	}
	else
	{
		MongoClient.connect(url,function(err,db){
		assert.equal(err,null);
		console.log("connected to db");
		var query = {name:req.query.name, username:req.query.username, password:req.query.password};
  		db.collection("credentials").find({username:req.query.username}).toArray(function(err, result) {
    	if (err) throw err;
    	var count = 0;
    	for (k in result)
    	{
    		count++;
    	}
    	if(count>0)
    	{
    		res.send("username already exists");
    	}
    	else
    	{
    		db.collection("credentials").insert(query); 
    		res.send("Successfully signed up");
    	}
    	db.close();
  		});;
		
	});
	}
});		

//server listens at port 1234
app.listen(1234,function(){
	console.log("Server started");
});
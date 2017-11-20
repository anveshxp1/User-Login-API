var express = require('express');
var app = express();
var mongoose = require('mongoose');
var assert = require('assert');

mongoose.connect('mongodb://localhost:27017/users');

var Credentials = require('./schema.js');
//database name is users
//collection name is credentials

var url = 'mongodb://localhost:27017/users';

//api to login. Parameters are username and password.
app.get('/login',(req,res)=>{
		var query = {username:req.query.username, password:req.query.password};
  		Credentials.find((query),(err, result)=>{
    	if (err) throw err;
    	var count = 0;
    	for (k in result)
    	{
    		count++;
    	}
    	if(count>0)
    	{
    		res.send({
    			message: 'Successfull login'
    		});
    	}
    	else
    	{
    		res.send({
    			message: 'Wrong credentials'
    		});
    	}
  		});
})

//api to sign up a new user. Parameters are name, username and password.
app.post('/signup',(req,res)=>{
		var query = {name:req.query.name, username:req.query.username, password:req.query.password};
  		Credentials.find(({username:req.query.username}),(err,result)=>{
    	if (err) throw err;
    		var newCredentials = Credentials({
    			name: req.query.name,
    			username:  req.query.username,
    			password: req.query.password
    		})
    		newCredentials.save().then((doc)=>{
    			res.send({
    				message: 'Successfully signed up'
    			});
    		},(e)=>{
    			res.send({
    				message: e.message
    			});
    		})
  		});		
});		

//server listens at port 1234
app.listen(1234,()=>{
	console.log("Server started");
});

module.exports = {app};
const request = require('supertest');
var app = require('./script.js').app;
var mongoose = require('mongoose');
var expect = require('expect');
var Credentials = require('./schema.js');

Credentials.remove({username:'charan'},(err)=>{});

it('Should validate successfull sign in', (done) =>{
			request(app)
				.post('/signup?name=charan&username=charan&password=reddy')
				.expect(200)
				.expect((res)=>{
					expect(res.body).toInclude({
						message: 'Successfully signed up'
					});
				})	
				.end(done);
});	

it('Should validate that username is required to sign up', (done) =>{
			request(app)
				.post('/signup?name=anvesh&username=&password=reddy')
				.expect(200)
				.expect((res)=>{
					expect(res.body).toInclude({
						message: 'credentials validation failed: username: Path `username` is required.'
					});
				})	
				.end(done);
});

it('Should validate that name is required to sign up', (done) =>{
			request(app)
				.post('/signup?name=&username=anvesh&password=reddy')
				.expect(200)
				.expect((res)=>{
					expect(res.body).toInclude({
						message: 'credentials validation failed: name: Path `name` is required.'
					});
				})	
				.end(done);
});

it('Should validate that password is required to sign up', (done) =>{
			request(app)
				.post('/signup?name=anvesh&username=anvesh&password=')
				.expect(200)
				.expect((res)=>{
					expect(res.body).toInclude({
						message: 'credentials validation failed: password: Path `password` is required.'
					});
				})	
				.end(done);
});

it('Should validate that username is unique', (done) =>{
			request(app)
				.post('/signup?name=charan&username=charan&password=reddy')
				.expect(200)
				.expect((res)=>{
					expect(res.body).toInclude({
						message: 'E11000 duplicate key error collection: users.credentials index: username_1 dup key: { : \"charan\" }'
					});
				})	
				.end(done);
});

it('Should validate successfull login', (done) =>{
			request(app)
				.get('/login?username=charan&password=reddy')
				.expect(200)
				.expect((res)=>{
					expect(res.body).toInclude({
						message: 'Successfull login'
					});
				})
				.end(done);
});

it('Should validate wrong credentials', (done) =>{
			request(app)
				.get('/login?username=fgf&password=fgf')
				.expect(200)
				.expect((res)=>{
					expect(res.body).toInclude({
						message: 'Wrong credentials'
					});
				})	
				.end(done);
});
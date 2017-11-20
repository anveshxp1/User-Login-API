var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var credentialsSchema =new Schema({
	name : {
		type : String,
		required : true
	},
	username : {
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true
	}
});

var Credentials = mongoose.model('credentials',credentialsSchema);
module.exports = Credentials;
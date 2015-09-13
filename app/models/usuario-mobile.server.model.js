'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * UsuarioMobileSchema
 */
var UsuarioMobileSchema = new Schema({
	name: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		default: '',
		unique: 'Já existe um email cadastrado',
		match: [/.+\@.+\..+/, 'Digite um email válido']
	},
  	ativo: { 
  		type: Boolean, 
  		default: null
  	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Digite uma senha mais forte']
	},
	salt: {
		type: String
	},
	updated: {
		type: Date,
		default: Date.now
	},
	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Hook a pre save method to hash the password
 */
UsuarioMobileSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UsuarioMobileSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UsuarioMobileSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

var user = mongoose.model('UsuarioMobile', UsuarioMobileSchema);

// user.schema.path('email').validate(function (value, respond) {
// 	console.log(value);
// 	console.log(respond);
//     user.findOne({ email: value }, function (err, user) {
//         if(user) respond(false);
//         respond(true);
//     });                                                                                                                                                  
// }, 'Esse email já está registrado em nosso sistema');
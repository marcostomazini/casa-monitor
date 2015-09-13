'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	TokenStrategy = require('passport-http-bearer').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	// Use local strategy
	passport.use(new TokenStrategy(
		function(token, done) {
			User.findOne({
				password: token
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Token incorreto',
						type: 'error'
					});
				}				

				return done(null, user);
			});
		}
	));
};
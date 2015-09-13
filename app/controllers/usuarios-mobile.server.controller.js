'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	UsuarioMobile = mongoose.model('UsuarioMobile'),
	_ = require('lodash');

/**
 * Create a usuarioMobile
 */
exports.create = function(req, res) {
	var usuarioMobile = new UsuarioMobile(req.body);

	usuarioMobile.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			usuarioMobile.password = undefined;
			usuarioMobile.salt = undefined;
			res.json(usuarioMobile);
		}
	});
};

/**
 * Show the current usuarioMobile
 */
exports.read = function(req, res) {
	res.json(req.usuarioMobile);
};

/**
 * Update a usuarioMobile
 */
exports.update = function(req, res) {
	var usuarioMobile = req.usuarioMobile;

	usuarioMobile = _.extend(usuarioMobile, req.body);

	usuarioMobile.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(usuarioMobile);
		}
	});
};

/**
 * Delete an usuarioMobile
 */
exports.delete = function(req, res) {
	var usuarioMobile = req.usuarioMobile;

	usuarioMobile.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(usuarioMobile);
		}
	});
};

/**
 * List of usuarioMobiles
 */
exports.list = function(req, res) {
	UsuarioMobile.find({}, '-salt -password').sort('-created').exec(function(err, usuariosMobile) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(usuariosMobile);
		}
	});
};

/**
 * usuarioMobile middleware
 */
exports.usuarioMobileByID = function(req, res, next, id) {
	UsuarioMobile.findById(id).populate('user', 'displayName').exec(function(err, usuarioMobile) {
		if (err) return next(err);
		if (!usuarioMobile) return next(new Error('Failed to load usuarioMobile ' + id));
		req.usuarioMobile = usuarioMobile;
		next();
	});
};

/**
 * usuarioMobile authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	// if (req.article.user.id !== req.user.id) {
	// 	return res.status(403).send({
	// 		message: 'User is not authorized'
	// 	});
	// }
	next();
};
'use strict';

module.exports = {
	db: 'mongodb://localhost/unimarketing-dev',
	app: {
		title: 'UniMarketing - Development Environment'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '64358772177-lqtq513bcp3kuve4rqn91gvqdrrbefel.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'LWyL8-_RDOsyfm9BeMOI3BDj',
		callbackURL: '/auth/google/callback'
	}	
};

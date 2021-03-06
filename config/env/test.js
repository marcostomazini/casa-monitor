'use strict';

module.exports = {
	db: 'mongodb://localhost/angle-test',
	port: 3001,
	app: {
		title: 'Angle - Test Environment'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	}
};

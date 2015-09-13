'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/unimarketing',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.min.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-route/angular-route.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/ngstorage/ngStorage.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-translate/angular-translate.js',
				'public/lib/angular-translate-loader-url/angular-translate-loader-url.js',
				'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
				'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
				'public/lib/oclazyload/dist/ocLazyLoad.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-loading-bar/build/loading-bar.js',
				'public/lib/jquery.browser/dist/jquery.browser.min.js',
				'public/lib/underscore/underscore-min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	}
};

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('UsuariosSistema', ['$resource',
	function($resource) {
		return $resource('api/usuarios-sistema/:usuarioSistemaId', {
			usuarioSistemaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('usuarios-mobile').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Usuários Mobile', 'usuarios-mobile', 'dropdown', '/usuarios-mobile(/.*)?', false, null, 20, 'icon-user');
		Menus.addSubMenuItem('sidebar', 'usuarios-mobile', 'Listar usuários', 'usuarios-mobile');
	}
]);
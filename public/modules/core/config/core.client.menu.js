(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus){
      // Add default menu entry
      Menus.addMenuItem('sidebar', 'Inicio', 'home', null, '/home', true, null, null, 'icon-home');
    }

})();
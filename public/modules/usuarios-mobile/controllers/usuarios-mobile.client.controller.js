'use strict';

angular.module('usuarios-mobile').controller('UsuarioMobileController', [
	'$scope', 
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 'UsuariosMobile', 
	'DTOptionsBuilder', 
	'DTColumnDefBuilder', 
	'editableOptions', 
	'editableThemes',
	'SweetAlert',
	'toaster',
	function($scope, 
		$interval,
		$stateParams, 
		$location, 
		Authentication, 
		UsuariosMobile, 
		DTOptionsBuilder, 
		DTColumnDefBuilder,
		editableOptions, 
		editableThemes,
		SweetAlert,
		toaster) {
		$scope.authentication = Authentication;

		this.dtOptions = DTOptionsBuilder
		.newOptions()
	    .withPaginationType('full_numbers')
	    .withOption('bLengthChange', false)
	    .withOption('bInfo', false)
	    .withBootstrap();
	
		this.dtColumnDefs = [
			DTColumnDefBuilder
				.newColumnDef(0)
				.withOption('bSearchable', false)
				.notVisible()
				.notSortable(),
	        DTColumnDefBuilder
	        	.newColumnDef(1)
	        	.notSortable()
		];	

		$scope.urlBase = '/#!/usuarios-mobile';

		editableOptions.theme = 'bs3';
		editableThemes.bs3.inputClass = 'input-sm';

		// Context
		$scope.authentication = Authentication;
		$scope.usuariosMobile = UsuariosMobile.query();

		$scope.addItem = function(item) {
			var novoUsuario = {
				name: null,
				email: null
			};
			$scope.usuariosMobile.unshift(novoUsuario);			
		};

		$scope.editItem = function(item) {
			$scope.editEmail.$show();
		};

		$scope.saveItem = function(item) {
			console.log(item);
		};		

		$interval(function() {
        	toaster.pop('info', 'Nova Sincronização', 'Pré-Inscrição Recebida');
		}, 20000);

		$scope.deleteConfirm = function(index) {			
			SweetAlert.swal({   
				title: 'Você tem certeza?',   
				text: 'Após deletado não vai ser mais possível acessar o registro!',   
				type: 'warning',   
				showCancelButton: true,   
				confirmButtonColor: '#DD6B55',   
				confirmButtonText: 'Sim',   
				cancelButtonText: 'Não',
				closeOnConfirm: false,   
				closeOnCancel: false 
			}, function(isConfirm){  
				if (isConfirm) {
					var usuarioMobile = $scope.usuariosMobile[index];
					if (usuarioMobile) {							
						usuarioMobile.$remove( function (response) {
							if (response) {
								$scope.usuariosMobile = _.without($scope.usuariosMobile, usuarioMobile);

								SweetAlert.swal('Deletado!', 'O registro foi deletado.', 'success');
							}
						}, function(errorResponse) {
							$scope.error = errorResponse.data.message;
							SweetAlert.swal('Erro!', errorResponse.data.message, errorResponse.data.type);
						});
					}

				} else {     
					SweetAlert.swal('Cancelado', 'O registro não foi removido :)', 'error');   
				} 
            });
		};
	}
]);
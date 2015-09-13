'use strict';

angular.module('users').controller('UsuarioSistemaController', ['$scope', '$stateParams', '$location', 
	'Authentication', 'UsuariosSistema', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $stateParams, $location, Authentication, UsuariosSistema, DTOptionsBuilder, DTColumnDefBuilder) {
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

		$scope.urlBase = '/#!/usuarios-sistema';

		// Context
		$scope.authentication = Authentication;
		$scope.usuariosMobile = UsuariosSistema.query();

		$scope.deleteConfirm = function(index) {
			noty({
				modal: true,
		        text: 'Tem certeza que deseja deletar o registro?', 
		        buttons: [
		            { addClass: 'btn btn-primary', text: 'Sim', onClick: function($noty) {
		                    $noty.close();
		                    var caixa = $scope.caixas[index];

							if (caixa) {							
								caixa.$remove( function (response) {
									if (response) {
										$scope.caixas = _.without($scope.caixas, caixa);

										noty({
										    text: response.message,
										    type: response.type
										});
									}
								}, function(errorResponse) {
									$scope.error = errorResponse.data.message;
									noty({
									    text: errorResponse.data.message,
									    type: errorResponse.data.type
									});
								});
							}
		                }
		            },
		            { 
		                addClass: 'btn btn-warning', text: 'Não', onClick: function($noty) {
		                    $noty.close();
		                }
		            }
		        ]
		    }); 
		};
	}
]);

console.log('main-controller.js');

class MainController {

    /* @ngInject */
    constructor($scope) {
	this.$scope = $scope;
	$scope.carsten = 'Carsten jag älskar dig.';
    }


}

export { MainController }


export class MainController {

    /* @ngInject */
    constructor($scope, $interval, MainService, StatesProvider) {
	this.$scope = $scope;
	$scope.carsten = MainService.greet();
	$scope.statePrefix = StatesProvider.getPrefix();
	$scope.state = StatesProvider.getNextState();

	$interval(() => {
	    $scope.state = StatesProvider.getNextState();
	}, 1000, 10);	
    }


}

myApp.controller('inventController', function($scope, $route, $routeParams, $http){

	$scope.getinventory = function(){
		$http.get('/api/inventory/').then(function(response){
			$scope.inventory = response.data;
		});
	};

    $scope.addinventory = function(){
        $http.post('/api/inventory/', $scope.inventory).then(function(){
            window.location.href = '/#/inventory';
        });
    };

    $scope.showinventory = function(){
        var id = $routeParams.id;
        $http.get('/api/inventory/' + id).then(function(response){
            $scope.inventory = response.data;
        });
    };

	$scope.updateinventory = function(){
		var id = $routeParams.id;
		$http.put('/api/inventory/' + id, $scope.inventory).then(function(){
			window.location.href = '/#/inventory';
		});
	};
	
	$scope.deleteinventory = function(id){
		$http.delete('/api/inventory/' + id).then(function(){
			$route.reload();
		});
	};
});

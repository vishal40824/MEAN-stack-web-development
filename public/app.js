var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl:'templates/welcome.html',
			controller:'inventController'
		})
		.when('/inventory', {
			templateUrl:'templates/list.html',
			controller:'inventController'
		})
		.when('/inventory/add', {
			templateUrl:'templates/add.html',
			controller:'inventController'
		})
        .when('/inventory/:id/show', {
            templateUrl:'templates/show.html',
            controller:'inventController'
        })
        .when('/inventory/:id/edit', {
			templateUrl:'templates/edit.html',
			controller:'inventController'
		})
		.otherwise({
			redirectTo: '/'
		});
});

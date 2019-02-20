(function () {
    "use strict";

    angular.module("app", ['ui.bootstrap','ui.router']); //set the module
   
    
angular.module("app")
.config(["$stateProvider","$urlRouterProvider",function ($stateProviderInstance,$urlRouterProvider) {
    
    $urlRouterProvider.otherwise("home.html");
    $stateProviderInstance
    .state('login', {
      url: "/login.html",
      templateUrl: "login.html",
      controller:"LoginController as login"
    })
    
    .state('home', {
      url: "/home.html",
      templateUrl: "home.html"
    })
    .state('welcome', {
      url: "/welcome.html",
      templateUrl: "welcome.html"
    })
    ;
    
    
}]);

angular.module("app")
.controller("RootCtrl",RootCtrl);

RootCtrl.$inject = ["$scope","$state"];

function RootCtrl($scope, $state){
    
    $scope.gotoHome = function(){
        $state.go('home');
    };
    
    $scope.gotologin = function(){
         $state.go('login');
    };
    
    $scope.gotowelcome =function(){
         $state.go('welcome');
    };
}

})();

   
   
   
  


(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', Logincontrol);

    Logincontrol.$inject = ['$state','LoginDataFactory'];

    function Logincontrol($state,LoginDataFactory) {
     var vm = this;
     vm.info={};
     vm.credentials = {};
     vm.userinfo = [];
     vm.logininfo = logininfo;     
    
     function logininfo(info){
        vm.userinfo = angular.copy(info);
        LoginDataFactory.LoginService(vm.userinfo)
        .then(function (resp){
           console.log(resp);
            $state.go('welcome'); 
        },function (rej){
          console.log(rej);
        });

    }
    }

})();



(function () {
    'use strict';

    angular
        .module('app')
        .factory('LoginDataFactory', LoginDataFactory);

    LoginDataFactory.$inject = ["$http", "$q",];

    function LoginDataFactory($http, $q) {

        var serviceBase = {};
        //API URL Constants
        serviceBase.getLogin = "URl";
      
        var LoginDataFactory = {
            LoginService: LoginService
        };

        return LoginDataFactory;

       function LoginService(data) {
            return $http.post(serviceBase.getLogin, data)
			.then(function (response) {
			    return response.data;
			}, function (error) {
			    return error;
			});
        }

    };
})();



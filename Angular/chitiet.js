var app = angular.module('AppBanHang', []);
app.controller("Chitiet", function ($scope, $http) {
    $scope.mypham;  
    $scope.LoadMyPhambyID = function () { 
		var key = 'id';
		var mamp = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/MyPhamControllers/get-mypham-id/'+ mamp,
        }).then(function (response) { 
            $scope.mypham = response.data;
        });
    };  
    $scope.LoadMyPhambyID()
});
var app = angular.module('AppBanHang', []);
app.controller("Index", function ($scope, $http) {

    $scope.listDM;
    $scope.page = 1;
    $scope.pageSize = 10;

    $scope.LoadLoaiMP = function () {
        $http({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
              page: $scope.page,
              pageSize: $scope.pageSize,
            },
            url: 'http://localhost:57708/api/LoaiMP/search-loaimp',
          }).then(
            function (response) {
              $scope.listDM = response.data.data;
            },
            function (error) {
              console.error('Lỗi khi tải LoaiMP:', error);
            }
          );
    };
    $scope.LoadLoaiMP();

});
var _user = JSON.parse(localStorage.getItem("user"));
if (!_user) {
    window.location.href = "http://127.0.0.1:5503/Admin/login.html";
}

var app = angular.module('AppAdmin', []);
app.controller("inHDN", function ($scope, $http, $timeout) {
    //-----------------------------IN HÓA ĐƠN NHẬP--------------------------------
    $scope.maHDN;
    $scope.listBill;
    $scope.detailBill = [];
    $scope.getDetailBill = function() {
        var key = 'id';
		var maHDN = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);
        $http({
        method: "GET",
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        url: current_url_ad + '/api/HoaDonNhapControllers/get-hoadonnhap-id/'+ maHDN,
        }).then(function (response) {
        $scope.listBill = response.data;
        $scope.detailBill = $scope.listBill.list_json_chitiethoadonnhap;
        $scope.maHDN = maHDN;
        });
    }
    $scope.getDetailBill();

    $scope.inHoaDonNhap = function () {
        $timeout(function () {
            window.print();
        }, 2000);
    };
});
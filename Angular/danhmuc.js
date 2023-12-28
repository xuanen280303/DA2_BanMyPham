var app = angular.module('AppBanHang', []);
app.controller('TrangChu', function($scope, $http) {
    //Lấy tên loại mỹ phẩm đổ lên danh mục
    $scope.listDM;
    var key = 'id';
    var maloai = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);
    $scope.GetDanhMuc = function () {     
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10},
            url: current_url + '/api/LoaiMPControllers/search-loaimp',
        }).then(function (response) {  
            $scope.listDM = response.data.data;  
        });
    };   
	$scope.GetDanhMuc();

    //Ấn vào từng danh mục sẽ đổ ra mỹ phẩm tương ứng
    $scope.pagedm = 1;
    $scope.pageSizedm = 10; 
    $scope.listGetDM;
    $scope.GetMaLoaitheoDanhMuc = function () {     
        $http({
            method: 'POST',
            data: { page: $scope.pagedm, pageSize: $scope.pageSizedm, maloai_mp:maloai},
            url: current_url + '/api/MyPhamControllers/search-loaimypham',
        }).then(function (response) {  
            $scope.listGetDM = response.data.data;  
        });
    };   
	$scope.GetMaLoaitheoDanhMuc();
});
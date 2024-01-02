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
            url: current_url + '/api/LoaiMP-User/search-loaimp',
        }).then(function (response) {  
            $scope.listDM = response.data.data;  
        });
    };   
	$scope.GetDanhMuc();

    $scope.host = current_url_img;
    //Ấn vào từng danh mục sẽ đổ ra mỹ phẩm tương ứng
    $scope.pagedm = 1;
    $scope.pageSizedm = 10; 
    $scope.listGetDM;
    $scope.GetMaLoaitheoDanhMuc = function () {     
        $http({
            method: 'POST',
            data: { page: $scope.pagedm, pageSize: $scope.pageSizedm, maloai_mp:maloai},
            url: current_url + '/api/MyPham-User/search-loaimypham',
        }).then(function (response) {  
            $scope.listGetDM = response.data.data;  
        });
    };   
	$scope.GetMaLoaitheoDanhMuc();

    // $scope.host = current_url_img;
    // document.getElementById('btnSearch').addEventListener('click', function() {
    //     $scope.listMP;
    //     $scope.page = 1;
    //     $scope.GetMyPham = function () {
    //         $http({
    //             method: 'POST',
    //             data: {
    //                 page: $scope.page,
    //                 pageSize: 20,
    //                 ten_mp: $scope.tenmp,
    //                 mota_mp: $scope.motamp
    //             },
    //             url: current_url_ad + '/api/MyPham-User/search-mypham',
    //         }).then(function (response) {
    //             $scope.listMP = response.data.data;
    //         });
    //     };
    //     $scope.GetMyPham();
    // });
});

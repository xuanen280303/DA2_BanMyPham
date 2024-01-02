var app = angular.module('AppBanHang', []);
app.controller("ChiTietMyPham", function ($scope, $http) {
    $scope.addToCart = function (product) {
        if (typeof(Storage) !== "undefined") {
            var cartMyPham = JSON.parse(localStorage.getItem('cart')) || [];
            var existingProduct = cartMyPham .find(item => item.maMP === product.maMP);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cartMyPham .push({
                    maMP: product.maMP,
                    tenMP: product.tenMP,
                    anhDaiDien: product.anhDaiDien,
                    giaMoi: product.giaMoi,
                    giaCu: product.giaCu,
                    quantity: 1 
                });
            }
            localStorage.setItem('cart', JSON.stringify(cartMyPham ));
            alert('Đã thêm thành công mỹ phẩm vào giỏ hàng!');
        } else {
            console.error('Local storage không được hỗ trợ');
        }
    };

    $scope.host = current_url_img;
    $scope.mypham;  
    $scope.LoadMyPhambyID = function () { 
		var key = 'id';
		var mamp = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/MyPham-User/get-mypham-id/'+ mamp,
        }).then(function (response) { 
            $scope.mypham = response.data;
        });
    };  
    $scope.LoadMyPhambyID()
});
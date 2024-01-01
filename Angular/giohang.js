var app = angular.module('AppBanHang', []);
app.controller("GioHang", function ($scope, $http) {
    $scope.host = current_url_img;
    // Hàm lấy dữ liệu giỏ hàng từ localStorage
    $scope.getCartMyPham = function () {
        if (typeof (Storage) !== "undefined") {
            var cartMyPham  = JSON.parse(localStorage.getItem('cart')) || [];
            $scope.cartMyPham = cartMyPham ;
            console.log($scope.cartMyPham );
        } else {
            console.error('Local storage không được hỗ trợ');
        }
    };
    $scope.getCartMyPham ();

    // Hàm tính thành tiền cho mỗi sản phẩm
    $scope.ThanhTien = function (product) {
        return product.giaMoi * product.quantity;
    };
    
    //Tính tổng tiền hoá đơn
    $scope.TongTienHoaDon = function () {
        var totalPrice = 0;
        // Lặp qua danh sách sản phẩm trong giỏ hàng và tính tổng giá trị
        for (var i = 0; i < $scope.cartMyPham .length; i++) {
            totalPrice += $scope.cartMyPham [i].giaMoi * $scope.cartMyPham[i].quantity;
        }
        return totalPrice;
    };

    // Hàm hiển thị xác nhận trước khi xoá
    $scope.XoaMP = function (product) {
        var xoa = confirm("Bạn có chắc muốn xoá mỹ phẩm này không?");
        if (xoa) {
            var index = $scope.cartMyPham.indexOf(product);
            if (index !== -1) {
                $scope.cartMyPham.splice(index, 1);
                $scope.saveCart();
            }
        }
    };

    $scope.clearCart = function () {
        var xacnhan = confirm("Bạn có chắc muốn xóa toàn bộ mỹ phẩm khỏi giỏ hàng?");
        if (xacnhan) {
            localStorage.removeItem('cart');
            $scope.cartMyPham = [];
        } else {
            console.error('Local storage không được hỗ trợ');
        }
    };

    // Hàm lưu giỏ hàng vào localStorage
    $scope.saveCart = function () {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem('cart', JSON.stringify($scope.cartMyPham));
        }
    };
});



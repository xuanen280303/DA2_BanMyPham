var app = angular.module('AppBanHang', []);

app.controller("DatHang", function ($scope, $http, $window) {
    $scope.host = current_url_img;

    // Hàm lấy dữ liệu giỏ hàng từ localStorage
    $scope.getCartMyPham = function () {
        if (typeof (Storage) !== "undefined") {
            var cartMyPham = JSON.parse(localStorage.getItem('cart')) || [];
            $scope.cartMyPham = cartMyPham;
            console.log($scope.cartMyPham);
        } else {
            console.error('Local storage không được hỗ trợ');
        }
    };
    $scope.getCartMyPham();

    // Hàm tính thành tiền cho mỗi sản phẩm
    $scope.ThanhTien = function (product) {
        return product.giaMoi * product.quantity;
    };

    //Tính tổng tiền hoá đơn
    $scope.TongTienHoaDon = function () {
        var totalPrice = 0;
        // Lặp qua danh sách sản phẩm trong giỏ hàng và tính tổng giá trị
        for (var i = 0; i < $scope.cartMyPham.length; i++) {
            totalPrice += $scope.cartMyPham[i].giaMoi * $scope.cartMyPham[i].quantity;
        }
        return totalPrice;
    };

    $scope.nguoiNhan = {};

    // Hàm đặt hàng
    $scope.DatHang = function () {
        if (!$scope.nguoiNhan.ten || !$scope.nguoiNhan.sdt || !$scope.nguoiNhan.diaChi) {
            alert('Vui lòng nhập đầy đủ thông tin xuất hoá đơn!');
            return;
        }
        // Xóa giỏ hàng sau khi đặt hàng thành công
        $scope.clearCart();
        alert('Đặt hàng thành công!');
        $window.location.href = 'http://127.0.0.1:5503/index.html';
    };

    // Hàm xóa giỏ hàng
    $scope.clearCart = function () {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem('cart');
            $scope.cartMyPham = [];
        } else {
            console.error('Local storage không được hỗ trợ');
        }
    };
});

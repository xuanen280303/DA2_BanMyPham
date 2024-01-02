var _user = JSON.parse(localStorage.getItem("user"));
if (!_user) {
    window.location.href = "http://127.0.0.1:5503/Admin/login.html";
}

var app = angular.module('AppAdmin', []);
app.controller("HoaDonBan", function ($scope, $http, $timeout) {
    $scope.page = 1;
    $scope.pageSize = 20;
    $scope.host = current_url_img;
    $scope.GetHoaDonBan = function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url: current_url_ad + '/api/HoaDonBan-Admin/searchHDB',
        }).then(function (response) {
            $scope.listHDB = response.data.data;
        });
    };
    $scope.GetHoaDonBan();

    $scope.toggleDetails = function(hdn) {
        hdn.showAllDetails = !hdn.showAllDetails;
    };
    
    $scope.host = current_url_img;
    $scope.SuaHDBicon = function (hdb) {
    var mahdb = hdb.maHDB;
    var tenkh = hdb.hoTenKH;
    var sdt = hdb.sdtkh;
    var diachi = hdb.diaChiKH;
    var tongtien = hdb.tongTien;

    document.getElementById("MaHDB").value = mahdb;
    document.getElementById("TenKH").value = tenkh;
    document.getElementById("SDT").value = sdt;
    document.getElementById("DiaChi").value = diachi;
    document.getElementById("TongTien").value = tongtien;

    localStorage.setItem('Admin_HDB', JSON.stringify(hdb.list_json_chitiethoadonban));
   };

   $scope.host = current_url_img;
    $scope.$watch(function () {
        var cartMyPham = JSON.parse(localStorage.getItem('Admin_HDB'))
        return cartMyPham ;
    }, function (newCartAdmin, oldCartAdmin) {
        // Hành động cập nhật giao diện khi có sự thay đổi trong dữ liệu local storage
        if (newCartAdmin !== oldCartAdmin) {
            $scope.cartMyPham  = newCartAdmin;
        }
    }, true);

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listHDB;
        $scope.page = 1;
        var mahdb = document.getElementById('mahdb').value;
        var tenkh = document.getElementById('tenkh').value;
        mahdb = mahd.trim() === "" ? 0 : mahd;
        tenkh = tenkh.trim() === "" ? "" : tenkh;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetHoaDonBan ();
        };

        $scope.GetHoaDonBan = function () {
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: { 
                    page: $scope.page, 
                    pageSize: 10,
                    ma_hdb: mahdb, 
                    ten_kh: tenkh
                },
                url: current_url_ad + '/api/HoaDonBan-Admin/searchHDB',
            }).then(function (response) {
                $scope.listHDB = response.data.data;
            });
        };
        $scope.GetHoaDonBan();
    });
});

document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('fa-trash-alt')) {
        var maHDB = target.getAttribute('data-mahdb');
        var xacNhan = confirm("Bạn có chắc chắn muốn xóa hóa đơn bán này không?");
        if (xacNhan) {
            XoaHDB(maHDB);
        }
    }
});

function XoaHDB(maHDB) {
    fetch(current_url_ad + '/api/HoaDonBan-Admin/delete/' + maHDB, {
        method: 'DELETE',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa hóa đơn bán thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}
var app = angular.module('AppAdmin', []);
app.controller("NhanVien", function ($scope, $http) {
    $scope.listNV;
    $scope.page = 1;
    $scope.pageSize = 30;
    $scope.GetNhanVien = function () {
        debugger;
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url:  current_url_ad + '/api/NhanVienControllers/search'
        }).then(function (response) {
            $scope.listNV = response.data.data;
        });
    };
    $scope.GetNhanVien();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listNV;
        $scope.page = 1;
    
        $scope.GetNhanVien = function () {
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 30,
                    ten_nv: $scope.tennv,
                    dia_chinv: $scope.diachinv
                },
                url: current_url_ad + '/api/NhanVienControllers/search',
            }).then(function (response) {
                $scope.listNV = response.data.data;
            });
        };
        $scope.GetNhanVien();
    });

    $scope.XoaChon = function() {
        var xacNhanXoa = confirm("Bạn có chắc chắn muốn xóa những nhân viên đã chọn?");

        if (xacNhanXoa) {
            var dataToSend = {
                list_json_manv: []
            };

            for (var i = 0; i < $scope.listNV.length; i++) {
                if ($scope.listNV[i].selected) {
                    var maNV = $scope.listNV[i].maNV ;
                    var chiTietNhanVien = {
                        maNV : maNV ,
                        ghiChu: "Cho phép xoá!"
                    };
                    dataToSend.list_json_manv.push(chiTietNhanVien);
                }
            }
            $http({
                method: 'POST',
                data: dataToSend,
                url: current_url_ad + '/api/NhanVienControllers/deleteS-nhanvien',
            }).then(function(response) {
                $scope.listNV = response.data.data;
                alert("Xóa thành công những nhân viên đã chọn!");
                location.reload();
            }).catch(function(error) {
                console.error('Lỗi:', error);
            });
        } else {        
        }
    };
});

var list = JSON.parse(localStorage.getItem('LIST_NHANVIEN')) || [];
function ThemNV() {
    var manv = document.getElementById("MaNV").value;
    var tennv = document.getElementById("TenNV").value;
    var ns = document.getElementById("NgaySinh").value;
    var gt = document.getElementById("GioiTinh").value;
    var calam= document.getElementById("CaLam").value;
    var sdt = document.getElementById("SDT").value;
    var diachi = document.getElementById("DiaChi").value;
    var email = document.getElementById("Email").value;
    var number = /^[0-9]+$/;

    if (manv == null || manv == "") {
        alert("Mã nhân viên không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (tennv == null || tennv == "") {
        alert("Tên nhân viên không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (ns == null || ns == "") {
        alert("Ngày sinh nhân viên không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (gt == null || gt == "") {
        alert("Giới tính nhân viên không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (calam == null || calam == "") {
        alert("Ca làm nhân viên không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (!sdt.match(number) || sdt.length != 10) {
        alert("SDT phải là kiểu số và có độ dài là 10 ký tự! Vui lòng nhập lại!");
        return false;
    }
    else if (diachi == null || diachi == "") {
        alert("Địa chỉ nhân viên không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (email == null || email == "") {
        alert("Email nhân viên không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.manv == manv) {
                alert("Mã nhân viên đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var StaffData = {
        maNV: manv,
        hoTenNV: tennv,
        ngaySinh:ns,
        gioiTinh: gt,
        caLam: calam,
        sdtnv: sdt,
        diachiNV: diachi,
        email:email
    };

    fetch(current_url_ad + '/api/NhanVienControllers/create-nhanvien', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(StaffData) 
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm nhân viên!');
        }
    });    
}


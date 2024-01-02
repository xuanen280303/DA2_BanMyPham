var _user = JSON.parse(localStorage.getItem("user"));
if (!_user) {
    window.location.href = "http://127.0.0.1:5503/Admin/login.html";
}

var app = angular.module('AppAdmin', []);
app.controller("NhanVien", function ($scope, $http) {
    $scope.listNV;
    $scope.page = 1;
    $scope.pageSize = 20;
    $scope.GetNhanVien = function () {
        debugger;
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url:  current_url_ad + '/api/NhanVien-Admin/search'
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
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: {
                    page: $scope.page,
                    pageSize: 20,
                    ten_nv: $scope.tennv,
                    dia_chinv: $scope.diachinv
                },
                url: current_url_ad + '/api/NhanVien-Admin/search',
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
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: dataToSend,
                url: current_url_ad + '/api/NhanVien-Admin/deleteS-nhanvien',
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

    fetch(current_url_ad + '/api/NhanVien-Admin/create-nhanvien', {
        method: 'POST',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
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

function SuaNVicon(icon) {
    var row = icon.parentNode.parentNode;
    var cells = row.getElementsByTagName('td'); 

    var manv= cells[1].textContent;
    var tennv = cells[2].textContent;
    var ns = cells[3].textContent;
    var gt = cells[4].textContent;
    var calam = cells[5].textContent;
    var sdt = cells[6].textContent;
    var diachi = cells[7].textContent;
    var email = cells[8].textContent;

    document.getElementById("MaNV").value =  manv;
    document.getElementById("TenNV").value = tennv;
    document.getElementById("NgaySinh").value =  ns;
    document.getElementById("GioiTinh").value = gt;
    document.getElementById("CaLam").value =  calam;
    document.getElementById("SDT").value = sdt;
    document.getElementById("DiaChi").value = diachi; 
    document.getElementById("Email").value = email; 
    // Lưu idkh để sử dụng khi cập nhật
    document.getElementById("btnUpdate").setAttribute("data-manv", manv);
}

function SuaNV() {
    var manv = document.getElementById("btnUpdate").getAttribute("data-manv");
    var tennv = document.getElementById("TenNV").value;
    var ns = document.getElementById("NgaySinh").value;
    var gt = document.getElementById("GioiTinh").value;
    var calam = document.getElementById("CaLam").value;
    var sdt= document.getElementById("SDT").value;
    var diachi = document.getElementById("DiaChi").value;
    var email = document.getElementById("Email").value;
    var NhanVienData = {
        maNV: manv,
        hoTenNV: tennv,
        ngaySinh:ns,
        gioiTinh: gt,
        caLam: calam,
        sdtnv: sdt,
        diachiNV: diachi,
        email:email
    };

    fetch(current_url_ad + '/api/NhanVien-Admin/update-nhanvien', {
        method: 'POST',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(NhanVienData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin nhân viên thành công!');
            location.reload();
        } else {
            console.error('Lỗi cập nhật dữ liệu!');
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối đến máy chủ: ' + error);
    });
}

document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('fa-trash-alt')) {
        var manv = target.getAttribute('data-manv');
        var xacNhan = confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
        if (xacNhan) {
            XoaNV(manv);
        }
    }
});

function XoaNV(manv) {
    fetch(current_url_ad + '/api/NhanVien-Admin/delete-nhanvien/' + manv, {
        method: 'DELETE',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa nhân viên thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

function LamMoi() {
    document.getElementById('MaNV').value = '';
    document.getElementById('TenNV').value = '';
    document.getElementById('NgaySinh').value = '';
    document.getElementById('GioiTinh').value = '';
    document.getElementById('CaLam').value = '';
    document.getElementById('SDT').value = '';
    document.getElementById('DiaChi').value = '';
    document.getElementById('Email').value = '';
}


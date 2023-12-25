var _user = JSON.parse(localStorage.getItem("user"));
if (!_user) {
    window.location.href = "http://127.0.0.1:5503/Admin/login.html";
}

var app = angular.module('AppAdmin', []);
app.controller("KhachHang", function ($scope, $http) {
    $scope.listKH;
    $scope.page = 1;
    $scope.pageSize = 20;
    $scope.GetKhachHang = function () {
        debugger;
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
             data: { page: $scope.page, pageSize: $scope.pageSize },
            url:  current_url_ad + '/api/KhachHangControllers/search'
        }).then(function (response) {
            $scope.listKH = response.data.data;
        });
    };
    $scope.GetKhachHang();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listKH;
        $scope.page = 1;
    
        $scope.GetKhachHang = function () {
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: {
                    page: $scope.page,
                    pageSize: 20,
                    ten_kh: $scope.tenkh,
                    dia_chikh: $scope.diachikh
                },
                url: current_url_ad + '/api/KhachHangControllers/search',
            }).then(function (response) {
                $scope.listKH = response.data.data;
            });
        };
        $scope.GetKhachHang();
    });

    $scope.XoaChon = function() {
        var xacNhanXoa = confirm("Bạn có chắc chắn muốn xóa những khách hàng đã chọn?");

        if (xacNhanXoa) {
            var dataToSend = {
                list_json_idkh: []
            };

            for (var i = 0; i < $scope.listKH.length; i++) {
                if ($scope.listKH[i].selected) {
                    var idkh = $scope.listKH[i].idkh ;
                    var chiTietKhachHang = {
                        idkh : idkh ,
                        ghiChu: "Cho phép xoá!"
                    };
                    dataToSend.list_json_idkh.push(chiTietKhachHang);
                }
            }
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: dataToSend,
                url: current_url_ad + '/api/KhachHangControllers/deleteS-khachhang',
            }).then(function(response) {
                $scope.listKH = response.data.data;
                alert("Xóa thành công những khách hàng đã chọn!");
                location.reload();
            }).catch(function(error) {
                console.error('Lỗi:', error);
            });
        } else {        
        }
    };
});

var list = JSON.parse(localStorage.getItem('LIST_KHACHHANG')) || [];
function ThemKH() {
    var idkh = document.getElementById("IDKH").value;
    var tenkh = document.getElementById("TenKH").value;
    var sdt = document.getElementById("SDT").value;
    var diachi = document.getElementById("DiaChi").value;
    var number = /^[0-9]+$/;

    if (idkh == null || idkh == "") {
        alert("ID khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (tenkh == null || tenkh == "") {
        alert("Tên khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (!sdt.match(number) || sdt.length != 10) {
        alert("SDT phải là kiểu số và có độ dài là 10 ký tự! Vui lòng nhập lại!");
        return false;
    }
    else if (diachi == null || diachi == "") {
        alert("Địa chỉ khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.idkh == idkh) {
                alert("ID khách hàng đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var CustomerData = {
        idkh: idkh,
        hoTenKH: tenkh,
        sdtkh:sdt,
        diaChiKH: diachi
    };

    fetch(current_url_ad + '/api/KhachHangControllers/create-khachhang', {
        method: 'POST',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(CustomerData) 
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm khách hàng!');
        }
    });    
}

function SuaKHicon(icon) {
    var row = icon.parentNode.parentNode;
    var cells = row.getElementsByTagName('td'); 

    var idkh= cells[1].textContent;
    var tenkh = cells[2].textContent;
    var sdt = cells[3].textContent;
    var diachi = cells[4].textContent;

    document.getElementById("IDKH").value =  idkh;
    document.getElementById("TenKH").value = tenkh;
    document.getElementById("SDT").value = sdt;
    document.getElementById("DiaChi").value = diachi; 
    // Lưu idkh để sử dụng khi cập nhật
    document.getElementById("btnUpdate").setAttribute("data-idkh", idkh);
}

function SuaKH() {
    var idkh = document.getElementById("btnUpdate").getAttribute("data-idkh");
    var tenkh = document.getElementById("TenKH").value;
    var sdt= document.getElementById("SDT").value;
    var diachi = document.getElementById("DiaChi").value;
    var KhachHangData = {
        idkh: idkh,
        hoTenKH: tenkh,
        sdtkh:sdt,
        diaChiKH: diachi
    };

    fetch(current_url_ad + '/api/KhachHangControllers/update-khachhang', {
        method: 'POST',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(KhachHangData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin khách hàng thành công!');
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
        var idkh = target.getAttribute('data-idkh');
        var xacNhan = confirm("Bạn có chắc chắn muốn xóa khách hàng này?");
        if (xacNhan) {
            XoaKH(idkh);
        }
    }
});

function XoaKH(idkh) {
    fetch(current_url_ad + '/api/KhachHangControllers/delete-khachhang/' + idkh, {
        method: 'DELETE',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa khách hàng thành công!');
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
    document.getElementById('IDKH').value = '';
    document.getElementById('TenKH').value = '';
    document.getElementById('SDT').value = '';
    document.getElementById('DiaChi').value = '';
}
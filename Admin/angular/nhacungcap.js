var _user = JSON.parse(localStorage.getItem("user"));
if (!_user) {
    window.location.href = "http://127.0.0.1:5503/Admin/login.html";
}

var app = angular.module('AppAdmin', []);
app.controller("NhaCC", function ($scope, $http) {
    $scope.listNCC;
    $scope.page = 1;
    $scope.pageSize = 20;
    $scope.GetNhaCC = function () {
        debugger;
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url:  current_url_ad + '/api/NhaCC-Admin/search'
        }).then(function (response) {
            $scope.listNCC = response.data.data;
        });
    };
    $scope.GetNhaCC();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listNCC;
        $scope.page = 1;
    
        $scope.GetNhaCC = function () {
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: {
                    page: $scope.page,
                    pageSize: 20,
                    ten_ncc: $scope.tenncc,
                    dia_chincc: $scope.diachincc
                },
                url: current_url_ad + '/api/NhaCC-Admin/search',
            }).then(function (response) {
                $scope.listNCC = response.data.data;
            });
        };
        $scope.GetNhaCC();
    });

    $scope.XoaChon = function() {
        var xacNhanXoa = confirm("Bạn có chắc chắn muốn xóa những nhà cung cấp đã chọn?");

        if (xacNhanXoa) {
            var dataToSend = {
                list_json_mancc: []
            };

            for (var i = 0; i < $scope.listNCC.length; i++) {
                if ($scope.listNCC[i].selected) {
                    var maNCC = $scope.listNCC[i].maNCC ;
                    var chiTietNhaCC = {
                        maNCC : maNCC ,
                        ghiChu: "Cho phép xoá!"
                    };
                    dataToSend.list_json_mancc.push(chiTietNhaCC);
                }
            }

            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: dataToSend,
                url: current_url_ad + '/api/NhaCC-Admin/deleteS-nhacc',
            }).then(function(response) {
                $scope.listNCC = response.data.data;
                alert("Xóa thành công những nhà cung cấp đã chọn!");
                location.reload();
            }).catch(function(error) {
                console.error('Lỗi:', error);
            });
        } else {        
        }
    };
});

var list = JSON.parse(localStorage.getItem('LIST_NHACC')) || [];
function ThemNhaCC() {
    var mancc = document.getElementById("MaNCC").value;
    var tenncc = document.getElementById("TenNCC").value;
    var sdt = document.getElementById("Sdtncc").value;
    var diachi = document.getElementById("Diachincc").value;
    var number = /^[0-9]+$/;

    if (mancc == null || mancc == "") {
        alert("Mã nhà cung cấp không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (tenncc == null || tenncc == "") {
        alert("Tên nhà cung cấp không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (!sdt.match(number) || sdt.length != 10) {
        alert("SDT phải là kiểu số và có độ dài là 10 ký tự! Vui lòng nhập lại!");
        return false;
    }
    else if (diachi == null || diachi == "") {
        alert("Địa chỉ nhà cung cấp không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.mancc == mancc) {
                alert("Mã nhà cung cấp đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var SupplierData = {
        maNCC: mancc,
        hoTenNCC: tenncc,
        sdtncc:sdt,
        diaChiNCC: diachi
    };

    fetch(current_url_ad + '/api/NhaCC-Admin/create-nhacc', {
        method: 'POST',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(SupplierData) 
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm nhà cung cấp!');
        }
    });    
}

function SuaNCCicon(icon) {
    var row = icon.parentNode.parentNode;
    var cells = row.getElementsByTagName('td'); 

    var mancc= cells[1].textContent;
    var tenncc = cells[2].textContent;
    var sdt = cells[3].textContent;
    var diachi = cells[4].textContent;

    document.getElementById("MaNCC").value =  mancc;
    document.getElementById("TenNCC").value = tenncc;
    document.getElementById("Sdtncc").value = sdt;
    document.getElementById("Diachincc").value = diachi; 
    // Lưu mã nhacc để sử dụng khi cập nhật
    document.getElementById("btnUpdate").setAttribute("data-mancc", mancc);
}

function SuaNCC() {
    var mancc = document.getElementById("btnUpdate").getAttribute("data-mancc");
    var tenncc = document.getElementById("TenNCC").value;
    var sdt= document.getElementById("Sdtncc").value;
    var diachi = document.getElementById("Diachincc").value;
    var nhaCCData = {
        maNCC: mancc,
        hoTenNCC: tenncc,
        sdtncc:sdt,
        diaChiNCC: diachi
    };

    fetch(current_url_ad + '/api/NhaCC-Admin/update-nhacc', {
        method: 'POST',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nhaCCData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin nhà cung cấp thành công!');
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
        var maNCC = target.getAttribute('data-mancc');
        var xacNhan = confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?");
        if (xacNhan) {
            XoaNCC(maNCC);
        }
    }
});

function XoaNCC(maNCC) {
    fetch(current_url_ad + '/api/NhaCC-Admin/delete-nhacc/' + maNCC, {
        method: 'DELETE',
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa nhà cung cấp thành công!');
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
    document.getElementById('MaNCC').value = '';
    document.getElementById('TenNCC').value = '';
    document.getElementById('Sdtncc').value = '';
    document.getElementById('Diachincc').value = '';
}




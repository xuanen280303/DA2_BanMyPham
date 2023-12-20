var app = angular.module('AppAdmin', []);
app.controller("BaiViet", function ($scope, $http) {
    $scope.listBV;
    $scope.page = 1;
    $scope.pageSize = 10;
    $scope.GetBaiViet = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url:  current_url_ad + '/api/BaiVietControllers/search'
        }).then(function (response) {
            $scope.listBV = response.data.data;
        });
    };
    $scope.GetBaiViet();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listBV;
        $scope.page = 1;
    
        $scope.GetBaiViet = function () {
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    tieu_de: $scope.tieude,
                    noi_dung: $scope.noidung
                },
                url: current_url_ad + '/api/BaiVietControllers/search',
            }).then(function (response) {
                $scope.listBV = response.data.data;
            });
        };
        $scope.GetBaiViet();
    });

    $scope.XoaChon = function() {
        var xacNhanXoa = confirm("Bạn có chắc chắn muốn xóa những bài viết đã chọn?");

        if (xacNhanXoa) {
            var dataToSend = {
                list_json_mabv: []
            };

            for (var i = 0; i < $scope.listBV.length; i++) {
                if ($scope.listBV[i].selected) {
                    var maBV = $scope.listBV[i].maBV ;
                    var chiTietBaiViet = {
                        maBV : maBV ,
                        ghiChu: "Cho phép xoá!"
                    };
                    dataToSend.list_json_mabv.push(chiTietBaiViet);
                }
            }

            $http({
                method: 'POST',
                data: dataToSend,
                url: current_url_ad + '/api/BaiVietControllers/deleteS-baiviet',
            }).then(function(response) {
                $scope.listBV = response.data.data;
                alert("Xóa thành công những bài viết đã chọn!");
                location.reload();
            }).catch(function(error) {
                console.error('Lỗi:', error);
            });
        } else {        
        }
    };
});

var list = JSON.parse(localStorage.getItem('LIST_BAIVIET')) || [];
function ThemBV() {
    var mabv = document.getElementById("MaBV").value;
    var tieude = document.getElementById("TieuDe").value;
    var nguoidang = document.getElementById("NguoiDang").value;
    var tgian = document.getElementById("TGian").value;
    var ngaykt = document.getElementById("NgayKT").value;
    var noidung = document.getElementById("NoiDung").value;

    if (mabv == null || mabv == "") {
        alert("Mã bài viết không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (tieude == null || tieude == "") {
        alert("Tiêu đề bài viết không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    if (nguoidang == null|| nguoidang == "") {
        alert("Tên người đăng bài viết không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (tgian == null || tgian== "") {
        alert("Thời gian đăng bài viết không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (ngaykt == null || ngaykt== "") {
        alert("Ngày kết thúc bài viết không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (noidung == null || noidung == "") {
        alert("Nội dung bài viết không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.mabv == mabv) {
                alert("Mã bài viết đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var BaiVietData = {
        maBV: mabv,
        tieuDe: tieude,
        nguoiDang:nguoidang,
        tgDang: tgian,
        ngayKT: ngaykt,
        noiDung: noidung
    };
    fetch(current_url_ad + '/api/BaiVietControllers/create-baiviet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(BaiVietData) 
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm bài viết!');
        }
    });    
}

function SuaBVicon(icon) {
    var row = icon.parentNode.parentNode;
    var cells = row.getElementsByTagName('td'); 

    var mabv= cells[1].textContent;
    var tieude = cells[2].textContent;
    var nguoidang = cells[3].textContent;
    var tgian = cells[4].textContent;
    var ngaykt = cells[5].textContent;
    var noidung = cells[6].textContent;

    document.getElementById("MaBV").value =  mabv;
    document.getElementById("TieuDe").value = tieude;
    document.getElementById("NguoiDang").value = nguoidang;
    document.getElementById("TGian").value = tgian; 
    document.getElementById("NgayKT").value = ngaykt;
    document.getElementById("NoiDung").value = noidung; 

    // Lưu mã nhacc để sử dụng khi cập nhật
    document.getElementById("btnUpdate").setAttribute("data-mabv", mabv);
}

function SuaBV() {
    var mabv = document.getElementById("btnUpdate").getAttribute("data-mabv");
    var tieude = document.getElementById("TieuDe").value;
    var nguoidang = document.getElementById("NguoiDang").value;
    var tgian= document.getElementById("TGian").value;
    var ngaykt = document.getElementById("NgayKT").value;
    var noidung = document.getElementById("NoiDung").value;

    var BaiVietData = {
        maBV: mabv,
        tieuDe: tieude,
        nguoiDang:nguoidang,
        tgDang: tgian,
        ngayKT: ngaykt,
        noiDung: noidung
    };

    fetch(current_url_ad + '/api/BaiVietControllers/update-baiviet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(BaiVietData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin bài viết thành công!');
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
        var maBV = target.getAttribute('data-mabv');
        var xacNhan = confirm("Bạn có chắc chắn muốn xóa bài viết này?");
        if (xacNhan) {
            XoaBV(maBV);
        }
    }
});

function XoaBV(maBV) {
    fetch(current_url_ad + '/api/BaiVietControllers/delete-baiviet/' + maBV, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa bài viết thành công!');
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
    document.getElementById('MaBV').value = '';
    document.getElementById('TieuDe').value = '';
    document.getElementById('NguoiDang').value = '';
    document.getElementById('TGian').value = '';
    document.getElementById('NgayKT').value = '';
    document.getElementById('NoiDung').value = '';
}
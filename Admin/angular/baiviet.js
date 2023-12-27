var _user = JSON.parse(localStorage.getItem("user"));
if (!_user) {
    window.location.href = "http://127.0.0.1:5503/Admin/login.html";
}

var app = angular.module('AppAdmin', []);
app.controller("BaiViet", function ($scope, $http) {
    //call API để lấy danh sách bài viết và gán vào biến $scope.listBV
    $scope.listBV;
    //xác định trang hiện tại.
    $scope.page = 1;
    $scope.pageSize = 10;
    $scope.GetBaiViet = function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url:  current_url_ad + '/api/BaiVietControllers/search'
            // Xử lý kết quả trả về từ API sau khi request được thực hiện. 
            //ds bài viết được gán vào $scope.listBV.
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
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
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
            //Khởi tạo dataToSend để chứa dữ liệu sẽ được gửi đi trong request. 
            //Trong trường hợp này, đó là một mảng JSON list_json_mabv.
            var dataToSend = {
                list_json_mabv: []
            };
            //Vòng lặp kiểm tra bài viết nào đc chọn để xoá
            for (var i = 0; i < $scope.listBV.length; i++) {
                if ($scope.listBV[i].selected) {
                    var maBV = $scope.listBV[i].maBV ;
                    var chiTietBaiViet = {
                        maBV : maBV ,
                        ghiChu: "Cho phép xoá!"
                    };
                    //Thêm chi tiết bài viết vào mảng list_json_mabv.
                    dataToSend.list_json_mabv.push(chiTietBaiViet);
                }
            }
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
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
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
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
    // Lấy ra dòng (row) chứa biểu tượng được click
    var row = icon.parentNode.parentNode; 
    // Lấy tất cả các ô (cell) trong dòng
    var cells = row.getElementsByTagName('td'); 
    // Lấy thông tin từ các ô và gán vào các biến
    var mabv = cells[1].textContent;
    var tieude = cells[2].textContent;
    var nguoidang = cells[3].textContent;
    var tgian = cells[4].textContent;
    var ngaykt = cells[5].textContent;
    var noidung = cells[6].textContent;
    // Gán giá trị các biến vào các trường input của form cập nhật
    document.getElementById("MaBV").value =  mabv;
    document.getElementById("TieuDe").value = tieude;
    document.getElementById("NguoiDang").value = nguoidang;
    document.getElementById("TGian").value = tgian; 
    document.getElementById("NgayKT").value = ngaykt;
    document.getElementById("NoiDung").value = noidung; 
    //Lưu mã bài viết để sử dụng khi cập nhật
    // document.getElementById("btnUpdate").setAttribute("data-mabv", mabv);
}

function SuaBV() {
    var mabv = document.getElementById("MaBV").value;//.getAttribute("data-mabv");
    var tieude = document.getElementById("TieuDe").value;
    var nguoidang = document.getElementById("NguoiDang").value;
    var tgian= document.getElementById("TGian").value;
    var ngaykt = document.getElementById("NgayKT").value;
    var noidung = document.getElementById("NoiDung").value;
    // Tạo đối tượng BaiVietData chứa thông tin cập nhật
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
        headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(BaiVietData)
    })
    .then(response => {
        // Kiểm tra nếu response từ server là OK
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
    // Lấy bài viết mà người dùng đã click
    var target = event.target;
    // Kiểm tra xem bài viết có chứa class 'fa-trash-alt' không
    if (target.classList.contains('fa-trash-alt')) {
        // Lấy mã bài viết từ thuộc tính tùy chỉnh 'data-mabv'
        var maBV = target.getAttribute('data-mabv');
        var xacNhan = confirm("Bạn có chắc chắn muốn xóa bài viết này?");
        if (xacNhan) {
            // Gọi hàm XoaBV để xóa bài viết
            XoaBV(maBV);
        }
    }
});


function XoaBV(maBV) {
    // Gửi yêu cầu DELETE đến API để xóa bài viết
    fetch(current_url_ad + '/api/BaiVietControllers/delete-baiviet/' + maBV, {
        method: 'DELETE',
        headers: {
            "Authorization": 'Bearer ' + _user.token,
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        // Kiểm tra xem response từ server có là OK không
        if (response.ok) {
            alert('Xóa bài viết thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu có
        }
    })
    .catch(error => {
        // Xử lý lỗi trong quá trình gửi request hoặc nhận response
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
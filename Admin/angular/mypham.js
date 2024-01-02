var _user = JSON.parse(localStorage.getItem("user"));
if (!_user) {
    window.location.href = "http://127.0.0.1:5503/Admin/login.html";
}

var app = angular.module('AppAdmin', []);
app.controller("MyPham", function ($scope, $http) {
    //call API để lấy danh sách mỹ phẩm và gán vào biến $scope.listMP
    $scope.listMP;
    //xác định trang hiện tại.
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.GetMyPham = function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url:  current_url_ad + '/api/MyPham-Admin/search'
            // Xử lý kết quả trả về từ API sau khi request được thực hiện. 
            //ds mỹ phẩm được gán vào $scope.listMP.
        }).then(function (response) {
            $scope.listMP = response.data.data;
        });
    };
    $scope.GetMyPham();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listMP;
        $scope.page = 1;
        $scope.GetMyPham = function () {
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: {
                    page: $scope.page,
                    pageSize: 3,
                    ten_mp: $scope.tenmp,
                    mota_mp: $scope.mota
                },
                url: current_url_ad + '/api/MyPham-Admin/search',
            }).then(function (response) {
                $scope.listMP = response.data.data;
            });
        };
        $scope.GetMyPham();
    });
    
    //Phân trang
    $scope.changePage = function (value) {
        if (Number.isInteger(value) && value > 0) {
          $scope.page = value;
        } else if (value === "prev" && $scope.page > 1) {
          $scope.page -= 1;
        } else if (value === "next") {
          $scope.page += 1;
        }    
          $scope.GetMyPham();
    };
    
    $scope.host = current_url_img;
    $scope.ThemMP = function() {
        var mamp = document.getElementById("MaMP").value;
        var tenmp = document.getElementById("TenMP").value;
        var maloai = document.getElementById("MaLoaiMP").value;
        var giamoi = document.getElementById("GiaMoi").value;
        var giacu = document.getElementById("GiaCu").value;
        var sl = document.getElementById("SL").value;
        var mota = document.getElementById("MoTa").value;
        var ghichu = document.getElementById("GhiChu").value;
        if (mamp == null || mamp== "") {
            alert("Mã mỹ phẩm không được để trống! Vui lòng nhập lại!");
            return false;
        }
        else if (tenmp == null || tenmp == "") {
            alert("Tên mỹ phẩm không được để trống! Vui lòng nhập lại!");
            return false;
        } 
        if (maloai == null|| maloai == "") {
            alert("Mã loại mỹ phẩm không được để trống! Vui lòng nhập lại!");
            return false;
        }
        else if (giamoi  == null || giamoi == "") {
            alert("Giá bán mỹ phẩm không được để trống! Vui lòng nhập lại!");
            return false;
        } 
        else if (giacu == null || giacu== "") {
            alert("Giá nhập mỹ phẩm không được để trống! Vui lòng nhập lại!");
            return false;
        } 
        else if (sl == null || sl == "") {
            alert("Số lượng mỹ phẩm không được để trống! Vui lòng nhập lại!");
            return false;
        }
        else if (mota == null || mota == "") {
            alert("Mô tả mỹ phẩm không được để trống! Vui lòng nhập lại!");
            return false;
        }
        else if (ghichu == null || ghichu == "") {
            alert("Ghi chú mỹ phẩm không được để trống! Vui lòng nhập lại!");
            return false;
        }
        else {
            for (var x of list) {
                if (x.mamp == mamp) {
                    alert("Mã mỹ phẩm đã tồn tại! Vui lòng nhập lại!")
                    return false;
                }
            }
        } 
        var file = document.getElementById("HinhAnh").files[0];
        const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'PUT',
                headers: {
                    "Authorization": 'Bearer ' + _user.token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url_ad + '/api/User-Admin/Upload',
            }).then(function (res) { 
                var MyPhamData = {
                    maMP: mamp,
                    tenMP: tenmp,
                    maLoaiMP:maloai,
                    giaMoi: giamoi,
                    giaCu: giacu,
                    slTon: sl,
                    anhDaiDien:  res.data.filePath,
                    moTa: mota,
                    ghiChu: ghichu
                };
                fetch(current_url_ad + '/api/MyPham-Admin/create-mypham', {
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(MyPhamData) 
                })
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        alert('Đã thêm thành công!');
                        location.reload();
                    } else {
                        alert('Lỗi khi thêm mỹ phẩm!');
                    }
                });    
            });    
    };

    $scope.SuaMP = function() {
        var mamp = document.getElementById("MaMP").value;
        var tenmp = document.getElementById("TenMP").value;
        var maloai = document.getElementById("MaLoaiMP").value;
        var giamoi = document.getElementById("GiaMoi").value;
        var giacu = document.getElementById("GiaCu").value;
        var sl = document.getElementById("SL").value;
        var mota = document.getElementById("MoTa").value;
        var ghichu = document.getElementById("GhiChu").value;
        var file = document.getElementById("HinhAnh").files[0];
        const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'PUT',
                headers: {
                    "Authorization": 'Bearer ' + _user.token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url_ad + '/api/User-Admin/Upload',
            }).then(function (res) { 
                var CosmeticData = {
                    maMP: mamp,
                    tenMP: tenmp,
                    maLoaiMP:maloai,
                    giaMoi: giamoi,
                    giaCu: giacu,
                    slTon: sl,
                    anhDaiDien:  res.data.filePath,
                    moTa: mota,
                    ghiChu: ghichu
                };
                debugger;
                fetch(current_url_ad + '/api/MyPham-Admin/update-mypham', {
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(CosmeticData)
                })
                .then(response => {
                    // Kiểm tra nếu response từ server là OK
                    if (response.ok) {
                        alert('Cập nhật thông tin mỹ phẩm thành công!');
                        location.reload();
                    } else {
                        console.error('Lỗi cập nhật dữ liệu!');
                    }
                })
                .catch(error => {
                    console.error('Lỗi kết nối đến máy chủ: ' + error);
                });     
            });       
    }

    $scope.XoaChon = function() {
        var xacNhanXoa = confirm("Bạn có chắc chắn muốn xóa những mỹ phẩm đã chọn?");
        if (xacNhanXoa) {
            //Khởi tạo dataToSend để chứa dữ liệu sẽ được gửi đi trong request. 
            //Trong trường hợp này, đó là một mảng JSON list_json_mabv.
            var dataToSend = {
                list_json_mamp: []
            };
            //Vòng lặp kiểm tra bài viết nào đc chọn để xoá
            for (var i = 0; i < $scope.listMP.length; i++) {
                if ($scope.listMP[i].selected) {
                    var maMP = $scope.listMP[i].maMP ;
                    var chiTietMyPham = {
                        maMP : maMP,
                        ghiChu: "Cho phép xoá!"
                    };
                    //Thêm chi tiết bài viết vào mảng list_json_mabv.
                    dataToSend.list_json_mamp.push(chiTietMyPham);
                }
            }
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token,"Content-Type": "application/json"},
                data: dataToSend,
                url: current_url_ad + '/api/MyPham-Admin/deleteS-mypham',
            }).then(function(response) {
                $scope.listMP = response.data.data;
                alert("Xóa thành công những mỹ phẩm đã chọn!");
                location.reload();
            }).catch(function(error) {
                console.error('Lỗi:', error);
            });
        } else {        
        }
    };
});

var list = JSON.parse(localStorage.getItem('LIST_MYPHAM')) || [];
function SuaMPicon(icon) {
    // Lấy ra dòng (row) chứa biểu tượng được click
    var row = icon.parentNode.parentNode; 
    // Lấy tất cả các ô (cell) trong dòng
    var cells = row.getElementsByTagName('td'); 
    // Lấy thông tin từ các ô và gán vào các biến
    var mamp = cells[1].textContent;
    var tenmp = cells[2].textContent;
    var maloai = cells[3].textContent;   
    var giamoi = cells[4].textContent;
    var giacu= cells[5].textContent;
    var sl= cells[6].textContent;
    var hinhanh = cells[7].textContent;
    var mota = cells[8].textContent;
    var ghichu = cells[9].textContent;
    // Gán giá trị các biến vào các trường input của form cập nhật
    document.getElementById("MaMP").value =  mamp;
    document.getElementById("TenMP").value = tenmp;
    document.getElementById("MaLoaiMP").value = maloai;
    document.getElementById("GiaMoi").value = giamoi; 
    document.getElementById("GiaCu").value = giacu;
    document.getElementById("SL").value = sl; 
    document.getElementById("HinhAnh").value = hinhanh; 
    document.getElementById("MoTa").value = mota;
    document.getElementById("GhiChu").value = ghichu;
}

document.addEventListener('click', function (event) {
    // Lấy bài viết mà người dùng đã click
    var target = event.target;
    // Kiểm tra xem bài viết có chứa class 'fa-trash-alt' không
    if (target.classList.contains('fa-trash-alt')) {
        // Lấy mã bài viết từ thuộc tính tùy chỉnh 'data-mabv'
        var maMP = target.getAttribute('data-mamp');
        var xacNhan = confirm("Bạn có chắc chắn muốn xóa mỹ phẩm này?");
        if (xacNhan) {
            // Gọi hàm XoaBV để xóa bài viết
            XoaMP(maMP);
        }
    }
});

function XoaMP(maMP) {
    // Gửi yêu cầu DELETE đến API để xóa bài viết
    fetch(current_url_ad + '/api/MyPham-Admin/delete-mypham/' + maMP, {
        method: 'DELETE',
        headers: {
            "Authorization": 'Bearer ' + _user.token,
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        // Kiểm tra xem response từ server có là OK không
        if (response.ok) {
            alert('Xóa mỹ phẩm thành công!');
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
    document.getElementById('MaMP').value = '';
    document.getElementById('TenMP').value = '';
    document.getElementById('MaLoaiMP').value = '';
    document.getElementById('GiaMoi').value = ''; 
    document.getElementById('GiaCu').value = '';
    document.getElementById('SL').value = '';
    document.getElementById('HinhAnh').value = '';
    document.getElementById('MoTa').value = '';
    document.getElementById('GhiChu').value = '';
}
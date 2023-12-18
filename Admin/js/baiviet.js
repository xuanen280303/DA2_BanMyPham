var mabaiviet = document.getElementById('mabv');
var tieude = document.getElementById('tieudebv');
var nguoidang = document.getElementById('nguoidangbv');
var thoigian = document.getElementById('tgiandangbv');
var ngaykt = document.getElementById('ngayktbv');
var noidung = document.getElementById('noidungbv');
var them = document.getElementById('thembv');
var sua = document.getElementById('suabv');
var lammoi = document.getElementById('lammoibv');
var phanthanbv = document.getElementById('tbody_baiviet');

tieude.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, '');
});

function hienThi() {
    const LIST_BAIVIET = 'LIST_BAIVIET';
    let baiviets = JSON.parse(localStorage.getItem(LIST_BAIVIET)) || [];  
    // Xóa các dòng hiện tại trong tbody
    tbody_baiviet.innerHTML = '';
    // Lặp qua mảng nguoidungs và hiển thị dữ liệu trong bảng
    baiviets.forEach(function (baiviet, index) {
    var dongMoi = document.createElement('tr');
    dongMoi.innerHTML = `
        <td><input type="checkbox" name="check" ></td>
        <td>${index + 1}</td>
        <td>${baiviet.mabaiviet}</td>
        <td>${baiviet.tieude}</td>
        <td>${baiviet.nguoidang}</td>
        <td>${baiviet.thoigian}</td>
        <td>${baiviet.ngaykt}</td>
        <td>${baiviet.noidung}</td>
      `;

    // Thêm button Xoá vào mỗi dòng
    var tdxoa = document.createElement('td');
    var btnxoa = document.createElement('button');
    btnxoa.innerHTML = `
    <svg width="25px" height="25px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path d="M6.496094 1C5.675781 1 5 1.675781 5 2.496094L5 3L2 3L2 4L3 4L3 12.5C3 13.328125 3.671875 14 4.5 14L10.5 14C11.328125 14 12 13.328125 12 12.5L12 4L13 4L13 3L10 3L10 2.496094C10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2L8.503906 2C8.785156 2 9 2.214844 9 2.496094L9 3L6 3L6 2.496094C6 2.214844 6.214844 2 6.496094 2 Z M 5 5L6 5L6 12L5 12 Z M 7 5L8 5L8 12L7 12 Z M 9 5L10 5L10 12L9 12Z" fill="#010101" />
    </svg>
    `;
      
      // Thêm sự kiện click cho mỗi dòng
dongMoi.addEventListener('click', function () {
    // Gán giá trị từ dòng tương ứng vào các trường input
    mabaiviet.value = baiviet.mabaiviet;
    tieude.value = baiviet.tieude;
    nguoidang.value = baiviet.nguoidang;
    thoigian.value = baiviet.thoigian;
    ngaykt.value = baiviet.ngaykt;
    noidung.value = baiviet.noidung;

});

// Thêm sự kiện click cho button Xóa
btnxoa.addEventListener('click', function (event) {
    // Ngăn chặn sự kiện click lan ra các phần tử cha
    event.stopPropagation();  
    // Lấy mã bài viết từ dòng tương ứng
    var mabvToDelete = baiviet.mabaiviet;
    // Gọi hàm xóa bài viết
    xoabaiviet(mabvToDelete);
});
   
    tdxoa.appendChild(btnxoa);
    dongMoi.appendChild(tdxoa);
    // Thêm sự kiện click cho mỗi dòng
    dongMoi.addEventListener('click', function () {
    });
    phanthanbv.appendChild(dongMoi);
    });
} 

// Gọi hàm hiển thị dữ liệu khi trang được load
document.addEventListener('DOMContentLoaded', function () {
    hienThi();
});

//-----------------------THÊM---------------------------
them.addEventListener('click', function () {
    var mabaiviet_value = mabaiviet.value;
    var tieude_value = tieude.value;
    var nguoidang_value = nguoidang.value;
    var thoigian_value = thoigian.value;
    var ngaykt_value = ngaykt.value;
    var noidung_value = noidung.value;
    // Kiểm tra xem có trường nào trống không
    if (!mabaiviet_value || !tieude_value || !nguoidang_value || !thoigian_value || !ngaykt_value || !noidung_value) {
        alert('Vui lòng nhập đầy đủ thông tin bài viết!');
    } else {
        // Kiểm tra xem mã bài viết đã tồn tại hay chưa
        var checkmabaiviet = kiemTraMaTrung(mabaiviet_value);
        if (checkmabaiviet) {
            alert('Mã bài viết đã tồn tại! Vui lòng nhập lại!');
        } else {
            const LIST_BAIVIET = 'LIST_BAIVIET';
            let baiviets = JSON.parse(localStorage.getItem(LIST_BAIVIET)) || [];
            baiviets.push({
                mabaiviet: mabaiviet_value,
                tieude: tieude_value,
                nguoidang: nguoidang_value,
                thoigian: thoigian_value,
                ngaykt: ngaykt_value,
                noidung: noidung_value,
            });
            localStorage.setItem(LIST_BAIVIET, JSON.stringify(baiviets));
            console.log(baiviets);
            hienThi();
            alert('Thêm thông bài viết thành công!');
        }
    }
});

function kiemTraMaTrung(maBaiViet) {
    const LIST_BAIVIET = 'LIST_BAIVIET';
    let baiviets = JSON.parse(localStorage.getItem(LIST_BAIVIET)) || [];
    return baiviets.some(baiviet => baiviet.mabaiviet === maBaiViet);
}

///------------------------SỬA-----------------------------
sua.addEventListener('click', function () {
    var mabaiviet_value = mabaiviet.value;
    var tieude_value = tieude.value;
    var nguoidang_value = nguoidang.value;
    var thoigian_value = thoigian.value;
    var ngaykt_value = ngaykt.value;
    var noidung_value = noidung.value;

    const LIST_BAIVIET = 'LIST_BAIVIET';
    let baiviets = JSON.parse(localStorage.getItem(LIST_BAIVIET)) || [];

    // Tìm vị trí của bài viết có mã cụ thể
    var index = baiviets.findIndex(function (baiviet) {
        return baiviet.mabaiviet === mabaiviet_value;
    });

    if (index !== -1) {
        var xacNhan = confirm('Bạn có chắc chắn muốn sửa thông tin bài viết không?');
        if (xacNhan) {
            // Cập nhật thông tin của bài viết
            baiviets[index] = {
                mabaiviet: mabaiviet_value,
                tieude: tieude_value,
                nguoidang: nguoidang_value,
                thoigian: thoigian_value,
                ngaykt: ngaykt_value,
                noidung: noidung_value,
            };
            localStorage.setItem(LIST_BAIVIET, JSON.stringify(baiviets));
            console.log(baiviets);
            hienThi();  
        }
    } else {
        alert('Không tìm thấy mã bài viết cần sửa!');
    }
});

//----------------------XOÁ--------------------------------
function xoabaiviet(mabaiviet) {
    // Hiển thị hộp thoại xác nhận
    var xacnhan = confirm('Bạn có chắc chắn muốn xóa bài viết không?');
    if (xacnhan) {
        const LIST_BAIVIET = 'LIST_BAIVIET';
        let baiviets = JSON.parse(localStorage.getItem(LIST_BAIVIET)) || [];
        var index = baiviets.findIndex(function (baiviet) {
            return baiviet.mabaiviet === mabaiviet;
        });

        if (index !== -1) {
            // Xoá người dùng từ mảng
            baiviets.splice(index, 1);
            // Lưu mảng đã cập nhật vào local storage
            localStorage.setItem(LIST_BAIVIET, JSON.stringify(baiviets));
            // Refresh dữ liệu trong bảng
            hienThi();
        } else {
            alert('Bài viết không tồn tại!');
        }
    }
}

//---------------------LOAD------------------------
lammoi.addEventListener('click',function(){
    mabaiviet.value ="";
    tieude.value = "";
    nguoidang.value ="";
    thoigian.value = "";
    ngaykt.value = "";
    noidung.value = "";
});
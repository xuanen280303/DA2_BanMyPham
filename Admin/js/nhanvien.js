var manhanvien = document.getElementById('manv');
var tennhanvien = document.getElementById('tennv');
var calamnv = document.getElementById('calam');
var sdt = document.getElementById('sdtnv');
var diachi = document.getElementById('diachinv');
var them = document.getElementById('themnv');
var sua = document.getElementById('suanv');
var lammoi = document.getElementById('lammoinv');
var thannoidung = document.getElementById('tbody_nhanvien');

tennhanvien.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, '');
});

sdt.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function hienThi() {
    const LIST_NHANVIEN= 'LIST_NHANVIEN';
    let nhanviens = JSON.parse(localStorage.getItem(LIST_NHANVIEN)) || [];  
    // Xóa các dòng hiện tại trong tbody
    thannoidung.innerHTML = '';
    // Lặp qua mảng nguoidungs và hiển thị dữ liệu trong bảng
    nhanviens.forEach(function (nhanvien, index) {
    var dongMoi = document.createElement('tr');
    dongMoi.innerHTML = `
        <td><input type="checkbox" name="check" ></td>
        <td>${index + 1}</td>
        <td>${nhanvien.manhanvien}</td>
        <td>${nhanvien.tennhanvien}</td>
        <td>${nhanvien.calamnv}</td>
        <td>${nhanvien.sdt}</td>
        <td>${nhanvien.diachi}</td>
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
    manhanvien.value = nhanvien.manhanvien;
    tennhanvien.value = nhanvien.tennhanvien;
    calamnv.value = nhanvien.calamnv;
    sdt.value = nhanvien.sdt;
    diachi.value = nhanvien.diachi;
});

// Thêm sự kiện click cho button Xóa
btnxoa.addEventListener('click', function (event) {
    // Ngăn chặn sự kiện click lan ra các phần tử cha
    event.stopPropagation();  
    // Lấy mã nhân viên từ dòng tương ứng
    var manvToDelete = nhanvien.manhanvien;
    // Gọi hàm xóa người dùng
    xoanhanvien(manvToDelete);
});
    tdxoa.appendChild(btnxoa);
    dongMoi.appendChild(tdxoa);
    // Thêm sự kiện click cho mỗi dòng
    dongMoi.addEventListener('click', function () {
    });
    thannoidung.appendChild(dongMoi);
    });
} 

// Gọi hàm hiển thị dữ liệu khi trang được load
document.addEventListener('DOMContentLoaded', function () {
    hienThi();
});

//-----------------------THÊM---------------------------
them.addEventListener('click', function () {
    var manhanvien_value = manhanvien.value;
    var tennhanvien_value = tennhanvien.value;
    var calamnv_value = calamnv.value;
    var sdt_value = sdt.value;
    var diachi_value = diachi.value;
    if (!manhanvien_value || !tennhanvien_value || !calamnv_value || !sdt_value || !diachi_value ) {
        alert('Vui lòng nhập đầy đủ thông tin nhân viên!');

    } else if (sdt_value.length !== 11) {
        alert('Số điện thoại không hợp lệ! Vui lòng nhập lại!');

    } else {
        var checkmanhanvien = kiemTraMaTrung(manhanvien_value);
        if (checkmanhanvien) {
            alert('Mã nhân viên đã tồn tại! Vui lòng nhập lại!');
        } else {
            const LIST_NHANVIEN = 'LIST_NHANVIEN';
            let nhanviens = JSON.parse(localStorage.getItem(LIST_NHANVIEN)) || [];
            nhanviens.push({
                manhanvien: manhanvien_value,
                tennhanvien: tennhanvien_value,
                calamnv: calamnv_value,
                sdt: sdt_value,
                diachi: diachi_value,
            });
            localStorage.setItem(LIST_NHANVIEN, JSON.stringify(nhanviens));
            console.log(nhanviens);
            hienThi();
            alert('Thêm thông nhân viên thành công!');
        }
    }
});

function kiemTraMaTrung(manhanvien) {
    const LIST_NHANVIEN = 'LIST_NHANVIEN';
    let nhanviens = JSON.parse(localStorage.getItem(LIST_NHANVIEN)) || [];
    return nhanviens.some(nhanvien => nhanvien.manhanvien === manhanvien);
}

///------------------------SỬA-----------------------------
sua.addEventListener('click', function () {
    var manhanvien_value = manhanvien.value;
    var tennhanvien_value = tennhanvien.value;
    var calamnv_value = calamnv.value;
    var sdt_value = sdt.value;
    var diachi_value = diachi.value;

    const LIST_NHANVIEN = 'LIST_NHANVIEN';
    let nhanviens = JSON.parse(localStorage.getItem(LIST_NHANVIEN)) || [];

    // Tìm vị trí của bài viết có mã cụ thể
    var index = nhanviens.findIndex(function (nhanvien) {
        return nhanvien.manhanvien === manhanvien_value;
    });

    if (index !== -1) {
        var xacNhan = confirm('Bạn có chắc chắn muốn sửa thông tin nhân viên không?');
        if (xacNhan) {
            // Cập nhật thông tin của bài viết
            nhanviens[index] = {
                manhanvien: manhanvien_value,
                tennhanvien: tennhanvien_value,
                calamnv: calamnv_value,
                sdt: sdt_value,
                diachi: diachi_value,
            };
            localStorage.setItem(LIST_NHANVIEN, JSON.stringify(nhanviens));
            console.log(nhanviens);
            hienThi();  
        }
    } else {
        alert('Không tìm thấy mã nhân viên cần sửa!');
    }
});

//----------------------XOÁ--------------------------------
function xoanhanvien(manhanvien) {
    var xacnhan = confirm('Bạn có chắc chắn muốn xóa nhân viên không?');
    if (xacnhan) {
        const LIST_NHANVIEN = 'LIST_NHANVIEN';
        let nhanviens = JSON.parse(localStorage.getItem(LIST_NHANVIEN)) || [];
        var index = nhanviens.findIndex(function (nhanvien) {
            return nhanvien.manhanvien === manhanvien;
        });

        if (index !== -1) {
            // Xoá người dùng từ mảng
            nhanviens.splice(index, 1);
            // Lưu mảng đã cập nhật vào local storage
            localStorage.setItem(LIST_NHANVIEN, JSON.stringify(nhanviens));
            // Refresh dữ liệu trong bảng
            hienThi();
        } else {
            alert('Nhân viên không tồn tại!');
        }
    }
}

//---------------------LOAD------------------------
lammoi.addEventListener('click',function(){
    manhanvien.value ="";
    tennhanvien.value = "";
    calamnv.value ="";
    sdt.value = "";
    diachi.value = "";
});
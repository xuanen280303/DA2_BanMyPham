var mamypham = document.getElementById('MaMP');
var maloaimypham = document.getElementById('loaimp');
var tenmypham = document.getElementById('TenMP');
var hinhanhp = document.getElementById('ImgMp');
var soluong = document.getElementById('solg');
var mota = document.getElementById('mota');
var them = document.getElementById('them');
var sua = document.getElementById('sua');
var lammoi = document.getElementById('lammoi');
var thannoidung = document.getElementById('tbody_mypham');

soluong.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function hienThiDuLieu() {
    const LIST_MYPHAM = 'LIST_MYPHAM';
    let myphams = JSON.parse(localStorage.getItem(LIST_MYPHAM)) || [];  
    // Xóa các dòng hiện tại trong tbody
    thannoidung.innerHTML = '';
    // Lặp qua mảng nguoidungs và hiển thị dữ liệu trong bảng
    myphams.forEach(function (mypham, index) {
    var dongMoi = document.createElement('tr');
    dongMoi.innerHTML = `
        <td><input type="checkbox" name="check" ></td>
        <td>${index + 1}</td>
        <td>${mypham.mamypham}</td>
        <td>${mypham.tenmypham}</td>
        <td>${mypham.maloaimypham}</td>
        <td><img width="50px" height="50px" src="${mypham.hinhanh}" alt="Hình ảnh"></td>
        <td>${mypham.soluong}</td>
        <td>${mypham.mota}</td>
      `;
    // Thêm button Xoá vào mỗi dòng
    var tdxoa = document.createElement('td');
    var btnxoa = document.createElement('button');
    btnxoa.innerHTML = `
    <svg width="25px" height="25px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path d="M6.496094 1C5.675781 1 5 1.675781 5 2.496094L5 3L2 3L2 4L3 4L3 12.5C3 13.328125 3.671875 14 4.5 14L10.5 14C11.328125 14 12 13.328125 12 12.5L12 4L13 4L13 3L10 3L10 2.496094C10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2L8.503906 2C8.785156 2 9 2.214844 9 2.496094L9 3L6 3L6 2.496094C6 2.214844 6.214844 2 6.496094 2 Z M 5 5L6 5L6 12L5 12 Z M 7 5L8 5L8 12L7 12 Z M 9 5L10 5L10 12L9 12Z" fill="#010101" />
    </svg>
    `;
      
    //Khi click vào dòng nào thì sẽ hiển thị lên input
dongMoi.addEventListener('click', function () {
    // Gán giá trị từ dòng tương ứng vào các trường input
    mamypham.value = mypham.mamypham;
    maloaimypham.value = mypham.maloaimypham;
    tenmypham.value = mypham.tenmypham;
    soluong.value = mypham.soluong;
    mota.value = mypham.mota;
});

// Thêm sự kiện click cho button Xóa
btnxoa.addEventListener('click', function (event) {
    // Ngăn chặn sự kiện click lan ra các phần tử cha
    event.stopPropagation();  
    // Lấy mã mỹ phẩm từ dòng tương ứng để xoá
    var mampToDelete = mypham.mamypham;
    // Gọi hàm xóa người dùng
    xoamypham(mampToDelete);
});
    tdxoa.appendChild(btnxoa);
    dongMoi.appendChild(tdxoa);
    // Thêm sự kiện click cho mỗi dòng
    dongMoi.addEventListener('click', function () {
    });
    thannoidung.appendChild(dongMoi);
    });
} 

//Load lại phầm hiển thị dữ liệu trang mỗi khi thêm, sửa ,xoá
document.addEventListener('DOMContentLoaded', function () {
    hienThiDuLieu();
});

them.addEventListener('click', function () {
    var mamypham_value = mamypham.value; //Lấy dữ liệu trong input mamypham.value rồi gắn vào mamypham_value
    var maloaimypham_value = maloaimypham.value;
    var tenmypham_value = tenmypham.value;
    var soluong_value = soluong.value;
    var mota_value = mota.value;
    // Kiểm tra xem các trường có đầy đủ thông tin hay không
    if (!mamypham_value || !maloaimypham_value || !tenmypham_value || !soluong_value || !mota_value) {
        alert('Vui lòng nhập đầy đủ thông tin mỹ phẩm!');
        return;
    }
    // Kiểm tra xem mã mỹ phẩm đã tồn tại hay chưa
    var checkmamp = kiemTraMaTrung(mamypham_value);
    if (checkmamp) {
        alert('Mã mỹ phẩm đã tồn tại! Vui lòng nhập lại');
        return; // Không thực hiện thêm nếu mã đã tồn tại
    }
    const fr = new FileReader();
    fr.readAsDataURL(hinhanhp.files[0]);
    fr.addEventListener('load', () => {
        const originalImage = new Image();
        originalImage.src = fr.result;
        originalImage.onload = function () {
            const canvas = document.createElement('canvas');
            const maxWidth = 800; // Đặt chiều rộng tối đa mong muốn
            const scaleRatio = maxWidth / originalImage.width;        
            canvas.width = maxWidth;
            canvas.height = originalImage.height * scaleRatio;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
            // Chuyển đổi hình ảnh nén thành base64
            const hinhanhdaduocxuly = canvas.toDataURL('image/jpeg', 0.2); 
            const LIST_MYPHAM = 'LIST_MYPHAM';
            let myphams = JSON.parse(localStorage.getItem(LIST_MYPHAM)) || [];
            //Thêm dữ liệu vào LIST_MYPHAM
            myphams.push({
                mamypham: mamypham_value,
                maloaimypham: maloaimypham_value,
                tenmypham: tenmypham_value,
                soluong: soluong_value,
                hinhanh: hinhanhdaduocxuly,
                mota: mota_value,
            });
            // Lưu mảng đã cập nhật vào local storage
            localStorage.setItem(LIST_MYPHAM, JSON.stringify(myphams));
            // Hiển thị dữ liệu trong console
            console.log(myphams);
            // // Refresh dữ liệu trong bảng
            hienThiDuLieu();
            alert('Thêm thông mỹ phẩm thành công!');
        }
    });
});

function kiemTraMaTrung(mamypham){
    const LIST_MYPHAM = 'LIST_MYPHAM';
    //myphams là một mảng được khởi tạo bằng cách lấy dữ liệu từ Local Storage 
    //thông qua localStorage.getItem(LIST_MYPHAM). 
    //Nếu có dữ liệu trong 'LIST_MYPHAM'=> được lấy và parse thành một mảng => gán cho biến myphams.
    // Ngược lại, myphams sẽ là một mảng rỗng.
    let myphams = JSON.parse(localStorage.getItem(LIST_MYPHAM)) || [];
    // Sử dụng some để kiểm tra mamp đã tồn tại hay chưa
    return myphams.some(mypham => mypham.mamypham === mamypham);
}

///------------------------SỬA-----------------------------
sua.addEventListener('click', function () {
var mamypham_value = mamypham.value;
var maloaimypham_value = maloaimypham.value;
var tenmypham_value = tenmypham.value;
var soluong_value = soluong.value;
var mota_value = mota.value;

    const fr = new FileReader();
    fr.readAsDataURL(hinhanhp.files[0]);
    fr.addEventListener('load', () => {
        const originalImage = new Image();
        originalImage.src = fr.result;
        originalImage.onload = function () {
            const canvas = document.createElement('canvas');
            const maxWidth = 800; // Đặt chiều rộng tối đa mong muốn
            const scaleRatio = maxWidth / originalImage.width;        
            canvas.width = maxWidth;
            canvas.height = originalImage.height * scaleRatio;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
            // Chuyển đổi hình ảnh nén thành base64
            const hinhanhdaduocxuly = canvas.toDataURL('image/jpeg', 0.2); 

        const LIST_MYPHAM = 'LIST_MYPHAM';
        let myphams = JSON.parse(localStorage.getItem(LIST_MYPHAM)) || [];
            //Tìm vị trí của mỹ phẩm cần sửa có tồn tại trong local storage không
            var index = myphams.findIndex(function (mypham) {
                return mypham.mamypham === mamypham_value;
            });
            if (index !== -1) {
                var xacNhan = confirm('Bạn có chắc chắn muốn sửa thông tin không?');
                if (xacNhan) {
                    // Cập nhật thông tin của mỹ phẩm
                    myphams[index] = {
                        mamypham: mamypham_value,
                        maloaimypham: maloaimypham_value,
                        tenmypham: tenmypham_value,
                        soluong: soluong_value,
                        hinhanh: hinhanhdaduocxuly,
                        mota: mota_value,
                    };
                    localStorage.setItem(LIST_MYPHAM, JSON.stringify(myphams));
                    console.log(myphams);
                    hienThiDuLieu();         
                };       
            }
        } 
    });
});

lammoi.addEventListener('click',function(){
    mamypham.value ="";
    maloaimypham.value = "";
    tenmypham.value ="";
    soluong.value = "";
    mota.value = "";
});

function xoamypham(mamypham) {
    var xacnhan = confirm('Bạn có chắc chắn muốn xóa thông tin mỹ phẩm không?');
    if (xacnhan) {
        const LIST_MYPHAM = 'LIST_MYPHAM';
        let myphams = JSON.parse(localStorage.getItem(LIST_MYPHAM)) || [];
        //Tìm vị trí của mỹ phẩm cần xoá có tồn tại trong local storage không
        //findIndex() để tìm vị trí (index) của một mỹ phẩm trong danh sách dựa trên mamypham.
        var index = myphams.findIndex(function (mypham) {
            return mypham.mamypham === mamypham;
        });
        //Mã mp tồn tại
        if (index !== -1) {
            //Xoá nmỹ phẩm từ mảng, index sẽ là vị trí đầu tiên của mỹ phẩm trong mảng
            myphams.splice(index, 1);
            //lưu danh sách mới vào localStorage.
            localStorage.setItem(LIST_MYPHAM, JSON.stringify(myphams));
            // Refresh dữ liệu trong bảng
            hienThiDuLieu();
        } else {
            alert('Mã mỹ phẩm không tồn tại!');
        }
    }
}
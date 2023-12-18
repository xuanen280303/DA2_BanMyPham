function timKiem() {
    var timkiem, chuyendoi, table, tr, maDonhang, tenKH, tenMyPham, txtmaDonhang, txttenKH, txttenMyPham, i;
    timkiem = document.getElementById("timkiemtt");
    chuyendoi = timkiem.value.toUpperCase();
    table = document.getElementById("tbody_donhang");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        maDonhang = tr[i].getElementsByTagName("td")[2];
        tenMyPham = tr[i].getElementsByTagName("td")[4]; 
        tenKH = tr[i].getElementsByTagName("td")[6];
    
        if (maDonhang && tenKH && tenMyPham) {
            // Lấy nội dung trong cột mã đơn hàng, tên khách hàng và tên mỹ phẩm
            txtmaDonhang = maDonhang.textContent || maDonhang.innerText;
            txttenKH = tenKH.textContent || tenKH.innerText;
            txttenMyPham = tenMyPham.textContent || tenMyPham.innerText;
            // So sánh giá trị tìm kiếm với nội dung cột mã đơn hàng, tên khách hàng và tên mỹ phẩm
            if (txtmaDonhang.toUpperCase().indexOf(chuyendoi) > -1 ||
                txttenKH.toUpperCase().indexOf(chuyendoi) > -1 ||
                txttenMyPham.toUpperCase().indexOf(chuyendoi) > -1) {
                // Nếu tìm thấy, hiển thị hàng
                tr[i].style.display = "";
            } else {
                // Nếu không tìm thấy, ẩn hàng
                tr[i].style.display = "none";
            }
        }
    }
}


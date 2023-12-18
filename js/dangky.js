function dangky(){
    console.log("ss");
    let tk=document.getElementById("tk").value;
    let mk=document.getElementById("mk").value;
    let nhaplaimk=document.getElementById("nhaplai").value;
    //Lấy dữ liệu từ Local Storage với khóa là 'listtk'.
    let data= localStorage.getItem('listtk');
    let danhsach=data? JSON.parse(data):[];
    //Kiểm tra xem tên tài khoản đã tồn tại hay chưa.
    let maDaTonTai = danhsach.some((item) => item.taikhoan === tk);
    if(maDaTonTai)
    {
        alert("Tên tài khoản đã tồn tại!");
    }
    else{
        if(mk===nhaplaimk){
            let tttk = {
                taikhoan:tk,
                matkhau:mk,
            };
            //thêm đối tượng tttk vào mảng danhsach.
            danhsach.push(tttk);
            //Lưu mảng danhsach vào Local Storage với khóa 'listtk'.
            localStorage.setItem("listtk",JSON.stringify(danhsach));
            alert("Đăng ký tài khoản thành công!");
        }
        else{
            alert("Mật khẩu của bạn không trùng khớp!");
        }     
    }
}

$(document).ready(function(){
    $('#eye').click(function(){
        $(this).toggleClass('Open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if($(this).hasClass('Open')){
            $(this).prev().attr('type','text');           
        }
        else{
            $(this).prev().attr('type','password');
        }
    });
});


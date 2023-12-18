
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

function dangnhap() {
    // Lấy giá trị từ ô nhập liệu
    let tk = document.getElementById("tk").value;
    let mk = document.getElementById("mk").value;
    if (tk.trim() === "" || mk.trim() === "") 
    {
        alert("Vui lòng nhập tên đăng nhập và mật khẩu!");
        return;
    }
    let listdata = localStorage.getItem("listtk");
    let data = JSON.parse(listdata);
    //Tạo một biến loginSuccessful để kiểm tra trạng thái đăng nhập.
    let loginSuccessful = false;
    //Sử dụng vòng lặp for để duyệt qua từng tài khoản trong mảng data.
    for (let i = 0; i < data.length; i++) {
        if (data[i].taikhoan === tk && data[i].matkhau === mk) {
            loginSuccessful = true;
            break;
        }
    }
    if (loginSuccessful) {
        window.location.href = "http://127.0.0.1:5502/index.html";
        alert("Đăng nhập thành công!");
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}

function dangkyitem(){
    let dk= document.getElementById('nhaplai');
    dk.style.display='block';
}

function dangky(){
    let tk=document.getElementById("tk").value;
    let mk=document.getElementById("mk").value;
    let nhaplaimk=document.getElementById("nhaplai").value;
    let data= localStorage.getItem('listtk');
    let danhsach=data? JSON.parse(data):[];
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
            danhsach.push(tttk);
            localStorage.setItem("listtk",JSON.stringify(danhsach));
            alert("Đăng ký tài khoản thành công!");
        }
        else{
            alert("Mật khẩu của bạn không trùng khớp!");
        }     
    }
}

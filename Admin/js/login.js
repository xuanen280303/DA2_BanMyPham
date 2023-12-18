
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

document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của việc submit form
    var username = document.getElementById("taikhoan").value;
    var password = document.getElementById("matkkhau").value;
    if (!username || !password) {
        alert("Vui lòng nhập tài khoản và mật khẩu!");
        return;
    }
    if (username === "enchan2803" && password === "2803") {
        window.location.href = "Adminpage.html";
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
});
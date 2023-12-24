function Login() {
    var item = {};
    item.TaiKhoan = $("#taikhoan").val();
    item.MatKhau = $("#matkhau").val();
    $.ajax({
        type: "POST",
        url: "https://localhost:44386/api/User/login",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(item)
    }).done(function (data) {
        debugger;
        if (data != null && data.message != null && data.message != 'undefined') {
            alert(data.message);
        } else {
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "Adminpage.html";
        }
       
    }) .fail(function() {
      alert('Lỗi!');
    }); 
};

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
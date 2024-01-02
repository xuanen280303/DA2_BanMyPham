function Login_admin() {
  var dangnhap = {
      username : document.getElementById('taikhoan').value,
      password:document.getElementById('matkhau').value
  };
  //// Sử dụng AJAX để gửi yêu cầu đăng nhập đến API
    $.ajax({
      type: "POST",
      url: "http://localhost:57708/api/User-Admin/login",
      //Ngăn jQuery chuyển đổi dữ liệu thành chuỗi truy vấn
      processData: false,
      contentType: "application/json",  
      data: JSON.stringify(dangnhap)    

      }).done(function (data) {     
        if (data != null && data.message != null && data.message != 'undefined') {
          alert(data.message);
        }else {
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "http://127.0.0.1:5503/Admin/Adminpage.html";
        }  
      }) .fail(function() {
        alert('Lỗi kết nối tới API!');
      });   
};



function LoadUser() {
    var u = JSON.parse(localStorage.getItem('user')) || [];

    $('#ten_nv').html(u.tennv);
    $('#manv').html(u.manv);
    $('#tennv').html(u.tennv);
    $('#emailnv').html(u.emailnv);
    $('#sdtnv').html(u.sdtnv);
    $('#quyen').html(u.quyen);
}
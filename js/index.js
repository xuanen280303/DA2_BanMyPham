cartbuttons=document.querySelectorAll(".xephang-number")
imgs=document.querySelectorAll(".product-sanpham>img")
dess=document.querySelectorAll(".sanpham-content p")
newprice=document.querySelectorAll(".sanpham-giagoc p")
oldprice=document.querySelectorAll(".sanpham-price-old p")
//Tạo mảng mylist chứa các thông tin của mỹ phẩm
let da=localStorage.getItem("mylist")
const mylist=da ? JSON.parse(da):[]
var tam;
 // Tiến hành tạo mỹ phẩm mới và thêm vào mảng 'mylist'
for(let i=0;i<cartbuttons.length;i++){
    cartbuttons[i].addEventListener("click",()=>{
        alert("Đã thêm thành công mỹ phẩm vào giỏ hàng!")
        tam = {img:imgs[i].src,na:"innisfree",des:dess[i].innerHTML,newpr:newprice[i].innerHTML,oldpri:oldprice[i].innerHTML}
        mylist.push(tam)
        // Lưu mảng 'mylist' vào localStorage
        localStorage.setItem("mylist",JSON.stringify(mylist))
    })
}
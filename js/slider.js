//---------------------------------------------------------------------SLIDER
// Sự kiện "load" xảy ra khi trang web đã hoàn thành việc tải
window.addEventListener("load", function () {
    // Lấy các phần tử trong DOM cần sử dụng
    const slider = document.querySelector(".slider"); // Phần tử cha của slider
    const sliderMaint = document.querySelector(".slider-main"); // Phần tử chứa các slide
    const sliderItems = document.querySelectorAll(".slider-item"); // Các slide
    const nextBtn = document.querySelector(".slider-next"); // Nút "Next" để chuyển slide tiếp theo
    const prevBtn = document.querySelector(".slider-prev"); // Nút "Prev" để chuyển slide trước đó
    const dotitems = document.querySelectorAll(".slider-dot-item"); // Các điểm chuyển slide
  
    const sliderItemwidth = sliderItems[0].offsetWidth; // Độ rộng của một slide
    const slidersLength = sliderItems.length; // Số lượng slide
    let postionx = 0; // Vị trí hiện tại của slider
    let index = 0; // Chỉ số hiện tại của slide
  
    // Tự động chuyển slide mỗi 10 giây
    setInterval(function () {
      handleChangeSlide(1); // Gọi hàm handleChangeSlide với tham số 1 để chuyển slide sang phải
    }, 5000);
  
    // Sự kiện click nút "Next"
    nextBtn.addEventListener("click", function () {
      handleChangeSlide(1); // Gọi hàm handleChangeSlide với tham số 1 để chuyển slide sang phải
    });
  
    // Sự kiện click nút "Prev"
    prevBtn.addEventListener("click", function () {
      handleChangeSlide(-1); // Gọi hàm handleChangeSlide với tham số -1 để chuyển slide sang trái
    });
  
    // Sự kiện click vào điểm chuyển slide
    [...dotitems].forEach((item) =>
      item.addEventListener("click", function (e) {
        // Xóa lớp "active" khỏi tất cả các điểm chuyển slide
        [...dotitems].forEach((el) => el.classList.remove("active"));
        e.target.classList.add("active"); // Thêm lớp "active" vào điểm chuyển slide được click
        const sliderIndex = parseInt(e.target.dataset.index); // Lấy chỉ số slide từ thuộc tính "data-index"
        index = sliderIndex; // Cập nhật chỉ số slide hiện tại
        postionx = -1 * index * sliderItemwidth; // Tính toán vị trí mới của slider
        sliderMaint.style = `transform: translateX(${postionx}px) `; // Di chuyển slider đến vị trí mới
      })
    );
  
    // Hàm xử lý khi chuyển slide
    function handleChangeSlide(direction) {
      if (direction == 1) {
        // Nếu đang ở slide cuối cùng, chuyển về slide đầu tiên
        if (index >= slidersLength - 1) {
          index = 0;
        } else {
          index++; // Tăng chỉ số slide lên 1
        }
        postionx = -1 * index * sliderItemwidth; // Tính toán vị trí mới của slider
      } else if (direction == -1) {
        // Nếu đang ở slide đầu tiên, chuyển đến slide cuối cùng
        if (index <= 0) {
          index = slidersLength - 1;
        } else {
          index--; // Giảm chỉ số slide đi 1
        }
        postionx = -1 * index * sliderItemwidth; // Tính toán vị trí mới của slider
      }
  
      sliderMaint.style = `transform: translateX(${postionx}px) `; // Di chuyển slider đến vị trí mới
      [...dotitems].forEach((el) => el.classList.remove("active")); // Xóa lớp "active" khỏi tất cả các điểm chuyển slide
      dotitems[index].classList.add("active"); // Thêm lớp "active" vào điểm chuyển slide tương ứng với slide hiện tại
    }
  });
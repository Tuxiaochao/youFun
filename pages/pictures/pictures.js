function renderPictures(list) {
    runSwiper();
}

function runSwiper() {
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        grabCursor: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      }); 
}
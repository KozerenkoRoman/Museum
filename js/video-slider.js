var swiper = new Swiper('.videoSwiper', {
    slidesPerView: 3,
    spaceBetween: 5,
    navigation: {
        nextEl: 'video-arrow-right',
        prevEl: 'video-arrow-left',
    },
    pagination: {
        el: '.video-pagination',
        clickable: true,
        horizontalClass: 'video-pagination-horizontal',
        bulletClass: 'video-pagination-dot',
        bulletActiveClass: 'video-pagination-active',
        // renderBullet: function (index, className) {return '<span class="' + className + '"></span>';},
    },
    lazy: true,
    mousewheel: true,
    keyboard: true,
    loop: true,
});

document.getElementById('video-arrow-right').addEventListener('click',
    function () {
        swiper.slideNext()
    })

const arrowLeft = document.getElementById('video-arrow-left').addEventListener('click',
    function () {
        swiper.slidePrev()
    })

swiper.pagination.el.style = 'width:auto;'


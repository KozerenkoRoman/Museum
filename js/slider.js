const prev = document.getElementById('welcome-arrow-left');
const next = document.getElementById('welcome-arrow-right');
const slides = document.querySelectorAll('.welcome-slide');
const dots = document.querySelectorAll('.welcome-pagination-dot');
const sliderMain = document.getElementById('welcome-slider');

let index = 0;

const activeSlide = (n) => {
    for (slide of slides) {
        slide.classList.remove('welcome-slide-active');
    }
    slides[n].classList.add('welcome-slide-active');
    document.getElementById('welcome-slide-num').innerText = '0' + (n + 1);
};

const activeDot = (n) => {
    for (dot of dots) {
        dot.classList.remove('welcome-pagination-active');
    }
    dots[n].classList.add('welcome-pagination-active');
};

const prepareCurrentSlide = (ind) => {
    activeSlide(ind);
    activeDot(ind);
};

const nextSlide = () => {
    if (index === slides.length - 1) {
        index = 0;
        prepareCurrentSlide(index);
    } else {
        index++;
        prepareCurrentSlide(index);
    }
};

const prevSlide = () => {
    if (index === 0) {
        index = slides.length - 1;
        prepareCurrentSlide(index);
    } else {
        index--;
        prepareCurrentSlide(index);
    }
};

dots.forEach((item, indexDot) => {
    item.addEventListener('click', () => {
        index = indexDot;
        prepareCurrentSlide(index);
    });
});

let offset = 0;

function onMouseDown(e) {
    offset = e.offsetX;
}

function onMouseUp(e) {
    offset = offset - e.offsetX;
    if (offset > 0)
        prevSlide()
    else
        nextSlide();
    console.log(offset + ' ' + e.offsetX)
}

// handlers bound to the element only once
sliderMain.onmouseup = onMouseUp;
sliderMain.onmousedown = onMouseDown;


next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

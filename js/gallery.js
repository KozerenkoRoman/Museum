const galleryInnerContainerLeft = document.querySelector('.gallery-inner-container-left');
const galleryInnerContainerCenter = document.querySelector('.gallery-inner-container-center');
const galleryInnerContainerRight = document.querySelector('.gallery-inner-container-right');

const array = [
    'assets/img/galery/galery1.webp',
    'assets/img/galery/galery2.webp',
    'assets/img/galery/galery3.webp',
    'assets/img/galery/galery4.webp',
    'assets/img/galery/galery5.webp',
    'assets/img/galery/galery6.webp',
    'assets/img/galery/galery7.webp',
    'assets/img/galery/galery8.webp',
    'assets/img/galery/galery9.webp',
    'assets/img/galery/galery10.webp',
    'assets/img/galery/galery11.webp',
    'assets/img/galery/galery12.webp',
    'assets/img/galery/galery13.webp',
    'assets/img/galery/galery14.webp',
    'assets/img/galery/galery15.webp']

function mixArray(array) {
    array.sort(() => Math.random() - 0.5);
}

mixArray(array);
array.map((el, index) => {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = el;
    img.alt = `gallery ${index + 1}`;
    if (index < 5) {
        galleryInnerContainerLeft.append(img)
    } else if (index >= 5 && index < 10) {
        galleryInnerContainerCenter.append(img)
    } else {
        galleryInnerContainerRight.append(img)
    }
})
const imageElements = document.querySelectorAll('.gallery-img');
window.addEventListener('scroll', galleryTimeout(galleryScroll));
for (let i = 0; i < imageElements.length; i++) {
    imageElements[i].classList.add('gallery-scroll');
}

function galleryScroll(e) {
    imageElements.forEach(image => {
        let sliderInAt = (window.scrollY + window.innerHeight) - image.height / 2;
        let imageBottom = image.offsetTop + image.height;
        let isHalfShow = sliderInAt > image.offsetTop;
        let isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShow && isNotScrolledPast)
            image.classList.add('gallery-scroll')
        else
            image.classList.remove('gallery-scroll');

    });
}

function galleryTimeout(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const args = arguments;
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


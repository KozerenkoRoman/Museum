function initComparisons() {
    const x = document.getElementsByClassName('img-comp-overlay');
    for (let i = 0; i < x.length; i++) compareImages(x[i]);

    function compareImages(img) {
        const w = img.offsetWidth;
        const c_InitLeft = 85;
        const slider = document.createElement('div');
        let clicked = 0;

        slider.setAttribute('class', 'img-comp-slider');
        img.style.width = c_InitLeft + (w / 2) + 'px';
        img.parentElement.insertBefore(slider, img);
        slider.style.left = c_InitLeft + (w / 2) - (slider.offsetWidth / 2) + 'px';
        slider.addEventListener('mousedown', slideReady);
        slider.addEventListener('touchstart', slideReady);
        window.addEventListener('mouseup', slideFinish);
        window.addEventListener('touchstop', slideFinish);

        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener('mousemove', slideMove);
            window.addEventListener('touchmove', slideMove);
        }

        function slideFinish() {
            clicked = 0;
        }

        function slideMove(e) {
            if (clicked === 0) return false;
            let pos = getCursorPos(e)
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }

        function getCursorPos(e) {
            const a = img.getBoundingClientRect();
            let x = e.pageX - a.left;
            return x - window.pageXOffset;
        }

        function slide(x) {
            img.style.width = x + 'px';
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + 'px';
        }
    }
}

initComparisons()

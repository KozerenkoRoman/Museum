window.onload = function () {
    const places = document.querySelectorAll('.visiting-card-item');
    const button = document.querySelector('.welcome-discover-louvre');
    const iframes = document.querySelectorAll('.iframe-hidden');

    const show = (event) => {
        event.classList.remove('iframe-hidden');
        event.requestFullscreen();
    };

    const hide = (event) => {
        event.classList.add('iframe-hidden');
    };

    button.addEventListener('click', () => {
        show(iframes[0]);
    });

    places.forEach((place, i) => {
        place.addEventListener('click', (event) => {
            event.preventDefault();
            show(iframes[i + 1]);
        });
    });

    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    function exitHandler() {
        if (
            !document.fullscreenElement &&
            !document.webkitIsFullScreen &&
            !document.mozFullScreen &&
            !document.msFullscreenElement
        ) {
            for (let i = 0; i < iframes.length; i++) {
                iframes[i].classList.add('iframe-hidden');
            }
        }
    }


};

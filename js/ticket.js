const buyButton = document.querySelector('#buy-ticket');
const close = document.querySelector('.popup-close');
const container = document.querySelector('.ticket-popup');
const book = document.querySelector('#popup-book-button');

const plusButtons = document.getElementsByName('ticket-basic-plus');
const minusButtons = document.getElementsByName('ticket-basic-minus');
const seniorPlusButtons = document.getElementsByName('ticket-senior-plus');
const seniorMinusButtons = document.getElementsByName('ticket-senior-minus');
const ticketTypes = document.getElementsByName('ticket-type');

buyButton.addEventListener('click', (e) => {
    e.preventDefault();
    container.style.left = '0';
})

close.addEventListener('click', (e) => {
    container.style.left = '-5000px';
})

book.addEventListener('click', (e) => {
    e.preventDefault();
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    circle.style.top = e.offsetY + 'px';
    circle.style.left = e.offsetX + 'px';
    book.appendChild(circle);
    setTimeout(() => circle.remove(), 500)
})

// Calc total summ
function calcTotalAmount() {
    const amountBasic = document.getElementsByName('amount-basic');
    const amountSenior = document.getElementsByName('amount-senior');
    const popupBasic = document.getElementsByName('popup-basic');
    const popupSenior = document.getElementsByName('popup-senior');

    let price = 0;
    switch (document.querySelector('input[name="ticket-type"]:checked').value) {
        case 'permanent':
            price = 20;
            break;
        case 'temporary':
            price = 25;
            break;
        case 'combined':
            price = 40;
            break;
        default:
            price = 0;
            break;
    }
    const valueBasic = price * +amountBasic[0].value;
    const valueSenior = price * +amountSenior[0].value / 2;

    popupBasic.value = amountBasic[0].value;
    popupSenior.value = amountSenior[0].value;
    document.getElementById('amount-total').innerHTML = 'Total €' + (valueBasic + valueSenior);
    document.getElementById('popup-total').innerHTML = valueBasic + valueSenior;
    document.getElementById('sum-basic').innerHTML = valueBasic;
    document.getElementById('sum-senior').innerHTML = valueSenior;
}

function changePrice(ticketType) {
    const priceBasics = document.getElementsByName('price-basic');
    for (let text of priceBasics) {
        switch (ticketType) {
            case 'permanent':
                text.innerText = 20;
                break;
            case 'temporary':
                text.innerText = 25;
                break;
            case 'combined':
                text.innerText = 40;
                break;
            default:
                break;
        }
    }

    const priceSeniors = document.getElementsByName('price-senior');
    for (let text of priceSeniors) {
        switch (ticketType) {
            case 'permanent':
                text.innerText = 10;
                break;
            case 'temporary':
                text.innerText = 12.5;
                break;
            case 'combined':
                text.innerText = 20;
                break;
            default:
                break;
        }
    }
}

if (plusButtons.length > 0) {
    plusButtons.forEach((elem) => {
        elem.addEventListener('click', function (e) {
            const amountBasics = document.getElementsByName('amount-basic');
            for (let text of amountBasics) {
                text.value = +text.value < 20 ? +text.value + 1 : 20;
                text.innerText = text.value;
            }
            calcTotalAmount();
        });
    });
}

if (minusButtons.length > 0) {
    minusButtons.forEach((elem) => {
        elem.addEventListener('click', function (e) {
            const amountBasics = document.getElementsByName('amount-basic');
            for (let text of amountBasics) {
                text.value = +text.value >= 1 ? +text.value - 1 : 0;
                text.innerText = text.value;
            }
            calcTotalAmount();
        });
    });
}

if (seniorPlusButtons.length > 0) {
    seniorPlusButtons.forEach((elem) => {
        elem.addEventListener('click', function (e) {
            const amountSeniors = document.getElementsByName('amount-senior');
            for (let text of amountSeniors) {
                text.value = +text.value < 20 ? +text.value + 1 : 20;
                text.innerText = text.value;
            }
            calcTotalAmount();
        });
    });
}

if (seniorMinusButtons.length > 0) {
    seniorMinusButtons.forEach((elem) => {
        elem.addEventListener('click', function (e) {
            const amountSeniors = document.getElementsByName('amount-senior');
            for (let text of amountSeniors) {
                text.value = +text.value >= 1 ? +text.value - 1 : 0;
                text.innerText = text.value;
            }
            calcTotalAmount();
        });
    });
}

if (ticketTypes.length > 0) {
    ticketTypes.forEach((elem) => {
        elem.addEventListener('change', function (e) {
            document.getElementById('ticket-type-option').value = elem.value;
            document.getElementById('chosed-typeoption').innerText = e.target.nextSibling.nodeValue.replace('\n', '');
            calcTotalAmount();
            changePrice(elem.value);
        });
    });
}

document.getElementById('ticket-type-option').addEventListener('change', (e) => {
    ticketTypes.forEach((elem) => {
        elem.checked = document.getElementById('ticket-type-option').value === elem.value;
        if (elem.checked) {
            changePrice(elem.value);
            document.getElementById('chosed-typeoption').innerText = e.target.options[e.target.selectedIndex].innerHTML;
        }
    });
    calcTotalAmount();
})

document.getElementById('ticket-date').addEventListener('change', (e) => {
    const d = new Date(e.currentTarget.value);
    document.getElementById('chosed-date').innerText = d.toLocaleString('en-us', {weekday: 'long'}) + ', ' +
        d.toLocaleString('en-us', {month: 'long'}) + ' ' +
        d.toLocaleString('en-us', {day: '2-digit'});
    // Friday, August 19
})

document.getElementById('time').addEventListener('change', (e) => {
    document.getElementById('chosed-time').innerText = e.target.value;
})

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + '; max-age: 36000';
}

function getFormatDate(date) {
    return date.toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', function () {
    for (let i = 9; i <= 18; i++) {
        const zeroPad = (num, places) => String(num).padStart(places, '0');

        let option = document.createElement('option');
        option.value = zeroPad(i, 0) + ':00';
        document.getElementById('times').appendChild(option);
        if (i < 18) {
            option = document.createElement('option');
            option.value = zeroPad(i, 0) + ':30';
            document.getElementById('times').appendChild(option);
        }
    }

    document.getElementById('ticket-type-option').value = getCookie('ticketType') || 'permanent';
    ticketTypes.forEach((elem) => {
        elem.checked = document.getElementById('ticket-type-option').value === elem.value;
        if (elem.checked) changePrice(elem.value);
    });
    const amountSeniors = document.getElementsByName('amount-senior');
    for (let text of amountSeniors) {
        text.value = getCookie('amountSenior') || 1;
        text.innerText = text.value;
    }
    const amountBasics = document.getElementsByName('amount-basic');
    for (let text of amountBasics) {
        text.value = getCookie('amountBasic') || 1;
        text.innerText = text.value;
    }
    const ticketDate = document.getElementById('ticket-date');
    ticketDate.value = getFormatDate(new Date());
    ticketDate.min = getFormatDate(new Date());

    calcTotalAmount();
});

window.addEventListener('unload', function () {
    setCookie('ticketType', document.getElementById('ticket-type-option').value);
    setCookie('amountSenior', document.getElementsByName('amount-senior')[0].value);
    setCookie('amountBasic', document.getElementsByName('amount-basic')[0].value);
});

let tooltipElem;

const email = document.getElementById('email');
email.addEventListener('input', function (event) {
    if (email.validity.patternMismatch) {
        showTooltip(event, 'E-mail must contain from 3 to 15 characters in Latin');
    } else {
        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }
    }
});

const name = document.getElementById('name');
name.addEventListener('input', function (event) {
    if (name.validity.patternMismatch) {
        showTooltip(event, 'Username must contain from 3 to 15 characters in Cyrillic or Latin');
    } else {
        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }
    }
});

const tel = document.getElementById('tel');
tel.addEventListener('input', function (event) {
    if (tel.validity.patternMismatch) {
        showTooltip(event, 'telephone must contain only digits, spaces or plus');
    } else {
        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }
    }
});
function showTooltip(event, tooltipHtml) {
    if (tooltipElem) return;
    let target = event.target;
    if (!tooltipHtml) return;

    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltipHtml;
    container.append(tooltipElem);
    let coords = target.getBoundingClientRect();
    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;
    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) top = coords.top + target.offsetHeight + 5;
    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
}

document.onmouseout = function (e) {
    if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
    }
};

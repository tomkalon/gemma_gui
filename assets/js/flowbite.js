import {Carousel} from 'flowbite';

const items = [];
const getSlides = document.querySelectorAll('[data-carousel-item]');
for (let i = 0; i < getSlides.length; i++) {
    items[i] =
        {
            position: i,
            el: getSlides[i]
        };
}

const options = {
    defaultPosition: 0,
    interval: 20000,
    indicators: {
        items: [],
    },
    onNext: () => {
    },
    onPrev: () => {
    },
    onChange: () => {
    }
}
const getIndicatorItems = document.querySelectorAll('.indicators button');
for (let i = 0; i < getIndicatorItems.length; i++) {
    options.indicators.items[i] =
        {
            position: i,
            el: getIndicatorItems[i]
        }
}

const carousel = new Carousel(items, options);
carousel.cycle();

const $prevButton = document.querySelector('[data-carousel-prev]');
const $nextButton = document.querySelector('[data-carousel-next]');
$prevButton.addEventListener('click', () => {
    carousel.prev();
});

$nextButton.addEventListener('click', () => {
    carousel.next();
});

const getItems = document.querySelectorAll('#indicators-carousel .item');

let itemSettings = (arr, callback) => {
    arr.forEach(element => {
        callback(element);
    });
};

let itemAddClicker = (element) => {
    element.onclick = () => {
        carousel.pause();
        itemSettings(getItems, function(el) {
            el.classList.remove('active');
        });
        element.classList.add('active');
    }
}

itemSettings(getItems, itemAddClicker);

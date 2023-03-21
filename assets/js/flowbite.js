import {Carousel} from 'flowbite';
if (document.getElementById('indicators-carousel')) {
    const items = [];
    const carouselSlides = document.querySelectorAll('[data-carousel-item]');
    for (let i = 0; i < carouselSlides.length; i++) {
        items[i] =
            {
                position: i,
                el: carouselSlides[i]
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
    const carouselIndicatorItems = document.querySelectorAll('.indicators button');
    for (let i = 0; i < carouselIndicatorItems.length; i++) {
        options.indicators.items[i] =
            {
                position: i,
                el: carouselIndicatorItems[i]
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

    const carouselItems = document.querySelectorAll('#indicators-carousel .item');
    let activeCarouselElement = null;

    let doForAll = (arr, callback) => {
        arr.forEach(element => {
            callback(element);
        });
    };

    let itemAddClicker = (element) => {
        element.onclick = () => {
            carousel.pause();
            if (!(activeCarouselElement === null || activeCarouselElement === element)) {
                activeCarouselElement.classList.remove('active');
            }
            activeCarouselElement = element;
            activeCarouselElement.classList.add('active');
        }
    }

    doForAll(carouselItems, itemAddClicker);
}

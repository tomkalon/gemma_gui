import { Carousel } from 'flowbite';

const items = [];
const getItems = document.querySelectorAll('[data-carousel-item]');
for (let i = 0; i < getItems.length; i++ ) {
    items[i] =
        {
            position: i,
            el: getItems[i]
        }
}

const options = {
    defaultPosition: 0,
    interval: 10000,
    indicators: {
        activeClasses: 'bg-white dark:bg-darker-300',
        inactiveClasses: 'bg-white/50 dark:bg-darker-300 hover:bg-white dark:hover:bg-darker-100',
    },
    items: [],
    onNext: () => {
        console.log('next slider item is shown');
    },
    onPrev: ( ) => {
        console.log('previous slider item is shown');
    },
    onChange: ( ) => {
        console.log('new slider item has been shown');
    }
}
const getIndicatorItems = document.querySelectorAll('.indicators button');
for (let i = 0; i < getIndicatorItems.length; i++ ) {
    options.items[i] =
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

console.log(carousel);

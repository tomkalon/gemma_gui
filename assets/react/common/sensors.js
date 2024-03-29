import React from 'react';

const sensors = {
    temp: {
        name: 'temp',
        si: '°C',
        icon: ['gf-temp1', 'gf-temp2', 'gf-temp3', 'gf-temp4', 'gf-temp5', 'gf-temp6', 'gf-temp7'],
        thresholds: [0, 5, 10, 20, 30, 40, 200],
        color: ['text-red-500'],
        desc: 'temp',
        fullName: 'Temperatura',
        shortName: 'Temp',
        settingsStyle: "gf-temp3 text-red-500"
    },
    humid: {
        name: 'humid',
        si: '%',
        icon: ['gf-dry', 'gf-humidity'],
        thresholds: [35, 100],
        color: ['text-sky-300'],
        desc: 'wilgotność',
        fullName: 'Wilgotność',
        shortName: 'Wilg.',
        settingsStyle: "gf-humidity text-sky-300"
    },
    vent: {
        name: 'vent',
        si: '%',
        icon: ['gf-vent1', 'gf-vent2', 'gf-vent3', 'gf-vent4', 'gf-vent5', 'gf-vent6', 'gf-vent7'],
        thresholds: [0, 20, 40, 60, 80, 95, 100],
        color: ['text-sky-300'],
        desc: 'wietrznik',
        fullName: 'Wietrznik',
        settingsStyle: "gf-vent3 text-lime-500"
    },
    shadow: {
        name: 'shadow',
        si: '%',
        icon: ['gf-shadow1', 'gf-shadow2', 'gf-shadow3', 'gf-shadow4', 'gf-shadow5',  'gf-shadow6'],
        thresholds: [5, 25, 50, 75, 95, 100],
        color: ['text-sky-300'],
        desc: 'cieniówka',
        fullName: 'Cieniówka',
        settingsStyle: "gf-shadow text-amber-300"
    },
    blow: {
        name: 'blow',
        icon: ['gf-empty', 'gf-blow'],
        thresholds: [0, 1],
        color: ['text-sky-300'],
        desc: 'nadmuch',
        desc_arr: ['Wł.', 'Wył.'],
        fullName: 'Nadmuch',
        settingsStyle: "gf-blow text-cyan-500"
    },
    heat: {
        name: 'heat',
        icon: ['gf-empty', 'gf-heat'],
        thresholds: [0, 1],
        color: ['text-sky-300'],
        desc: 'ogrzewanie',
        desc_arr: ['Wł.', 'Wył.'],
        fullName: 'Ogrzewanie',
        settingsStyle: "gf-heat text-amber-500"
    },
    sun: {
        si: 'lx',
        icon: ['gf-sun1', 'gf-sun2', 'gf-sun3', 'gf-sun4', 'gf-sun5', 'gf-sun6'],
        thresholds: [1000, 2000, 3000, 4000, 5000, 20000],
        color: ['text-amber-300'],
        desc_arr: ['I PRÓG', 'II PRÓG', 'II PRÓG', 'IV PRÓG', 'V PRÓG'],
    },
    rain: {
        icon: ['gf-sunny', 'gf-rain'],
        thresholds: [0, 1],
        color: ['text-sky-400'],
        desc_arr: ['-', 'Deszcz'],
    },
    wind: {
        si: 'km/s',
        icon: ['gf-wind1', 'gf-wind2', 'gf-wind3', 'gf-wind4', ],
        thresholds: [5, 15, 30, 200],
        color: ['text-lime-500'],
    },
    wind_direction: {
        icon: ['gf-arrow-n', 'gf-arrow-ne', 'gf-arrow-e', 'gf-arrow-se', 'gf-arrow-s', 'gf-arrow-sw', 'gf-arrow-w', 'gf-arrow-nw', ],
        thresholds: false,
        color: ['text-amber-500'],
        desc_arr: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
    }
}

export default sensors;
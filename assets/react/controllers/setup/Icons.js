import React from 'react';

let icons = {
    temp: {
        si: '°C',
        icon: ['gf-temp1', 'gf-temp2', 'gf-temp3', 'gf-temp4', 'gf-temp5', 'gf-temp6', 'gf-temp7'],
        thresholds: [0, 5, 10, 20, 30, 40],
        scope: [],
        color: ['text-red-500']
    },
    humid: {
        si: '%',
        icon: ['gf-dry', 'gf-humidity'],
        thresholds: [35],
        scope: [],
        color: ['text-sky-300']
    },
    vent: {
        si: '%',
        icon: ['gf-vent1', 'gf-vent2', 'gf-vent3', 'gf-vent4', 'gf-vent5', 'gf-vent6', 'gf-vent7'],
        thresholds: [0, 20, 40, 60, 80, 95],
        scope: [],
        color: ['text-sky-300']
    },
    shadow: {
        si: '%',
        icon: ['gf-shadow1', 'gf-shadow2', 'gf-shadow3', 'gf-shadow4', 'gf-shadow5',  'gf-shadow6'],
        thresholds: [0, 25, 50, 75, 95],
        scope: [],
        color: ['text-sky-300']
    },
    blow: {
        si: '',
        icon: ['gf-empty', 'gf-blow'],
        thresholds: [0, 1],
        scope: [],
        color: ['text-sky-300'],
        desc: 'nadmuch'
    },
    heat: {
        si: '',
        icon: ['gf-empty', 'gf-heat'],
        thresholds: [0, 1],
        scope: [],
        color: ['text-sky-300'],
        desc: 'ogrzewanie'
    },
    sun: {
        si: 'lx',
        icon: ['gf-sun1', 'gf-sun2', 'gf-sun3', 'gf-sun4', 'gf-sun5', 'gf-sun6'],
        thresholds: [1000, 2000, 3000, 4000, 5000],
        scope: [],
        color: ['text-sky-300']
    },
    rain: {
        si: '',
        icon: ['gf-sunny', 'gf-rain'],
        thresholds: [0, 1],
        scope: [],
        color: ['text-sky-600']
    },
    wind: {
        si: '',
        icon: ['gf-wind1', 'gf-wind2', 'gf-wind3', 'gf-wind4', ],
        thresholds: [5, 15, 30],
        scope: [],
        color: ['text-lime-500']
    },
    wind_direction: {
        si: '',
        icon: ['gf-arrow-n', 'gf-arrow-ne', 'gf-arrow-e', 'gf-arrow-se', 'gf-arrow-s', 'gf-arrow-sw', 'gf-arrow-w', 'gf-arrow-nw', ],
        thresholds: false,
        scope: [],
        color: ['text-amber-300']
    }
}

export default icons;
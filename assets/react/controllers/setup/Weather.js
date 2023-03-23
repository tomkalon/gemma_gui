import React, {Component} from 'react';

let Weather = {
    temp: {
        si: '°C',
        icon: 'gf-temp3',
        color: 'text-red-500'
    },
    humid: {
        si: '%',
        icon: 'gf-humidity',
        color: 'text-sky-300'
    },
    sun: {
        si: 'lx',
        icon: 'gf-sun2',
        color: 'text-sky-300'
    },
    rain: {
        si: '',
        icon: 'gf-rain',
        color: 'text-sky-600'
    },
    wind: {
        si: '',
        icon: 'gf-wind2',
        color: 'text-lime-500'
    },
    wind_direction: {
        si: '',
        icon: 'gf-dir-se',
        color: 'text-amber-300'
    }
}

export default Weather;
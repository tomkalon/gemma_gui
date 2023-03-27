import React from 'react';

// update SCHEME by the fetched data -> VALUES and setup icons
function assignSetupToValues(data, scheme) {
    for (const [key, val] of Object.entries(data)) {

        // icons if THRESHOLD is  an integer array
        if (scheme[key].thresholds !== false)
        for (const i of Object.keys(val)) {
            for (const [index, item] of Object.entries(scheme[key].thresholds)) {
                if (val[i] <= item) {
                    scheme[key].calculated[i] = {
                        icon: scheme[key].icon[index]
                    };
                    break;
                }
            }
        }
        // icons if THRESHOLD is not an integer array
        // WIND_DIRECTION
        else {
            let result = null;
            if (key === 'wind_direction') {
                const $directions = scheme[key].desc_arr;
                for (let i = 0; i < $directions.length; i++) {
                    if (val[0].toUpperCase() === $directions[i]) {
                        result = i;
                        break;
                    }
                }
            }
            scheme[key].calculated = [{
                icon: scheme[key].icon[result]
            }];
        }

        // Display integer TINYINT values as strings from Icons.js -> sensor_name.desc_arr[]
        if (key ==='rain' || key ==='blow' || key ==='heat') {
            val[0] === '0' ? scheme[key].value = scheme[key].desc_arr[0] : scheme[key].value = scheme[key].desc_arr[1];
        }
        // Display TEMP as FLOAT rounded to decimal place // uncomment
        // else if (key === 'temp'){
        //     scheme[key].value = val.map((element) => Number.parseFloat(element).toFixed(1));
        // }
        else if (key ==='sun') {
            scheme[key].value[0] = val;
        }
        else {
            scheme[key].value = val;
        }
    }
}

// initial function which filters sensors used by specific object and adds icons scheme for each sensor
function isSensorActive(data, num, scheme, icons) {
    scheme[num] = {
        readings: {},
    };

    if (data.settings) {
        scheme[num] = {
            settings: data.settings,
        };
    }

    // array with sensors names as KEY and array with values as VALUES
    let readings = {};
    for (const [key, val] of Object.entries(icons)) {
        if (data.readings[key]) {
            readings[key] = {
                value: val.value,
                si: val.si,
                icon: val.icon,
                thresholds: val.thresholds,
                scope: val.scope,
                color: val.color,
                desc: val.desc,
                desc_arr: val.desc_arr,
                calculated: {}
            }
        }
    }

    scheme[num].readings = readings;
}

const commonFunctions = {
    isSensorActive,
    assignSetupToValues
}

export default commonFunctions;
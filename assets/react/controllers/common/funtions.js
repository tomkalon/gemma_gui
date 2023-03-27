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

        // Display TEMP as FLOAT rounded to decimal place
        if (key === 'temp'){
            scheme[key].value = val.map((element) => Number.parseFloat(element).toFixed(1));
        }

        // Display integer values as strings from Icons.js -> sensor_name.desc_arr[]
        else if (key ==='rain' || key ==='blow' || key ==='heat') {
            scheme[key] ? scheme[key].value = scheme[key].desc_arr[1] : scheme[key].value = scheme[key].desc_arr[0];
        }
        else {
            scheme[key].value = val;
        }
    }
}

// initial function which filters sensors used by specific object and adds icons scheme for each sensor
function isSensorActive(data, num, scheme, icons) {
    scheme[num] = {
        readings: {}
    };

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
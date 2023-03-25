import React from 'react';

// update SCHEME by the fetched data -> VALUES and setup icons
function assignSetupToValues(data, scheme) {
    for (const [key, val] of Object.entries(data)) {
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
        else {
            const $directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            let result = null;
            if (key === 'wind_direction') {
                for (let i = 0; i < $directions.length; i++) {
                    if (val[0] === $directions[i]) {
                        result = i;
                        break;
                    }
                }
            }
            scheme[key].calculated = [{
                icon: scheme[key].icon[result]
            }];
        }

        if (key ==='rain') {
            scheme[key] ? scheme[key].value = 'Deszcz' : scheme[key].value = '-';
        } else {
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
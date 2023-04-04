// noinspection JSCheckFunctionSignatures

import React from 'react';

// update stateSCHEME by the fetched data -> VALUES and setup icons
function assignValues(readings, stateScheme) {

    // KEY -> for example: temp, humid...; VAL -> si, thresholds, value...
    for (const [key, val] of Object.entries(readings)) {
        stateScheme[key].calculated = [];

        // icons if THRESHOLD is an integer array
        if (stateScheme[key].thresholds !== false) for (const i of Object.keys(val)) {
            for (const [index, item] of Object.entries(stateScheme[key].thresholds)) {
                if (val[i] <= item) {
                    stateScheme[key].calculated[i] = {
                        icon: stateScheme[key].icon[index]
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
                const $directions = stateScheme[key].desc_arr;
                for (let i = 0; i < $directions.length; i++) {
                    if (val[0].toUpperCase() === $directions[i]) {
                        result = i;
                        break;
                    }
                }
            }
            stateScheme[key].calculated = [{
                icon: stateScheme[key].icon[result]
            }];
        }

        // Display integer TINYINT values as strings from Icons.js -> sensor_name.desc_arr[]
        if (key === 'blow' || key === 'heat') {
            val[0] === '0' ? stateScheme[key].value = [stateScheme[key].desc_arr[1]] : stateScheme[key].value = [stateScheme[key].desc_arr[0]];
        } else if (key === 'rain') {
            val[0] === '0' ? stateScheme[key].value = [stateScheme[key].desc_arr[0]] : stateScheme[key].value = [stateScheme[key].desc_arr[1]];
        }

        // Display TEMP as FLOAT rounded to decimal place
        // else if (key === 'temp'){
        //     stateScheme[key].value = val.map((element) => Number.parseFloat(element).toFixed(1));
        // }

        else if (key === 'sun') {
            stateScheme[key].value = val;
        } else {
            stateScheme[key].value = val;
        }
    }
}

// initial function which filters sensors used by specific object and adds icons stateScheme for each sensor
function isSensorActive(data, num, stateScheme, icons) {
    stateScheme[num] = {
        readings: {}
    };

    if (data.settings) {
        stateScheme[num] = {
            settings: data.settings,
        };
    }
    if (data.time) {
        stateScheme[num] = {
            time: data.time,
        };
    }

    // array with sensors names as KEY and array with values as VALUES
    let readings = {};
    for (const [key, val] of Object.entries(icons)) {
        if (data.readings[key]) {
            readings[key] = {};
            for (const [index, element] of Object.entries(val)) {
                let sensorProperty = {};
                sensorProperty[index] = element;
                Object.assign(readings[key], sensorProperty);
            }
        }
    }

    stateScheme[num].readings = readings;
}

// save to scheme -> object ID & NAME
function getObjectInfo(data, num, scheme) {
    scheme[num] = {
        id: data.id, name: data.name
    }
}

const commonFunctions = {
    isSensorActive, assignValues, getObjectInfo
}

export default commonFunctions;
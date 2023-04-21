import React from 'react';
import $ from 'jquery'

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
            if (val[0] === '0') {
                stateScheme[key].boolValue = false;
                stateScheme[key].value = [stateScheme[key].desc_arr[1]];
            }
            else {
                stateScheme[key].boolValue = true;
                stateScheme[key].value = [stateScheme[key].desc_arr[0]];
            }
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
        id: data.id, name: data.name, description: data.description
    }
}

// prepare scheme->display to operate the carousel
function getCarouselDisplaySettings(sensorsCount, num, carousel, scheme) {
    let elementSize = null;
    let numInteger = Number.parseInt(num);

    // get OBJECT size and number of columns -> add number of columns to accumulator -> adder
    // set maxRows
    for (const [key, value] of Object.entries(carousel.blockSize)) {
        if (sensorsCount['sum'] <= value) {
            elementSize = key;
            carousel.adder += carousel.blockColumn[key];
            if (carousel.blockColumn[carousel.maxRows] < carousel.blockRows[key]) {
                carousel.maxRows = key;
            }
            break;
        }
    }

    // get OBJECT page number AND pagination buttons
    // END of Page
    if ((carousel.adder / (carousel.colPerPage * (carousel.pageCount + 1))) > 1) {
        carousel.pageCount++;
        let paginationBtn = `${carousel.paginationPageStart} - ${num}`;
        carousel.pagination.push(paginationBtn);
        carousel.paginationPageStart = numInteger + 1;
        carousel.pages[carousel.pageCount] = [];
    }
    // last ELEMENT
    if (numInteger === (carousel.numberOfObjects - 1)) {
        let paginationBtn;
        if (carousel.paginationPageStart === carousel.numberOfObjects) {
            paginationBtn = carousel.numberOfObjects;
        } else {
            paginationBtn = `${carousel.paginationPageStart} - ${carousel.numberOfObjects}`;
        }
        carousel.pagination.push(paginationBtn);
    }
    carousel.pages[carousel.pageCount].push(numInteger);

    // save to Object SCHEME
    // object size; object page
    scheme.display = {
        size: elementSize, page: carousel.pageCount
    }
}


function sendDataAPI (data) {

}

// ========= HANDLERS ==========
// ===  sava data handler ===
function saveSettingsData(data, name) {
    this.stateScheme[this.currentObject].settings[name] = data;
    this.setState({
        facility: this.stateScheme
    });
}

// ===  pagination ===
function carouselPaginationPageIndex(index, timeout) {
    this.carousel.page = index;
    $('#js-carousel-content').fadeOut(timeout);
    setTimeout(() => {
        this.setState({page: this.carousel.page}, () => {
            $('#js-carousel-content').fadeIn(timeout);
        });
    }, timeout);
}

// === sidebar arrows ===
function carouselSidebarPageIndex(index, timeout) {
    if (this.carousel.pageCount) {
        if (index === "prev") {
            this.carousel.page--;
        } else {
            this.carousel.page++;
        }
    }
    $('#js-carousel-content').fadeOut(timeout);
    setTimeout(() => {
        this.setState({page: this.carousel.page}, () => {
            $('#js-carousel-content').fadeIn(timeout);
        });
    }, timeout);
}

// === get DETAILS ===
function carouselSetActiveElement(index, timeout) {

    // if, when changing an object, another has no currently selected settings, the settings menu selection is reset
    if (!this.state.facility[index].readings[this.state.selectedSettings])
    {
        this.state.selectedSettings = false;
    }

    this.currentObject = index;
    $('#js-settings').fadeOut(timeout / 2);
    $('#js-object-detail').fadeOut(timeout);
    setTimeout(() => {
        this.setState({current: this.currentObject}, () => {
            $('#js-object-detail').fadeIn(timeout);
            $('#js-settings').fadeIn(timeout * 2);
        });
    }, timeout);
}

// === select Current Settings ===
function selectSettingsHandler (name, timeout) {
    this.selectedSettings = name;
    $('#js-settings-content').fadeOut(timeout);
    setTimeout(() => {
        this.setState({selectedSettings: this.selectedSettings}, () => {
            $('#js-settings-content').fadeIn(timeout);
        });
    }, timeout);
}

// export functions
const commonFunctions = {
    isSensorActive, assignValues, getObjectInfo, getCarouselDisplaySettings, carouselPaginationPageIndex, carouselSidebarPageIndex,
    carouselSetActiveElement, selectSettingsHandler, saveSettingsData
}

export default commonFunctions;
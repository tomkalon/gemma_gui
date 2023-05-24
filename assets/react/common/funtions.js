import React from 'react';
import $ from 'jquery'
import display from './display.json'

const apiAddressSrc = "/api";
const appAddressSrc = "/app";
const displaySettings = display;

// resolution check
function checkResolution(display) {
    let width = window.innerWidth;
    let resolution = display.resolution;
    for (const [key, value] of Object.entries(displaySettings.width)) {
        if (width > value) {
            display.resolution = key;
        }
    }
    if (resolution !== display.resolution) {
        return true;
    }
    return false;
}

function checkMenuType(display, current) {
    if (display.resolution === 'xxl') {
        display.menuType = 'carousel';
        display.colPerPage = 15;
    } else if (display.resolution === 'xl') {
        display.menuType = 'carousel';
        display.colPerPage = 12;
    } else if (display.resolution === 'lg') {
        display.menuType = 'carousel';
        display.colPerPage = 9;
    } else {
        if (current !== false) {
            display.menuType = 'single';
            display.colPerPage = null;
        } else {
            display.menuType = 'list';
            display.colPerPage = null;
        }
    }
}

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
            } else {
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
        stateScheme[num]['settings'] = data.settings;
    }
    if (data.alerts) {
        stateScheme[num]['alerts'] = data.alerts;
    }

    // array with sensors names as KEY and array with values as VALUES
    let readings = {};
    for (const [key, val] of Object.entries(icons)) {
        if (data.readings[key]) {
            readings[key] = {};
            if (typeof val === 'object') {
                for (const [index, element] of Object.entries(val)) {
                    let sensorProperty = {};
                    sensorProperty[index] = element;
                    Object.assign(readings[key], sensorProperty);
                }
            }
        }
    }
    stateScheme[num].readings = readings;
}

// save to scheme -> object ID & NAME
function getObjectInfo(data, num, scheme, counter) {
    scheme[num] = {
        id: data.id, name: data.name, order: counter, description: data.description, type: data.type, image: data.image
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
        carousel.pagination.push(`${carousel.paginationPageStart} - ${carousel.counter}`);
        carousel.paginationPageStart = carousel.counter + 1;
        carousel.pages[carousel.pageCount] = [];
    }
    // last ELEMENT
    if (carousel.counter === (carousel.numberOfObjects - 1)) {
        if (carousel.paginationPageStart === carousel.numberOfObjects) {
            carousel.pagination.push(carousel.numberOfObjects);
        } else {
            carousel.pagination.push(`${carousel.paginationPageStart} - ${carousel.numberOfObjects}`);
        }
    }
    carousel.pages[carousel.pageCount].push(numInteger);

    // save to Object SCHEME
    // object size; object page
    scheme.display = {
        size: elementSize, page: carousel.pageCount
    }
    carousel.counter++;
}

// update colPerPage
function updateCarouselColPerPage(carousel, facility, scheme, colPerPageMax) {
    carousel.numberOfObjects = facility.length;
    carousel.colPerPage = colPerPageMax;
    for (const [key, value] of Object.entries(facility)) {
        getCarouselDisplaySettings(value['sensors_count'], key, carousel, scheme[key]);
    }
    this.setState({
        carousel: carousel
    });
}


// prepare alerts indicators - isActive and isRead checking (once)
function getAlertsIndicators(stateScheme, alerts) {
    let indicators = {
        "sensor": {
            "active": false, "new": '', "icon": ''
        }, "hardware": {
            "active": false, "new": '', "icon": ''
        },
    };
    if (alerts) {
        if (alerts.sensor) {
            indicators.sensor.active = true;
            alerts.sensor.map((item) => {
                if (!item.isRead) indicators.sensor.new = 'blink';
            })
            indicators.sensor.icon = <i className={`gf gf-warning ${indicators.sensor.new}`}></i>;
        } else {
            indicators.sensor.active = false;
        }

        if (alerts.hardware) {
            indicators.hardware.active = true;
            alerts.hardware.map((item) => {
                if (!item.isRead) indicators.hardware.new = 'blink';
            })
            indicators.hardware.icon = <i className={`gf gf-damage ${indicators.hardware.new}`}></i>;
        } else {
            indicators.hardware.active = false;
        }
    }

    stateScheme['indicators'] = indicators;
}

// create settings buttons
const prepareSettingsButton = (id, selected, scheme, data, object, global, display, renderBtn, saveHandler, newRow) => {
    let buttonList = {};
    let counter = 0;
    if (selected !== false && scheme[selected] !== undefined) {
        let value;
        let color = '';
        for (const [key, element] of Object.entries(scheme[selected])) {

            // if there is color saved in scheme use it
            if (data[key].color) {
                color = data[key].color;
            }``

            // specific sensor settings
            if (object.settings[key] !== undefined) {

                // boolean
                if (data[key].bool !== undefined) {
                    object.settings[key] === true ? value = 1 : value = 0;
                    buttonList[counter] = renderBtn(id, key, data[key], data[key].values[value], object.settings[key], saveHandler);
                }

                // range
                else {
                    if (object.readings[element.rel] || display.environment[element.rel]) {
                        buttonList[counter] = renderBtn(id, key, data[key], object.settings[key], color, saveHandler);
                    }
                }
                counter++;
            }

            // global settings
            else if (global[key]) {
                if (display.environment[element.rel]) {
                    buttonList[counter] = renderBtn(id, key, data[key], global[key], color, saveHandler);
                }
                counter++;
            }

            if (element.separator) {
                buttonList[counter] = newRow();
                counter++;
            }
        }
    }
    return buttonList;
}

// get string data - prepare indicators class name
function getIndicatorsIcons (indicators) {
    let data = {
        hardware: undefined,
        sensor: undefined
    }
    if (indicators) {
        if (indicators.sensor.active) {
            data['sensor'] = indicators.sensor.icon;
        }
        if (indicators.hardware.active) {
            data['hardware'] = indicators.hardware.icon;
        }
    }
    return data;
}

// send data to API
function sendDataAPI(method, id, send, target) {
    if (typeof send['value'] === 'boolean') {
        if (send['value']) {
            send['value'] = 1;
        } else {
            send['value'] = 0;
        }
    }

    let apiAddress = apiAddressSrc;
    apiAddress += target;

    fetch(apiAddress, {
        method: method, headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(send),
    })
        .then((response) => response.json())
        .then(data => {})
        .catch((error) => {
            console.log("API communication error!");
            console.error("Error:", error);
        });
}

// ========= HANDLERS ==========
// ===  sava data handler ===
function saveSettingsData(id, data, name, isGlobal) {
    let send = {};
    send['name'] = name;
    send['value'] = data;

    if (isGlobal) {
        sendDataAPI('put', id, send, '/objects/global');
        this.global[name] = data;
        this.setState({
            global: this.global
        });
    } else {
        sendDataAPI('put', id, send, '/objects/' + id);
        this.stateScheme[this.currentObject].settings[name] = data;
        this.setState({
            facility: this.stateScheme
        });
    }
}

// ===  sava data handler ===
function saveApiData(id, entity, data) {
    sendDataAPI('put', id, data, '/' + entity + '/' + id);
}

// ===  pagination ===
function carouselPaginationPageIndex(index, timeout) {
    this.carousel.page = index;
    $('#js-carousel-content').fadeOut(timeout);
    setTimeout(() => {
        this.setState({currentPage: this.carousel.page}, () => {
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
        this.setState({currentPage: this.carousel.page}, () => {
            $('#js-carousel-content').fadeIn(timeout);
        });
    }, timeout);
}

// === get DETAILS ===
function carouselSetActiveElement(index, timeout) {

    // if, when changing an object, another has no currently selected settings, the settings menu selection is reset
    if (!this.state.facility[index].readings[this.state.selectedSettings]) {
        this.state.selectedSettings = false;
    }

    this.currentObject = index;
    $('#js-settings').fadeOut(timeout / 2);
    $('#js-object-detail').fadeOut(timeout);
    setTimeout(() => {
        this.setState({currentObject: this.currentObject}, () => {
            $('#js-object-detail').fadeIn(timeout);
            $('#js-settings').fadeIn(timeout * 2);
        });
    }, timeout);
}

// === select Current Settings ===
function selectSettingsHandler(name, timeout) {
    this.selectedSettings = name;
    $('#js-settings-content').fadeOut(timeout);
    setTimeout(() => {
        this.setState({selectedSettings: this.selectedSettings}, () => {
            $('#js-settings-content').fadeIn(timeout);
        });
    }, timeout);
}

function selectObjectHandler(number, target) {
    let address = appAddressSrc + '/' + number + '/' + target;
    window.location.href = address;
}

// export functions
const commonFunctions = {
    checkResolution,
    checkMenuType,
    isSensorActive,
    assignValues,
    getObjectInfo,
    prepareSettingsButton,
    getIndicatorsIcons,
    getCarouselDisplaySettings,
    carouselPaginationPageIndex,
    carouselSidebarPageIndex,
    carouselSetActiveElement,
    selectSettingsHandler,
    saveApiData,
    saveSettingsData,
    getAlertsIndicators,
    updateCarouselColPerPage,
    selectObjectHandler
}

export default commonFunctions;
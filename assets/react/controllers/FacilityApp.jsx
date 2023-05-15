import React, {Component} from 'react';
import "./../common/common.scss";

import Carousel from "./component/carousel/Carousel";
import SimpleMenu from "./component/simpleMenu/SimpleMenu";
import Details from "./component/details/Details";
import Settings from "./component/settings/Settings";
import sensors from "./../common/sensors.js"
import carousel from "./../common/carousel.json";
import commonFunctions from "./../common/funtions";

// ================================================================================
//  CLASS STRUCTURE & DESCRIPTION OF THE ACTION
//
// getFacility
// -> fetching DATA from API (values, objects)
// -> -> getObjectInfo::: like ID & NAME (create THIS.SCHEME) / functions.js
// -> -> isSensorActive::: assign settings from Icons.js to Objects Elements (create THIS.STATE_SCHEME) / functions.js
// -> -> assignSetupToValues::: calculate the given VALUES for specific SENSORS -> get current values and icons
//      (THIS.STATE_SCHEME) / functions.js
// -> -> getCarouselDisplaySettings::: prepare SCHEME (OBJECT DISPLAY - size)
//      & THIS.CAROUSEL to be displayed in CAROUSEL (PAGINATION, PAGES, MAX_ROWS, OBJECT_PER_PAGE etc.)
//      & THIS.STATE_SCHEME (CURRENT_PAGE)
//      / functions.js
//
//
// ==== functions which realize changing pages in Carousel
// carouselPaginationPageIndex
// carouselSidebarPageIndex
//
// ================================================================================
//  Carousel -> display Carousel -> /component/carousel/carousel.js
//  Details -> display Object details -> /component/details/details.js
//
// ================================================================================

export default class FacilityApp extends Component {

    constructor(props) {
        super(props);

        //const
        this.apiAddress = '/api/objects';
        this.refreshInterval = 5000;
        this.carousel = structuredClone(carousel);
        this.sensors = sensors;

        // var
        this.facility = [];
        this.time = {};
        this.objectsId = [];

        this.stateScheme = [];
        this.scheme = [];
        this.global = {};
        this.isInitialFetch = true;

        if (props.currentObject !== false) {
            this.currentObject = Number.parseInt(props.currentObject); // current Object
        } else {
            this.currentObject = props.currentObject;
        }
        this.selectedSettings = false; // selected settings of current object

        // state
        this.state = {}

        // display
        this.scrollPosition = 0;

        // function
        this.checkResolution = commonFunctions.checkResolution;
        this.checkMenuType = commonFunctions.checkMenuType;

        this.saveSettingsData = commonFunctions.saveSettingsData;
        this.assignValues = commonFunctions.assignValues;
        this.isSensorActive = commonFunctions.isSensorActive;
        this.getObjectInfo = commonFunctions.getObjectInfo;
        this.getAlertsIndicator = commonFunctions.getAlertsIndicators;
        this.getCarouselDisplaySettings = commonFunctions.getCarouselDisplaySettings;
        this.updateCarouselColPerPage = commonFunctions.updateCarouselColPerPage;
        this.prepareSettingsButton = commonFunctions.prepareSettingsButton;
        this.getIndicatorsIcons = commonFunctions.getIndicatorsIcons;

        // handlers
        this.carouselPaginationPageIndex = commonFunctions.carouselPaginationPageIndex;
        this.carouselSidebarPageIndex = commonFunctions.carouselSidebarPageIndex;
        this.carouselSetActiveElement = commonFunctions.carouselSetActiveElement;
        this.selectSettingsHandler = commonFunctions.selectSettingsHandler;
        this.selectObjectHandler = commonFunctions.selectObjectHandler;

        // events
        this.display = {
            resolution: false, menuType: false
        }

        this.checkResolution(this.display);
        this.checkMenuType(this.display, this.currentObject);
        this.getFacility();
    }

    getFacility() {
        fetch(this.apiAddress, {
            method: "GET", headers: {
                "Content-Type": "application/json",
            }, // body: JSON.stringify(this.query),
        })
            .then((response) => response.json())
            .then(data => {

                data.facility ? this.facility = data.facility : this.facility = false;
                data.time ? this.time = data.time : this.time = 0;
                data.global ? this.global = data.global : this.global = 0;

                // initial function which filters sensors used by specific object
                // and adds icons scheme for each sensor
                // RUN ONCE

                if (this.facility) {
                    if (this.isInitialFetch) {
                        if (this.display.menuType === 'carousel') {
                            this.carousel.numberOfObjects = Object.keys(this.facility).length;
                            this.carousel.colPerPage = this.display.colPerPage;
                        }

                        let objectCounter = 1;
                        // key -> object number; value -> object data (id, name, readings)
                        for (const [key, value] of Object.entries(this.facility)) {
                            this.objectsId.push(Number.parseInt(key));
                            this.getObjectInfo(value, Number.parseInt(key), this.scheme, objectCounter);
                            objectCounter++;
                            this.isSensorActive(value, key, this.stateScheme, this.sensors);
                            this.assignValues(value.readings, this.stateScheme[key].readings);
                            this.getAlertsIndicator(this.stateScheme[key], this.stateScheme[key].alerts);
                            if (this.display.menuType === 'carousel') {
                                this.getCarouselDisplaySettings(value['sensors_count'], key, this.carousel, this.scheme[key]);
                            }
                        }
                        this.isInitialFetch = false;
                    } else {
                        // update SCHEME by the fetched data -> VALUES and setup icons
                        for (const [key, value] of Object.entries(this.facility)) {
                            this.assignValues(value.readings, this.stateScheme[key].readings);
                            if (this.stateScheme[key].settings) {
                                this.stateScheme[key].settings = value.settings;
                            }
                            if (this.stateScheme[key].alerts) {
                                this.stateScheme[key].alerts = value.alerts;
                            } else {
                                this.stateScheme[key].alerts = [];
                            }
                            this.getAlertsIndicator(this.stateScheme[key], this.stateScheme[key].alerts);
                        }
                    }

                    // console.log('-----------------------------------------------');
                    // console.log('====FACILITY====');
                    // console.log('-----------------------------------------------');
                    // console.log("API data:");
                    // console.log(data);
                    // console.log("state:");
                    // console.log(this.stateScheme);
                    // console.log("scheme:");
                    // console.log(this.scheme);
                    // console.log("display:");
                    // console.log(this.carousel);
                    // console.log('-----------------------------------------------');

                    // save SCHEME to STATE
                    this.setState({
                        facility: this.stateScheme,
                        currentPage: this.carousel.page,
                        currentObject: this.currentObject,
                        selectedSettings: this.selectedSettings,
                        isDay: this.time['isDay'],
                        global: this.global,
                        carousel: this.carousel,
                        display: this.display
                    }, function () {
                    });
                } else {
                    console.log('Facility data is empty! There is no any objects to display!');
                }
            })
            .catch((error) => {
                console.log("API communication error!");
                console.error("Error:", error);
            });
    }

    render() {

        // select object component
        let objectMenu;

        // carousel component
        const pageState = this.state.currentPage; // selected carousel page
        let carouselData; // carousel display settings

        // details component
        let details; // component
        let stats = false; // stats button

        // settings component
        let settings; // component
        let global; // global settings data

        // objects DATA // FACILITY
        let facilityState; // objects sensors data
        let facilityInfo; // objects information
        let objectState = []; // single object sensors data
        let objectInfo = []; // single objects information
        let currentObject; // selected object
        let currentObjectInfo; // selected object information
        let currentObjectState; // selected object sensors data
        let selectedSettings; // selected objects settings
        let isDay; // current daytime

        // =======================================================================
        // render if there isn't initial rendering
        if (!this.isInitialFetch) {
            facilityState = this.state.facility;
            facilityInfo = this.scheme;
            currentObject = this.state.currentObject;
            isDay = this.state.isDay;
            global = this.state.global;

            currentObjectInfo = facilityInfo[currentObject];
            currentObjectState = facilityState[currentObject];
            selectedSettings = this.state.selectedSettings;

            if (this.currentObject !== false) {
                if (currentObjectState.settings) {
                    if (selectedSettings === false) {
                        selectedSettings = Object.keys(currentObjectState.readings)[0];
                    } else if (currentObjectState.readings[selectedSettings] === undefined) {
                        selectedSettings = Object.keys(currentObjectState.readings)[0];
                        this.selectedSettings = selectedSettings;
                    }
                }
            }

            // ======= CAROUSEL =======
            // carousel container
            if (this.state.display.menuType === 'carousel') {
                carouselData = this.state.carousel;
                objectMenu = <Carousel display={carouselData} state={facilityState} info={facilityInfo} page={pageState}
                                       current={currentObject} indicatorIcons={this.getIndicatorsIcons}
                                       sidebarHandler={this.carouselSidebarPageIndex.bind(this)}
                                       paginationHandler={this.carouselPaginationPageIndex.bind(this)}
                                       activeHandler={this.carouselSetActiveElement.bind(this)}/>;


                // ======= DETAILS =======
                // details container
                if (currentObject !== false && currentObject !== null) {
                    details = <Details info={currentObjectInfo} state={currentObjectState} isDay={isDay}
                                       stats={stats} indicatorIcons={this.getIndicatorsIcons}/>;
                }

                // ======= SETTINGS =======
                // settings container
                if (currentObject !== false && currentObject !== null && currentObjectState['settings'] && selectedSettings) {
                    settings = <Settings currentObject={currentObjectState} selectedSettings={selectedSettings}
                                         global={global} saveHandler={this.saveSettingsData.bind(this)}
                                         settingsHandler={this.selectSettingsHandler.bind(this)}
                                         id={facilityInfo[currentObject]['id']} displayLogic={this.prepareSettingsButton}
                                         simple={false}/>;
                }
                // ======= SMALL DISPLAY COMPONENTS =======
                // list -> all objects
            } else if (this.state.display.menuType === 'list') {
                objectMenu = <SimpleMenu state={facilityState} info={facilityInfo} handler={this.selectObjectHandler.bind(this)}
                                         indicatorIcons={this.getIndicatorsIcons}/>
                // single -> selected object
            } else if (this.state.display.menuType === 'single') {
                objectState[0] = facilityState[currentObject];
                objectInfo[0] = facilityInfo[currentObject];
                // object
                objectMenu = <SimpleMenu state={objectState} info={objectInfo} numberOfObjects={Object.keys(this.facility).length}
                                         indicatorIcons={this.getIndicatorsIcons} handler={this.selectObjectHandler.bind(this)}
                                         single={true} objectsId={this.objectsId}/>
                // settings
                if (currentObject !== false && currentObject !== null && currentObjectState['settings'] && selectedSettings) {
                    settings = <Settings currentObject={currentObjectState} selectedSettings={selectedSettings}
                                         global={global} saveHandler={this.saveSettingsData.bind(this)}
                                         settingsHandler={this.selectSettingsHandler.bind(this)}
                                         id={facilityInfo[currentObject]['id']} displayLogic={this.prepareSettingsButton}
                                         simple={true}/>;
                }
            }
        }
        // =======================================================================

        return (<div>
            <article className="object-menu-cover w-full border-b-4 dark:border-darker-450">
                {objectMenu}
            </article>
            <article className="container mx-auto">
                {details}
            </article>
            {settings}
        </div>)
    }

    componentDidMount() {
        // setInterval(() => this.getFacility(), this.refreshInterval);
        window.addEventListener('resize', () => {
            if (this.checkResolution(this.display)) {
                this.checkMenuType(this.display, this.currentObject);
                if (this.display.menuType === 'carousel') {
                    this.carousel = structuredClone(carousel);
                    this.updateCarouselColPerPage(this.carousel, this.facility, this.scheme, this.display.colPerPage);
                }
                this.getFacility();
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.getFacility);
    }
}
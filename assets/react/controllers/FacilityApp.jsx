import React, {Component} from 'react';
import Carousel from "./component/carousel/Carousel";
import Details from "./component/details/Details";
import Settings from "./component/settings/Settings";
import sensors from "./common/sensors.js"
import carousel from "./common/carousel";
import commonFunctions from "./common/funtions";

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
        this.apiAdress = '/api/objects';
        this.refreshInterval = 5000;
        this.carousel = carousel;
        this.sensors = structuredClone(sensors);

        // var
        this.stateScheme = [];
        this.scheme = [];
        this.isInitialFetch = true;

        this.currentObject = 0; // current Object
        this.selectedSettings = false; // selected settings of current object

        // state
        this.state = {}

        // display
        this.scrollPosition = 0;

        // function
        this.saveSettingsData = commonFunctions.saveSettingsData;
        this.assignValues = commonFunctions.assignValues;
        this.isSensorActive = commonFunctions.isSensorActive;
        this.getObjectInfo = commonFunctions.getObjectInfo;
        this.getCarouselDisplaySettings = commonFunctions.getCarouselDisplaySettings;
        this.carouselPaginationPageIndex = commonFunctions.carouselPaginationPageIndex;
        this.carouselSidebarPageIndex = commonFunctions.carouselSidebarPageIndex;
        this.carouselSetActiveElement = commonFunctions.carouselSetActiveElement;
        this.selectSettingsHandler = commonFunctions.selectSettingsHandler;
        this.getFacility();
    }

    getFacility() {
        fetch(this.apiAdress, {
            method: "GET", headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then(data => {

                let facility, time, global;
                data.facility ? facility = data.facility : facility = false;
                data.time ? time = data.time : time = 0;
                data.global ? global = data.global : global = 0;

                // initial function which filters sensors used by specific object
                // and adds icons scheme for each sensor
                // RUN ONCE

                if (facility) {
                    if (this.isInitialFetch) {
                        this.carousel.numberOfObjects = facility.length;

                        // key -> object number; value -> object data (id, name, readings)
                        for (const [key, value] of Object.entries(facility)) {
                            this.getObjectInfo(value, key, this.scheme);
                            this.isSensorActive(value, key, this.stateScheme, this.sensors);
                            this.assignValues(value.readings, this.stateScheme[key].readings);
                            this.getCarouselDisplaySettings(value['sensors_count'], key, this.carousel, this.scheme[key]);
                        }
                        this.isInitialFetch = false;
                    } else {

                        // update SCHEME by the fetched data -> VALUES and setup icons
                        for (const [key, value] of Object.entries(facility)) {
                            this.assignValues(value.readings, this.stateScheme[key].readings);
                            if (this.stateScheme[key].settings) {
                                this.stateScheme[key].settings = value.settings;
                            }
                        }
                    }


                    console.log('-----------------------------------------------');
                    console.log('====FACILITY====');
                    console.log('-----------------------------------------------');
                    console.log("API data:");
                    console.log(data);
                    console.log("state:");
                    console.log(this.stateScheme);
                    console.log("scheme:");
                    console.log(this.scheme);
                    console.log("display:");
                    console.log(this.carousel);
                    console.log('-----------------------------------------------');

                    // save SCHEME to STATE
                    this.setState({
                            facility: this.stateScheme,
                            page: this.carousel.page,
                            current: this.currentObject,
                            selectedSettings: this.selectedSettings,
                            isDay: time['isDay'],
                            global: global
                        },
                        function () {
                        });
                }
                else {
                    console.log('Facility data is empty! There is no any objects to display!');
                }
            })
            .catch((error) => {
                console.log("API communication error!");
                console.error("Error:", error);
            });
    }



    render() {
        // carousel
        const pageState = this.state.page;
        let display;
        let carousel;

        // objects DATA // FACILITY
        let facilityState; //
        let facilityInfo;
        let currentObject;
        let currentObjectInfo;
        let currentObjectState;
        let selectedSettings;
        let isDay;

        // details
        let details;

        // settings
        let settings;
        let global;

        // stats
        let stats = true;

        // =======================================================================
        // render if there isn't initial rendering
        if (!this.isInitialFetch) {
            facilityState = this.state.facility;
            facilityInfo = this.scheme;
            currentObject = this.state.current;
            isDay = this.state.isDay;
            global = this.state.global;

            currentObjectInfo = facilityInfo[Object.keys(facilityInfo)[currentObject]];
            currentObjectState = facilityState[Object.keys(facilityState)[currentObject]];
            selectedSettings = this.state.selectedSettings;

            // ======= CAROUSEL =======
            display = this.carousel;

            // carousel container
            carousel = <Carousel display={display} state={facilityState} info={facilityInfo} page={pageState}
                                 current={currentObject} sidebarHandler={this.carouselSidebarPageIndex.bind(this)}
                                 paginationHandler={this.carouselPaginationPageIndex.bind(this)}
                                 activeHandler={this.carouselSetActiveElement.bind(this)} />;

            // ======= DETAILS =======
            // details container
            if (currentObject !== false && currentObject !== null) {
                if (selectedSettings === false && currentObjectState.settings) {
                    selectedSettings = Object.keys(currentObjectState.readings)[0];
                }
                details = <Details current={currentObject} info={currentObjectInfo} selectedSettings={selectedSettings}
                                   handler={this.selectSettingsHandler.bind(this)}
                                   state={currentObjectState} isDay={isDay} stats={stats} />;
            }

            // ======= SETTINGS =======
            // settings container
            if (currentObject !== false && currentObject !== null && currentObjectState['settings'] && selectedSettings) {
                settings = <Settings currentObject={currentObjectState} selectedSettings={selectedSettings} global={global}
                                     saveHandler={this.saveSettingsData.bind(this)} />;
            }
        }
        // =======================================================================

        return (<div>
            <article className="carousel-bg w-full border-b-4 dark:border-darker-450">
                <div className="container mx-auto">
                    <div id="carousel" className="w-full pt-4">
                        {carousel}
                    </div>
                </div>
            </article>
            <article className="container mx-auto">
                {details}
            </article>
            {settings}
        </div>)
    }

    componentDidMount() {
        // setInterval(() => this.getFacility(), this.refreshInterval);
    }

    componentWillUnmount() {
        clearInterval(this.getFacility);
    }
}
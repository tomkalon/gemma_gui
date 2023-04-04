import React, {Component} from 'react';
import Carousel from "./component/carousel/Carousel";
import CarouselSidebar from "./component/carousel/CarouselSidebar";
import CarouselPagination from "./component/carousel/CarouselPagination";
import CarouselPage from "./component/carousel/CarouselPage";
import icons from "./common/icons";
import commonFunctions from "./common/funtions";
import Details from "./component/details/Details";

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
        this.refreshInterval = 5000;
        this.carousel = {
            blockSize: { // number of sensors
                sm: 4, md: 6, lg: 9, xl: 12, xxl: 16, x2l: 20, x3l: 24
            }, blockColumn: { // number of columns regarding number of sensors
                sm: 2, md: 2, lg: 3, xl: 4, xxl: 4, x2l: 5, x3l: 6
            }, blockRows: { // number of rows per size
                sm: 2, md: 3, lg: 3, xl: 3, xxl: 4, x2l: 4, x3l: 4
            }, maxRows: 0, // max object rows
            pageCount: 0, // number of pages
            pages: {0: []}, // object id in pages
            page: 0, // selected page
            adder: 0, // object columns accumulator -> to calculate number of pages
            colPerPage: 12, // maximum columns per pages
            numberOfObjects: null, // number of objects
            pagination: [], // array with pages labels in pagination
            paginationPageStart: 1 // label number of first object
        }
        this.facilitySettings = {
            settings: true, time: true, alerts: false,
        }

        // var
        this.stateScheme = [];
        this.scheme = [];
        this.currentObject = false;
        this.icons = icons;
        this.isInitialFetch = true;

        // state
        this.state = {
            facility: {}
        }

        // function
        this.assignValues = commonFunctions.assignValues;
        this.isSensorActive = commonFunctions.isSensorActive;
        this.getObjectInfo = commonFunctions.getObjectInfo;
        this.getCarouselDisplaySettings = commonFunctions.getCarouselDisplaySettings;
        this.carouselPaginationPageIndex = commonFunctions.carouselPaginationPageIndex;
        this.carouselSidebarPageIndex = commonFunctions.carouselSidebarPageIndex;
        this.carouselSetActiveElement = commonFunctions.carouselSetActiveElement;
        this.getFacility();
    }

    getFacility() {
        fetch('/api/objects', {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(this.facilitySettings),
        })
            .then((response) => response.json())
            .then(data => {
                let facility, time;
                if (data.facility) facility = data.facility;
                if (data.time) time = data.time;

                // initial function which filters sensors used by specific object
                // and adds icons scheme for each sensor
                // RUN ONCE
                if (this.isInitialFetch) {
                    this.carousel.numberOfObjects = facility.length;

                    // key -> object number; value -> object data (id, name, readings)
                    for (const [key, value] of Object.entries(facility)) {
                        this.getObjectInfo(value, key, this.scheme);
                        this.isSensorActive(value, key, this.stateScheme, icons);
                        this.assignValues(value.readings, this.stateScheme[key].readings);
                        this.getCarouselDisplaySettings(value['sensors_count'], key, this.carousel, this.scheme[key]);
                    }
                    this.isInitialFetch = false;
                } else {
                    // update SCHEME by the fetched data -> VALUES and setup icons
                    for (const [key, value] of Object.entries(facility)) {
                        this.assignValues(value.readings, this.stateScheme[key].readings);
                    }
                }

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
                    facility: this.stateScheme, page: this.carousel.page, current: this.currentObject, isDay: time['isDay']
                });


            })
            .catch((error) => {
                alert("BŁĄD KOMUNIKACJI Z API!");
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
        let isDay;

        // details
        let details;

        // =======================================================================
        // render if there isn't initial rendering
        if (!this.isInitialFetch) {
            facilityState = this.state.facility;
            facilityInfo = this.scheme;
            currentObject = this.state.current;
            isDay = this.state.isDay;

            currentObjectInfo = facilityInfo[Object.keys(facilityInfo)[currentObject]];
            currentObjectState = facilityState[Object.keys(facilityState)[currentObject]];

            // ======= CAROUSEL =======
            display = this.carousel;
            // carousel container
            carousel = <Carousel display={display} state={facilityState} info={facilityInfo} page={pageState}
                                 current={currentObject} sidebarHandler={this.carouselSidebarPageIndex.bind(this)}
                                 paginationHandler={this.carouselPaginationPageIndex.bind(this)}
                                 activeHandler={this.carouselSetActiveElement.bind(this)}/>;

            // ======= DETAILS =======
            // details container
            if (currentObject !== false) {
                details = <Details current={currentObject} info={currentObjectInfo} state={currentObjectState} isDay={isDay}/>;
            }

        }
        // =======================================================================

        return (<div>
            <article className="w-full dark:bg-darker-500 border-b-4 dark:border-darker-450">
                <div className="container mx-auto">
                    <div id="carousel" className="w-full py-4">
                        {carousel}
                    </div>
                </div>
            </article>
            <article className="container mx-auto">
                {details}
            </article>
            <article className="setup">
            </article>
        </div>)
    }

    componentDidMount() {
        // setInterval(() => this.getFacility(), this.refreshInterval);
    }

    componentWillUnmount() {
        clearInterval(this.getFacility);
    }
}
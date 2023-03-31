import React, {Component} from 'react';
import Carousel from "./component/carousel/Carousel";
import CarouselSidebar from "./component/carousel/CarouselSidebar";
import CarouselPagination from "./component/carousel/CarouselPagination";
import CarouselPage from "./component/carousel/CarouselPage";
import icons from "./setup/icons";
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
            settings: true,
            time: false,
            alerts: false,
        }

        // var
        this.stateScheme = [];
        this.scheme = [];
        this.currentObject = null;
        this.icons = structuredClone(icons);
        this.isInitialFetch = true;
        this.time = null;

        // state
        this.state = {
            facility: {}
        }

        // function
        this.assignSetupToValues = commonFunctions.assignSetupToValues;
        this.isSensorActive = commonFunctions.isSensorActive;
        this.getObjectInfo = commonFunctions.getObjectInfo;
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

                let facility, settings, alerts;
                if (data.facility) facility = data.facility;
                if (data.settings) settings = data.settings;
                if (data.alerts) alerts = data.alerts;

                console.log(data);

                // initial function which filters sensors used by specific object
                // and adds icons scheme for each sensor
                // RUN ONCE
                if (this.isInitialFetch) {
                    this.carousel.numberOfObjects = facility.length;
                    for (const [key, value] of Object.entries(facility)) {
                        this.getObjectInfo(value, key, this.scheme);
                        this.isSensorActive(value, key, this.stateScheme, icons);
                        this.assignSetupToValues(value.readings, this.stateScheme[key].readings);
                        this.getCarouselDisplaySettings(value['sensors_count'], key, this.carousel, this.scheme[key]);
                    }
                    this.isInitialFetch = false;
                } else {
                    // update SCHEME by the fetched data -> VALUES and setup icons
                    for (const [key, value] of Object.entries(facility)) {
                        this.assignSetupToValues(value.readings, this.stateScheme[key].readings);
                    }
                }

                // save SCHEME to STATE
                this.setState({facility: this.stateScheme, page: this.carousel.page, current: this.currentObject});

            })
            .catch((error) => {
                alert("BŁĄD KOMUNIKACJI Z API!");
                console.error("Error:", error);

            });
    }

    getCarouselDisplaySettings(sensorsCount, num, carousel, scheme) {
        let elementSize = null;
        let maxRows = null;
        let numInteger = Number.parseInt(num);

        // get OBJECT size and number of columns -> add number of columns to accumulator -> adder
        for (const [key, value] of Object.entries(carousel.blockSize)) {
            if (sensorsCount['sum'] <= value) {
                elementSize = key;
                carousel.adder += carousel.blockColumn[key];
                if (carousel.maxRows < carousel.blockRows[key]) {
                    maxRows = carousel.blockRows[key];
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

    carouselPaginationPageIndex(index) {
        this.carousel.page = index;
        this.setState({page: index});
    }

    carouselSidebarPageIndex(index) {
        if (this.carousel.pageCount) {
            if (index === "prev") {
                this.carousel.page--;
            } else {
                this.carousel.page++;
            }
        }
        this.setState({page: this.carousel.page});
    }

    render() {

        // dev helper
        let current = 0;

        // carousel
        let pageState = this.state.page;
        let display;

        let carouselShowPage;
        let carouselPagination;
        let prevCarouselSideBar;
        let nextCarouselSideBar;

        let prevIsActive = "hidden";
        let nextIsActive = "hidden";

        // objects DATA // FACILITY
        let facilityState;
        let settingsState;
        let facilityInfo;
        let currentObjectInfo = null;
        let currentObjectState = null;


        // =======================================================================
        // render if there isn't initial rendering
        if (!this.isInitialFetch) {
            facilityState = this.state.facility;
            settingsState = this.state.settings;
            facilityInfo = this.scheme;
            currentObjectInfo = facilityInfo[Object.keys(facilityInfo)[current]];
            currentObjectState = facilityState[Object.keys(facilityState)[current]];

            // ======= CAROUSEL =======
            display = this.carousel;

            // show carousel navigation sidebar dependent on selected page number
            if (this.carousel.pageCount) {
                if (pageState === 0) {
                    prevIsActive = "hidden";
                    nextIsActive = "block";
                } else {
                    prevIsActive = "block";
                }

                if (pageState === this.carousel.pageCount) {
                    prevIsActive = "block";
                    nextIsActive = "hidden";
                } else {
                    nextIsActive = "block";
                }
            }

            // carousel content block
            carouselShowPage = <CarouselPage
                page={pageState} pages={display.pages[pageState]} objectsState={facilityState}
                objectsInfo={facilityInfo} maxRow={display.maxRows}/>;

            // carousel pagination block
            carouselPagination = <CarouselPagination
                pagination={display.pagination} active={pageState} handler={this.carouselPaginationPageIndex.bind(this)}/>;

            // carousel navigations blocks
            prevCarouselSideBar = <CarouselSidebar
                direction={"prev"} directionIcon={"gf-left-arrow"} visibility={prevIsActive}
                handler={this.carouselSidebarPageIndex.bind(this)}/>;
            nextCarouselSideBar = <CarouselSidebar
                direction={"next"} directionIcon={"gf-right-arrow"} visibility={nextIsActive}
                handler={this.carouselSidebarPageIndex.bind(this)}/>;
        }
        // =======================================================================

        return (<div>
            <article className="all w-full dark:bg-darker-500 border-b-4 dark:border-darker-450">
                <div className="container mx-auto">
                    <div id="carousel" className="w-full py-4">
                        <Carousel showPage={carouselShowPage} pagination={carouselPagination} prevSideBar={prevCarouselSideBar}
                                  nextSideBar={nextCarouselSideBar}/>
                    </div>
                </div>
            </article>
            <article className="container mx-auto">
                <Details current={current} info={currentObjectInfo} state={currentObjectState}/>
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
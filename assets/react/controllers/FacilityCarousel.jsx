import React, {Component} from 'react';
import CarouselSidebar from "./component/carousel/CarouselSidebar";
import CarouselPagination from "./component/carousel/CarouselPagination";
import CarouselPage from "./component/carousel/CarouselPage";
import icons from "./setup/icons";
import commonFunctions from "./common/funtions";
import {max} from "@popperjs/core/lib/utils/math";

export default class FacilityCarousel extends Component {

    constructor(props) {
        super(props);

        //const
        this.refreshInterval = 5000;
        this.obiectSettings = {
            settings: {
                'temp_day': true,
                'temp_night': true,
                'temp_control_day': true,
                'temp_control_night': true,
                'humid': true,
                'humid_control_day': true,
                'humid_control_night': true,
                'name': true
            },
        };
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

        // var
        this.stateScheme = [];
        this.scheme = [];
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
            }, body: JSON.stringify(this.obiectSettings),
        })
            .then((response) => response.json())
            .then(data => {

                let facility = data.facility;
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
                this.setState({facility: this.stateScheme, page: this.carousel.page});

            })
        .catch((error) => {
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
            }
            else {
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

    paginationPageIndex(index) {
        this.setState({page: index});
    }

    sidebarPageIndex(index) {
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
        let pageState = this.state.page;
        let facilityState;
        let facilityInfo;
        let display;

        let showPage;
        let pagination;
        let prevSideBar;
        let nextSideBar;

        let prevIsActive = "hidden";
        let nextIsActive = "hidden";

        // show carousel navigation sidebar dependent on selected page number
        if (this.carousel.pageCount) {
            if (this.carousel.page === 0) {
                prevIsActive = "hidden";
                nextIsActive = "block";
            } else {
                prevIsActive = "block";
            }

            if (this.carousel.page === this.carousel.pageCount) {
                prevIsActive = "block";
                nextIsActive = "hidden";
            } else {
                nextIsActive = "block";
            }
        }

        // render if there isn't initial rendering
        if (!this.isInitialFetch) {
            facilityState = this.state.facility;
            facilityInfo = this.scheme;
            display = this.carousel;

            // carousel content block
            showPage = <CarouselPage
                page={pageState} pages={display.pages[pageState]} objectsState={facilityState}
                objectsInfo={facilityInfo} maxRow={display.maxRows}/>;

            // carousel pagination block
            pagination = <CarouselPagination
                pagination={display.pagination} active={pageState} handler={this.paginationPageIndex.bind(this)}/>;

            // carousel navigations blocks
            prevSideBar = <CarouselSidebar
                direction={"prev"} directionIcon={"gf-left-arrow"} visibility={prevIsActive}
                handler={this.sidebarPageIndex.bind(this)}/>;
            nextSideBar = <CarouselSidebar
                direction={"next"} directionIcon={"gf-right-arrow"} visibility={nextIsActive}
                handler={this.sidebarPageIndex.bind(this)}/>;
        }

        return (<div className={`row flex`}>
            {prevSideBar}
            <div className={`flex flex-grow flex-col justify-center`}>
                {showPage}
                <div className={`row carousel-pagination`}>
                    {pagination}
                </div>
            </div>
            {nextSideBar}
        </div>)
    }

    componentDidMount() {
        // setInterval(() => this.getFacility(), this.refreshInterval);
    }

    componentWillUnmount() {
        clearInterval(this.getFacility);
    }
}
import React, {Component} from 'react';
import CarouselSidebar from "./component/carousel/CarouselSidebar";
import CarouselPagination from "./component/carousel/CarouselPagination";
import CarouselPage from "./component/carousel/CarouselPage";
import icons from "./setup/icons";
import commonFunctions from "./common/funtions";

export default class FacilityCarousel extends Component {

    constructor(props) {
        super(props);

        //const
        this.refreshInterval = 3000;
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
            }
        };
        this.carousel = {
            blockSize: { // number of sensors
                sm: 4, md: 6, lg: 9, xl: 12, xxl: 16, x2l: 20, x3l: 24
            }, blockColumn: { // number of columns regarding number of sensors
                sm: 2, md: 3, lg: 3, xl: 4, xxl: 4, x2l: 5, x3l: 6
                //
            }, pageCount: 0, // number of pages
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

        // state
        this.state = {
            facility: {}
        }

        // function
        this.assignSetupToValues = commonFunctions.assignSetupToValues;
        this.isSensorActive = commonFunctions.isSensorActive;
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
                // initial function which filters sensors used by specific object
                // and adds icons scheme for each sensor
                // RUN ONCE
                if (this.isInitialFetch) {
                    this.carousel.numberOfObjects = data.length;
                    for (const [key, value] of Object.entries(data)) {
                        this.getObjectInfo(value, key, this.scheme);
                        this.isSensorActive(value, key, this.stateScheme, icons);
                        this.assignSetupToValues(value.readings, this.stateScheme[key].readings);
                        this.getCarouselDisplaySettings(value['sensors_count'], key, this.carousel, this.scheme[key]);
                    }
                    this.isInitialFetch = false;
                } else {
                    // update SCHEME by the fetched data -> VALUES and setup icons
                    for (const [key, value] of Object.entries(data)) {
                        this.assignSetupToValues(value.readings, this.stateScheme[key].readings);
                    }
                }

                // save SCHEME to STATE
                this.setState({facility: this.stateScheme, display: this.carousel, page: this.carousel.page});
            })
        // .catch((error) => {
        //     console.error("Error:", error);
        // });
    }

    getObjectInfo(data, num, scheme) {
        scheme[num] = {
            id: data.id, name: data.name
        }
    }

    getCarouselDisplaySettings(sensorsCount, num, carousel, scheme) {
        let elementSize = null;
        let numInteger = Number.parseInt(num);

        // get OBJECT size and number of columns -> add number of columns to accumulator -> adder
        for (const [key, value] of Object.entries(carousel.blockSize)) {
            if (sensorsCount['sum'] <= value) {
                elementSize = key;
                carousel.adder += carousel.blockColumn[key];
                break;
            }
        }

        // get OBJECT page number AND pagination buttons
        if ((carousel.adder / (carousel.colPerPage * (carousel.pageCount + 1))) > 1) {
            carousel.pageCount++;
            let paginationBtn = `${carousel.paginationPageStart} - ${num}`;
            carousel.pagination.push(paginationBtn);
            carousel.paginationPageStart = numInteger + 1;
            carousel.pages[carousel.pageCount] = [];
        } else {
            if (numInteger === (carousel.numberOfObjects - 1)) {
                let paginationBtn = `${carousel.paginationPageStart} - ${carousel.numberOfObjects}`;
                carousel.pagination.push(paginationBtn);
            }
        }
        carousel.pages[carousel.pageCount].push(numInteger);

        // save to Object SCHEME
        // object size; object page
        scheme.display = {
            size: elementSize, page: carousel.pageCount
        }
    }

    paginationPageIndex(index) {
        this.carousel.page = index;
        this.setState({display: this.carousel});
    }

    sidebarPageIndex(index) {
        if (this.carousel.pageCount) {

            if (index === "prev") {
                this.carousel.page--;
            } else {
                this.carousel.page++;
            }
        }
        this.setState({display: this.carousel});
    }

    render() {
        let displayState;
        let facilityState;
        let facilityInfo;

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
            displayState = this.state.display;
            facilityState = this.state.facility;
            facilityInfo = this.scheme;

            // carousel content block
            showPage = <CarouselPage
                page={displayState.page} pages={displayState.pages[displayState.page]} objectsState={facilityState}
                objectsInfo={facilityInfo}/>;

            // carousel pagination block
            pagination = <CarouselPagination
                pagination={displayState.pagination} active={displayState.page} handler={this.paginationPageIndex.bind(this)}/>;

            // carousel navigations blocks
            prevSideBar = <CarouselSidebar
                direction={"prev"} directionIcon={"gf-left-arrow"} visibility={prevIsActive}
                handler={this.sidebarPageIndex.bind(this)}/>;
            nextSideBar = <CarouselSidebar
                direction={"next"} directionIcon={"gf-right-arrow"} visibility={nextIsActive}
                handler={this.sidebarPageIndex.bind(this)}/>;

            console.log(this.scheme);
            console.log(this.stateScheme);
            console.log(this.state);
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
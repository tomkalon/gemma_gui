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
            }, pageCount: 0, pages: {0: []}, page: 0, adder: 0, colPerPage: 12, numberOfObjects: null, pagination: [], paginationPageStart: 1
        }

        // var
        this.scheme = [];
        this.icons = structuredClone(icons);
        this.isInitialFetch = true;

        // state
        this.state = {
            facility: {},
            display: {},
            page: 0
        }

        // function
        this.assignSetupToValues = commonFunctions.assignSetupToValues;
        this.isSensorActive = commonFunctions.isSensorActive;
        this.getFacility();

        // dev
        this.counter = 0;
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
                        this.isSensorActive(value, key, this.scheme, icons);
                        this.assignSetupToValues(value.readings, this.scheme[key].readings);
                        this.getCarouselDisplaySettings(value['sensors_count'], key, this.scheme[key]);
                    }
                    this.isInitialFetch = false;
                } else {
                    // update SCHEME by the fetched data -> VALUES and setup icons
                    for (const [key, value] of Object.entries(data)) {
                        this.assignSetupToValues(value.readings, this.scheme[key].readings);
                    }
                }

                // save SCHEME to STATE
                this.setState({facility: this.scheme, display: this.carousel, page: this.carousel.page});
            })
            // .catch((error) => {
            //     console.error("Error:", error);
            // });
    }

    getCarouselDisplaySettings(sensorsCount, num, scheme) {
        let elementSize = null;
        let numInteger = Number.parseInt(num);

        // get OBJECT size and number of columns -> add number of columns to accumulator -> adder
        for (const [key, value] of Object.entries(this.carousel.blockSize)) {
            if (sensorsCount['sum'] <= value) {
                elementSize = key;
                this.carousel.adder += this.carousel.blockColumn[key];
                break;
            }
        }

        // get OBJECT page number AND pagination buttons
        if ((this.carousel.adder / (this.carousel.colPerPage * (this.carousel.pageCount + 1))) > 1) {
            this.carousel.pageCount++;
            let paginationBtn = `${this.carousel.paginationPageStart} - ${num}`;
            this.carousel.pagination.push(paginationBtn);
            this.carousel.paginationPageStart = numInteger + 1;
            this.carousel.pages[this.carousel.pageCount] = [];
        } else {
            if (numInteger === (this.carousel.numberOfObjects - 1)) {
                let paginationBtn = `${this.carousel.paginationPageStart} - ${this.carousel.numberOfObjects}`;
                this.carousel.pagination.push(paginationBtn);
            }
        }
        this.carousel.pages[this.carousel.pageCount].push(numInteger);

        // save to Object SCHEME
        // object size; object page
        scheme.display = {
            size: elementSize, page: this.carousel.pageCount
        }
    }

    paginationPageIndex(index) {
        this.carousel.page = index;
        this.setState({display: this.carousel});
    }

    sidebarPageIndex(index) {
        console.log(index);

        // this.carousel.page = index;
        // this.setState({display: this.carousel});
    }

    render() {
        let displayState;
        let facilityState;

        let showPage;
        let pagination;
        let prevSideBar;
        let nextSideBar;

        let sidebarIsActive = false;

        if (!this.isInitialFetch) {
            displayState = this.state.display;
            facilityState = this.state.facility;
            showPage = <CarouselPage page={displayState.page} pages={displayState.pages[displayState.page]} objects={facilityState}/>;
            pagination = <CarouselPagination pagination={displayState.pagination} active={displayState.page} handler={this.paginationPageIndex.bind(this)}/>;
            prevSideBar = <CarouselSidebar direction={"prev"} directionIcon={"gf-left-arrow"} isActive={sidebarIsActive} handler={this.sidebarPageIndex.bind(this)} />;
            nextSideBar = <CarouselSidebar direction={"next"} directionIcon={"gf-right-arrow"} isActive={sidebarIsActive} handler={this.sidebarPageIndex.bind(this)} />;
            this.counter++;
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
        setInterval(() => this.getFacility(), this.refreshInterval);
    }
    componentWillUnmount() {
        clearInterval(this.getFacility);
    }
}
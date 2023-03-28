import React, {Component} from 'react';
import CarouselSidebar from "./component/carousel/CarouselSidebar";
import icons from "./setup/icons";
import commonFunctions from "./common/funtions";

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
            }
        };
        this.carousel = {
            blockSize: { // number of sensors
                sm: 4, md: 6, lg: 9, xl: 12, xxl: 16, x2l: 20, x3l: 24
            }, blockColumn: { // number of columns regarding number of sensors
                sm: 2, md: 3, lg: 3, xl: 4, xxl: 4, x2l: 5, x3l: 6
                //
            }, page: 0, adder: 0, colPerPage: 12
        }

        // var
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
                console.log(this.scheme);

                // save SCHEME to STATE
                this.setState({facility: this.scheme});
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    getCarouselDisplaySettings(sensorsCount, num, scheme) {

        let elementSize = null;
        // get OBJECT size and number of columns -> add number of columns to accumulator -> adder
        for (const [key, value] of Object.entries(this.carousel.blockSize)) {
            if (sensorsCount['sum'] <= value) {
                elementSize = key;
                this.carousel.adder += this.carousel.blockColumn[key];
                break;
            }
        }

        // get OBJECT page number
        if ((this.carousel.adder / (this.carousel.colPerPage * (this.carousel.page + 1))) > 1) {
            this.carousel.page++;
        }

        // save to Object SCHEME
        // object size; object page
        scheme.display = {
            size: elementSize, page: this.carousel.page,
        }
    }

    render() {
        return (<div className={`row flex`}>
            <CarouselSidebar direction={"prev"} directionIcon={"gf-left-arrow"}/>
            <div className={`flex flex-grow flex-col justify-center`}>
                <div className={'row carousel-content'}>
                    <div
                        className={`item bg-gradient-to-br dark:from-darker-100 dark:to-darker-200 rounded-md cursor-pointer shadow-md dark:shadow-gray-900/30`}>
                        <div
                            className={`label w-auto rounded-t-md uppercase border-b dark:border-darker-300 dark:bg-darker-700 dark:text-darker-100`}>
                            <span>NAZWA OBIEKTU</span><span className={`alert`}><i className={`gf gf-damage`}></i><i
                            className={`gf gf-warning`}></i></span>
                        </div>

                        <div className={`box uppercase`}>
                            <div className={`inner`}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row carousel-pagination`}>
                    <div className={`mt-6 py-2 gap-x-6 flex flex-grow justify-center`}>
                        <div className={'item'}>
                            <span>1 - 4</span>
                        </div>
                        <div className={'item'}>
                            <span>5 - 6</span>
                        </div>
                    </div>
                </div>
            </div>
            <CarouselSidebar direction={"next"} directionIcon={"gf-right-arrow"}/>
        </div>)
    }

    componentDidMount() {
        // setInterval(() => this.getFacility(), this.refreshInterval = 5000);
    }
}
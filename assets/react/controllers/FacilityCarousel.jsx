import React, {Component} from 'react';
import icons from "./setup/icons";
import commonFunctions from "./common/funtions";

export default class FacilityCarousel extends Component {

    constructor(props) {
        super(props);

        //const
        this.refreshInterval = 5000;
        this.obiectSettings = {
            settings: [
                'temp_day', 'temp_night', 'temp_control_day', 'temp_control_night',
                'humid', 'humid_control_day', 'humid_control_night'
            ]};

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
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.obiectSettings),
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                // initial function which filters sensors used by specific object
                // and adds icons scheme for each sensor
                // RUN ONCE
                if (this.isInitialFetch) {
                    for (const [key, value] of Object.entries(data)) {
                        this.isSensorActive(value, key, this.scheme, icons);
                    }
                    this.isInitialFetch = false;
                }
                console.log(this.scheme);
                // update SCHEME by the fetched data -> VALUES and setup icons
                for (const [key, value] of Object.entries(data)) {
                    this.assignSetupToValues(value.readings, this.scheme[key].readings);
                }

                // save SCHEME to STATE
                this.setState({facility: this.scheme});
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    render() {
        return (
            <div>
                <div className={`row flex`}>
                    <div className={`carousel-sidebar`}>
                        <div className={`carousel-sidebar-prev`}>
                            <span><i className={`gf gf-left-arrow`}></i></span>
                        </div>
                    </div>
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
                    <div className={`carousel-sidebar`}>
                        <div className={`carousel-sidebar-next`}>
                            <span><i className={`gf gf-right-arrow`}></i></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        setInterval(() => this.getFacility(), this.refreshInterval = 5000);
    }
}
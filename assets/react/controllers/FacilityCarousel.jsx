import React, {Component} from 'react';
import weather from "./setup/Weather";

export default class FacilityCarousel extends Component {

    constructor(props) {
        super(props);
        this.data = weather;
        this.state = {
            weather: {}
        }
        this.getObjects();
    }

    componentDidMount() {
        // setInterval(() => this.getWeather(), 5000);
    }

    getObjects() {
        fetch('/api/objects')
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                // this.assignSetupToValues (data, this.data);
                // this.setState({weather: this.data});
            });
    }

    assignSetupToValues(data, obj) {
        for (const [key, val] of Object.entries(data)) {
            obj[key].value = val;
        }
    }

    render() {
        return (
            <div>
                <div className="row flex">
                    <div className="carousel-sidebar">
                        <div className="carousel-sidebar-prev">
                            <span><i className="gf gf-left-arrow"></i></span>
                        </div>
                    </div>
                    <div className="flex flex-grow flex-col justify-center">

                        <div className={'row carousel-content'}>
                            <div
                                className="item bg-gradient-to-br dark:from-darker-100 dark:to-darker-200 rounded-md cursor-pointer shadow-md dark:shadow-gray-900/30">
                                <div
                                    className="label w-auto rounded-t-md uppercase border-b dark:border-darker-300 dark:bg-darker-700 dark:text-darker-100">
                                    <span>NAZWA OBIEKTU</span><span className="alert"><i className="gf gf-damage"></i><i
                                    className="gf gf-warning"></i></span>
                                </div>

                                <div className="box uppercase">
                                    <div className="inner">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`row carousel-pagination`}>
                            <div className="mt-6 py-2 gap-x-6 flex flex-grow justify-center">
                                <div className="item">
                                    <span>1 - 4</span>
                                </div>
                                <div className="item">
                                    <span>5 - 6</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-sidebar">
                        <div className="carousel-sidebar-next">
                            <span><i className="gf gf-right-arrow"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
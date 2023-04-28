import React, {Component} from 'react';
import WeatherItem from "./component/weather/WeatherItem"
import './component/weather/weather.scss'
import sensors from "./../common/sensors.js";
import commonFunctions from "./../common/funtions";

export default class WeatherBar extends Component {
    constructor(props) {
        super(props);

        //const
        this.refreshInterval = 5000;
        this.sensors = sensors;

        // var
        this.stateScheme = [];
        this.isInitialFetch = true;

        // state
        this.state = {
            weather: {}
        }

        // function
        this.assignValues = commonFunctions.assignValues;
        this.isSensorActive = commonFunctions.isSensorActive;
        this.getData();
    }

    getData() {
        fetch('/api/weather', {
            method: "POST", headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(data => {

                // set data STRUCTURE for specific functions
                data = [{
                    readings: data
                }]

                // initial function which filters sensors used by specific object
                // and adds icons scheme for each sensor
                // RUN ONCE
                if (this.isInitialFetch) {
                    this.isSensorActive(data[0], 0, this.stateScheme, this.sensors);
                    this.isInitialFetch = false;
                }

                // update SCHEME by the fetched data -> VALUES and setup icons
                this.assignValues(data[0].readings, this.stateScheme[0].readings);

                console.log('-----------------------------------------------');
                console.log('====WEATHER====');
                console.log('-----------------------------------------------');
                console.log(this.stateScheme[0]);

                // save SCHEME to STATE
                this.setState({weather: this.stateScheme[0].readings});
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    render() {
        return (<div
            className="weather-bar shadow-md dark:shadow-gray-900/30 bg-gradient-to-b bg-amber-100
             dark:from-darker-900 dark:to-darker-800 border-b border-amber-300 dark:border-darker-500">
            <div className={`container mx-auto px-2 flex`}>
                <div className={`js-weather`}>
                    <div className={`item item-label text-center pr-4 mt-0.5 hidden lg:block`}>
                        <span className={`text-darker-200`}>Odczyty</span>
                        <p>Zewnętrzne</p>
                    </div>
                    {Object.entries(this.state.weather).map(([key, item]) => {
                        return (<div key={key} className={`item text-center`}>
                            <WeatherItem icon={item.calculated[0].icon} color={item.color} value={item.value} si={item.si}/>
                        </div>)
                    })}
                </div>
            </div>
        </div>);
    }

    componentDidMount() {
        // setInterval(() => this.getData(), this.refreshInterval);
    }

    componentWillUnmount() {
        clearInterval(this.getData);
    }
}
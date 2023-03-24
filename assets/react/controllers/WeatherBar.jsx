import React, {Component} from 'react';
import './setup/Icons';
import icons from "./setup/Icons";

export default class WeatherBar extends Component {

    constructor(props) {
        super(props);
        this.scheme = icons;
        this.isInitialFetch = true;
        this.state = {
            weather: {}
        }
        this.getWeather();
    }

    componentDidMount() {
        //setInterval(() => this.getWeather(), 5000);
    }

    getWeather() {
        fetch('/api/weather')
            .then((response) => response.json())
            .then(data => {
                // remove all unused sensors from this.data object
                if (this.isInitialFetch) {
                    this.isSensorActive(data, this.scheme);
                    this.isInitialFetch = false;
                }
                console.log(this.scheme);
                // update this.data by the fetched data and setup/weather (choose: si, icons, colors)
                this.assignSetupToValues(data, this.scheme);
                console.log(this.scheme);
                this.setState({weather: this.scheme});
            });
    }

    // update this.data by the fetched data and setup/weather (draw: si, icons, colors)
    assignSetupToValues(data, scheme) {

        const $directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

        for (const [key, val] of Object.entries(data)) {
            scheme[key].value = val;

            // choose the right icon on the basis of the thresholds array
            if (scheme[key].thresholds !== false) {
                for (const [index, item] of Object.entries(scheme[key].thresholds)) {
                    if (val <= item) {
                        scheme[key].calculated = {
                            icon: scheme[key].icon[index]
                        };
                        break;
                    }
                }
            }
            else {
                let result = null;
                if (key === 'wind_direction') {
                    for (let i = 0; i < $directions.length; i++) {
                        if (val === $directions[i]) {
                            result = i;
                            break;
                        }
                    }
                }
                scheme[key].calculated = {
                    icon: scheme[key].icon[result]
                };
            }
        }
    }

    // remove all unused sensors from this.data object
    isSensorActive(data, scheme) {
        for (const [key, val] of Object.entries(scheme)) {
            if (!(data[key])) {
                delete scheme[key];
            } else {
                scheme[key].calculated = {};
            }
        }
    }

    render() {
        return (<div className={`js-weather`}>
            <div className={`item item-label text-center pr-4 mt-0.5 hidden md:block`}>
                <span className={`text-darker-200`}>Odczyty</span>
                <p>Zewnętrzne</p>
            </div>
            {Object.entries(this.state.weather).map(([key, item]) => {
                return (<div key={key} className={`item text-center`}>
                        <span><i className={`gf ${item.calculated.icon} ${item.color}`}></i></span>
                        <p>{item.value} {item.si}</p>
                    </div>)
            })}
        </div>);
    }
}
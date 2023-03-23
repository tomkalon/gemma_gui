import React, {Component} from 'react';
import './setup/Weather';
import weather from "./setup/Weather";

export default class WeatherBar extends Component {

    constructor(props) {
        super(props);
        this.data = weather;
        this.state = {
            weather: {}
        }
        this.getWeather();
    }

    componentDidMount() {
        setInterval(() => this.getWeather(), 5000);
    }

    getWeather() {
        fetch('/app/api/weather')
            .then((response) => response.json())
            .then(data => {
                // update this.data by the fetched data and setup/weather (draw: si, icons, colors)
                this.assignSetupToValues (data, this.data);
                this.setState({weather: this.data});
            });
    }

    assignSetupToValues (data, obj) {
        for (const [key, val] of Object.entries(data)) {
            obj[key].value = val;
        }
    }

    render() {
        return (<div className={`js-weather`}>
            <div className={`item item-label text-center pr-4 mt-0.5 hidden md:block`}>
                <span className={`text-darker-200`}>Odczyty</span>
                <p>Zewnętrzne</p>
            </div>
            {Object.entries(this.state.weather).map(([key, item]) => {
                return (
                    <div key={key} className={`item text-center`}>
                        <span><i className={`gf ${item.icon} ${item.color}`}></i></span>
                        <p>{item.value} {item.si}</p>
                    </div>
                )
            })}
        </div>);
    }
}
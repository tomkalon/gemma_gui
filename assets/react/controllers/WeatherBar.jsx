import React, {Component} from 'react';
import icons from "./setup/Icons";
import commonFunctions from "./common/funtions";

export default class WeatherBar extends Component {
    constructor(props) {
        super(props);

        //const
        this.refreshInterval = 5000;

        // var
        this.scheme = [];
        this.icons = structuredClone(icons);
        this.data = [];
        this.isInitialFetch = true;

        // state
        this.state = {
            weather: {}
        }

        // function
        this.assignSetupToValues = commonFunctions.assignSetupToValues;
        this.isSensorActive = commonFunctions.isSensorActive;
        this.getData();
    }

    getData() {
        fetch('/api/weather')
            .then((response) => response.json())
            .then(data => {

                // set data STRUCTURE for specific functions
                this.data = [{
                    readings: data
                }]

                // initial function which filters sensors used by specific object
                // and adds icons scheme for each sensor
                // RUN ONCE
                if (this.isInitialFetch) {
                    this.isSensorActive(this.data[0], 0, this.scheme, icons);
                    this.isInitialFetch = false;
                }

                // update SCHEME by the fetched data -> VALUES and setup icons
                this.assignSetupToValues(this.data[0].readings, this.scheme[0].readings);

                // save SCHEME to STATE
                this.setState({weather: this.scheme[0].readings});
            });
    }

    render() {
        return (<div className={`js-weather`}>
            <div className={`item item-label text-center pr-4 mt-0.5 hidden md:block`}>
                <span className={`text-darker-200`}>Odczyty</span>
                <p>Zewnętrzne</p>
            </div>
            {Object.entries(this.state.weather).map(([key, item]) => {
                return (<div key={key} className={`item text-center`}>
                    <span><i className={`gf ${item.calculated[0].icon} ${item.color}`}></i></span>
                    <p>{item.value} {item.si}</p>
                </div>)
            })}
        </div>);
    }
    componentDidMount() {
        setInterval(() => this.getData(), this.refreshInterval);
    }
}
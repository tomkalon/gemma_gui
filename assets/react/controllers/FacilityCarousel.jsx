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
        fetch('/api/weather')
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                // this.assignSetupToValues (data, this.data);
                // this.setState({weather: this.data});
            });
    }

    assignSetupToValues (data, obj) {
        for (const [key, val] of Object.entries(data)) {
            obj[key].value = val;
        }
    }

    render() {
        return (
        <div>
            test
        </div>
        )}
}
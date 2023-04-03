import React from 'react';
import DetailsLabel from "./DetailsLabel";
import DetailsPanel from "./DetailsPanel";
import {array} from "prop-types";

class Details extends React.Component {

    render() {

        // props
        let info = this.props.info;
        let state = this.props.state;
        let current = this.props.current + 1;
        let isDay = this.props.isDay;

        // readings
        let readings = state.readings;
        let sensor;

        // settings
        let isSettings = null;
        let settings = array;

        if (state.settings) {
            isSettings = true;
            settings = state.settings;
        }

        // object info
        let name;
        if (info) {
            name = info.name;
        }

        // === PANELS
        let panels = [];
        let tempFullName, tempShortName, humidFullName, humidShortName;
        if (state) {
            if (readings.temp) {
                tempFullName = readings.temp.fullName;
                tempShortName = readings.temp.shortName;
                sensor = readings.temp;
                panels.push(<DetailsPanel fullName={tempFullName} shortName={tempShortName} type="temp" key={tempShortName} sensor={sensor}
                                          isSettings={isSettings} settings={settings} isDay={isDay} />);
            }
            if (readings.humid) {
                humidFullName = readings.humid.fullName;
                humidShortName = readings.humid.shortName;
                sensor = readings.humid;
                panels.push(<DetailsPanel fullName={humidFullName} shortName={humidShortName} type="humid" key={humidShortName} sensor={sensor}
                                          isSettings={isSettings} settings={settings} isDay={isDay} />);
            }
        }

        return (<div className={`detail`}>
            <DetailsLabel name={name} current={current}/>
            <div className={`data`}>
                <div className={`container mx-auto flex justify-center px-2`}>
                    <div className={`image-box`}>
                        <div className={`image dark:bg-darker-900 rounded-md border dark:border-darker-500 shadow-md dark:shadow-gray-900/50`}>
                            <div className={`img h-32 mt-2 mx-2`}></div>
                            <div className={`desc text-center uppercase`}>
                                <span className={`text-sm dark:text-darker-200`}>Typ obiektu:</span>
                                <p className={`dark:text-darker-100`}>developer</p>
                            </div>
                        </div>
                    </div>
                    {panels.map((element) => {return element;})}
                </div>
            </div>
        </div>)
    }
}

export default Details;
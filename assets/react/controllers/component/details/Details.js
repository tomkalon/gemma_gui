import React from 'react';
import DetailsLabel from "./DetailsLabel";
import DetailsPanel from "./DetailsPanel";
import {array} from "prop-types";

class Details extends React.Component {

    render() {

        // props
        const info = this.props.info;
        const state = this.props.state;
        const current = this.props.current + 1;
        const isDay = this.props.isDay;

        // readings
        let readings = state.readings;
        let sensor;

        // settings
        let isSettings = null;
        let settings = array;

        if (state.settings !== undefined) {
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
                <div className={`container mx-auto block justify-center px-2`}>
                    <div className={`image-box float-left hidden xl:block`}>
                        <div className={`image dark:bg-darker-900 rounded-md border dark:border-darker-500 shadow-md dark:shadow-gray-900/50`}>
                            <div className={`img h-32 mt-2 mx-2`}></div>
                            <div className={`desc text-center uppercase`}>
                                <span className={`text-sm dark:text-darker-200`}>Typ obiektu:</span>
                                <p className={`dark:text-darker-100`}>developer</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex`}>
                        {panels.map((element) => {return element;})}
                    </div>
                    <ul className={`additional settings label gap-0.5 h-14 dark:bg-blue-950 border-b dark:border-blue-450`}>
                        <li className={`title`}>Ustawienia obiektu:</li>
                    </ul>
                </div>
            </div>
        </div>)
    }
}

export default Details;
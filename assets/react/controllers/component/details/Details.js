import React from 'react';
import DetailsLabel from "./DetailsLabel";
import DetailsPanel from "./DetailsPanel";
import DetailsSettings from "./DetailsSettings";
import './details.scss'

class Details extends React.Component {

    render() {

        // props
        const info = this.props.info; // object: id, name
        const state = this.props.state; // object: state -> settings, readings etc.
        const sequenceNumber = this.props.current + 1; // Object number: starting with 1
        const isDay = this.props.isDay; // time of day

        // readings
        let readings = state.readings;
        let sensor;

        // settings
        let isSettings;
        let settings;

        if (state.settings !== undefined) {
            isSettings = true;
            settings = state.settings;
        }

        // object info
        let name;
        if (info) {
            name = info.name;
        }

        // panels
        let panels = [];
        let tempFullName, tempShortName, humidFullName, humidShortName;
        if (state) {
            if (readings.temp !== undefined) {
                tempFullName = readings.temp.fullName;
                tempShortName = readings.temp.shortName;
                sensor = readings.temp;
                panels.push(<DetailsPanel fullName={tempFullName} shortName={tempShortName} type="temp" key={tempShortName} sensor={sensor}
                                          isSettings={isSettings} settings={settings} isDay={isDay} />);
            }
            if (readings.humid !== undefined) {
                humidFullName = readings.humid.fullName;
                humidShortName = readings.humid.shortName;
                sensor = readings.humid;
                panels.push(<DetailsPanel fullName={humidFullName} shortName={humidShortName} type="humid" key={humidShortName} sensor={sensor}
                                          isSettings={isSettings} settings={settings} isDay={isDay} />);
            }
        }

        // settings
        let selectSettings;
        if (isSettings) {
            selectSettings = <DetailsSettings settings={settings} />;

        }

        // component
        const component = <div id={`js-object-detail`}>
            <DetailsLabel name={name} sequenceNumber={sequenceNumber}/>
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
                    <div className={`additional text-center bg-gradient-to-t dark:from-blue-950 dark:to-blue-960 dark:text-blue-100 border-b-2 dark:border-blue-450 h-14`}>
                        <div>
                            {selectSettings}
                            <div className={`label other px-4 float-right`}>
                                <div className={`title`}>Aktywne moduły:</div>
                                <div className="module dark:bg-blue-450 active"><i className="gf gf-blow"></i></div>
                                <div className="module dark:bg-blue-450"><i className="gf gf-heat"></i></div>
                                <div className={`title ml-4 mr-3`}>Wykresy:</div>
                                <div className="module dark:bg-blue-450 active"><i className="gf gf-stats"></i></div>
                            </div>
                        </div>
                    </div>

                    <div className="readings stripe dark:bg-blue-960 dark:border-darker-200 dark:text-blue-100 rounded-b shadow-md dark:shadow-gray-900/30">
                        <div className="container mx-auto px-4 flex">
                        </div>
                    </div>
                </div>
            </div>
        </div>;

        return (<div className={`detail`}>{component}</div>);
    }
}

export default Details;
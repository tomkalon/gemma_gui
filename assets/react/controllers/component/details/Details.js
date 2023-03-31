import React from 'react';
import DetailsLabel from "./DetailsLabel";
import DetailsPanel from "./DetailsPanel";

class Details extends React.Component {

    render() {
        let info = this.props.info;
        let state = this.props.state;
        let current = this.props.current + 1;

        // Object name
        let name;
        if (info) {
            name = info.name;
        }

        // Panels
        let panels = [];
        let tempFullName, tempShortName, humidFullName, humidShortName;
        if (state) {
            if (state.readings.temp) {
                tempFullName = state.readings.temp.fullName;
                tempShortName = state.readings.temp.shortName;
                panels.push(<DetailsPanel fullName={tempFullName} shortName={tempShortName} key={tempShortName} data={state.readings.temp} />);
            }
            if (state.readings.humid) {
                humidFullName = state.readings.humid.fullName;
                humidShortName = state.readings.humid.shortName;
                panels.push(<DetailsPanel fullName={humidFullName} shortName={humidShortName} key={humidShortName} data={state.readings.humid} />);
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
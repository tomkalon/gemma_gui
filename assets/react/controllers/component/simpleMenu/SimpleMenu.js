import React from 'react';
import "./simple-menu.scss"
import WeatherItem from "../weather/WeatherItem";

class SimpleMenu extends React.Component {

    constructor(props) {
        super(props);
        this.facility = this.props.state;
        this.info = this.props.info;
    }

    getSensor(object) {
        return (<div className={`w-48 py-2 m-2 text-center border-t-4 border-b-4 dark:border-gray-400`}>
            <p className="text-3xl">TEMP</p>
            <span className={`text-4xl`}><i className={`gf gf-temp2`}></i> 18.3°C</span>
        </div>)
    }

    render() {

        return (<div className={`simple-menu pt-4 px-4 mx-auto`}>
            {
                this.info.map((element, key) => {
                    return (<div key={key} className={'item mb-6 dark:bg-darker-100 rounded-xl cursor-pointer'}>
                        <div className={`label px-4 py-4 rounded-t-xl dark:bg-darker-800`}>
                            <span className={`dark:text-darker-100 text-4xl`}>Obiekt# {key + 1} | {element.name}</span>
                        </div>
                        <div className={`p-2`}>
                            {this.getSensor(this.facility[key], key)}
                        </div>
                    </div>);
                })
            }
        </div>);
    }
}

export default SimpleMenu;
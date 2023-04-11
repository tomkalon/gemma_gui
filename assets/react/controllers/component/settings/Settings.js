import React from 'react';
import './settings.scss'
import data from './settings.json'

class Settings extends React.Component {

    render() {

        // props
        const state = this.props.state;

        return (<article id={`js-settings`} className="setup">
            <div
                className="container mx-auto flex bg-gradient-to-br dark:from-darker-700 dark:to-darker-900 dark:text-darker-100 rounded-md shadow-md relative dark:shadow-gray-900/30">
                <div className="label px-4 h-8">Ustawienia: temperatura</div>
            </div>
            <div className="dark:text-darker-100" id={`js-settings-content`}>
                <div className="container mx-auto ">
                    <div className="box flex rounded-b">
                        <div className="item">
                            <span className="title">Temperatura w dzień</span>
                            <div className="icon"><i className="gf gf-temp2"></i><i className="gf gf-day"></i></div>
                            <p className="value">20.5°C</p>
                        </div>
                        <div className="item">
                            <span className="title">Temperatura w nocy</span>
                            <div className="icon"><i className="gf gf-temp2"></i><i className="gf gf-night"></i></div>
                            <p className="value">15.0°C</p>
                        </div>
                        <div className="item">
                            <span className="title">Histereza</span>
                            <div className="icon"><i className="gf gf-hysteresis"></i></div>
                            <p className="value">1.5°C</p>
                        </div>
                        <div className="item">
                            <span className="title">Temp. bezwzględnego zamknięcia wietrznika</span>
                            <div className="icon"><i className="gf gf-temp2"></i><i className="gf gf-warning"></i></div>
                            <p className="value">5°C</p>
                        </div>
                        <span className="separator"></span>
                        <div className="item global">
                            <span className="title">Początek dnia</span>
                            <div className="icon"><i className="gf gf-day-begin"></i></div>
                            <p className="value">7:00</p>
                        </div>
                        <div className="item global">
                            <span className="title">Początek nocy</span>
                            <div className="icon">
                                <i className="gf gf-night-begin"></i>
                            </div>
                            <p className="value">20:00</p>
                        </div>
                        <div className="item true">
                            <span className="title">Sterowanie temperaturą<br/> w dzień</span>
                            <div className="icon"><i className="gf gf-control"></i><i className="gf gf-day"></i></div>
                            <p className="value">TAK</p>
                        </div>
                        <div className="item false">
                            <span className="title">Sterowanie temperaturą<br/> w nocy</span>
                            <div className="icon"><i className="gf gf-control"></i><i className="gf gf-night"></i></div>
                            <p className="value">NIE</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>)
    }
}

export default Settings;
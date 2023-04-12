import React from 'react';
import settingsScheme from '../../common/settings.json'

class DetailsSettings extends React.Component {

    render() {

        // props
        const settings = this.props.settings;
        const selectedSettings = this.props.selectedSettings;
        const readings = this.props.readings;
        const handler = this.props.handler;

        // object
        let display = {};
        const environment = settingsScheme.environment;

        for (const key of Object.keys(readings)) {
            let active = '';
            if (selectedSettings === key) {
                active = ' active';
            }
            if (settings[key + '_enable']) {
                if (key === 'heat' || key === 'blow') {
                    if (!display['other']) {
                        if (selectedSettings === 'other') active = ' active';
                        display['other'] = <div onClick={() => handler('other', 500)} key={key} className={`element${active}`}>
                            <i className={`gf gf-manual text-cyan-500`}></i>
                            <p>Pozostałe</p>
                        </div>;
                    }
                }
                else {
                    if (key === "shadow") {
                        if (environment['sun']) {
                            display[key] = <div onClick={() => handler(key, 500)} key={key} className={`element${active}`}>
                                <i className={`gf ${readings[key]['settingsStyle']}`}></i>
                                <p>{readings[key]['fullName']}</p>
                            </div>
                        }
                    }
                    else {
                        display[key] = <div onClick={() => handler(key, 500)} key={key} className={`element${active}`}>
                            <i className={`gf ${readings[key]['settingsStyle']}`}></i>
                            <p>{readings[key]['fullName']}</p>
                        </div>
                    }
                }
            }
        }

        return (<div className={`label settings float-left`}>
                <div className={`title`}>Ustawienia obiektu:</div>
                { Object.values(display) }
            </div>)
    }
}

export default DetailsSettings;
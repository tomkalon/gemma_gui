import React from 'react';
import settingsDisplay from '../../../common/settings-display.json'

class SettingsMenu extends React.Component {

    render() {

        // props
        const selectedSettings = this.props.selectedSettings;
        const readings = this.props.readings;
        const handler = this.props.handler;

        // object
        let display = {};
        for (const [key, element] of Object.entries(readings)) {
            let active = '';
            if (selectedSettings === key) {
                active = ' active';
            }
            if (settingsDisplay.enable[key]) {
                if (key === "shadow") {
                    if (settingsDisplay.environment['sun']) {
                        display[key] = <button onClick={() => handler(key, 300)} key={key} className={`element${active} uppercase items-center`}>
                            <i className={`gf ${element['settingsStyle']}`}></i>
                            <p>{element['fullName']}</p>
                        </button>
                    }
                }
                else {
                    display[key] = <button onClick={() => handler(key, 300)} key={key} className={`element${active} uppercase items-center`}>
                        <i className={`gf ${element['settingsStyle']}`}></i>
                        <p>{element['fullName']}</p>
                    </button>
                }
            }
        }

        return (<div className={`label menu mr-6 border-r dark:border-blue-550 float-right`}>
                { Object.values(display) }
            </div>)
    }
}

export default SettingsMenu;
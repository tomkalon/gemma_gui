import React from 'react';
import settingsDisplay from '../../../common/settings-display.json'

class SettingsSimpleMenu extends React.Component {

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
                        display[key] = <div key={key} className={`text-6xl w-32 text-center p-3 dark:bg-darker-700 mx-1 element${active}`}
                                            onClick={() => handler(key, 300)}>
                            <i className={`gf ${element['settingsStyle']}`}></i>
                        </div>
                    }
                }
                else {
                    display[key] = <div key={key} className={`text-6xl w-32 text-center p-3 dark:bg-darker-700 mx-1 element${active}`}
                                        onClick={() => handler(key, 300)}>
                        <i className={`gf ${element['settingsStyle']}`}></i>
                    </div>
                }
            }
        }

        return (<div className={`settings-menu ring-1 dark:ring-darker-800 fixed flex bottom-28 h-24 py-1 w-full
         border-t dark:border-darker-200 bg-gradient-to-b dark:from-darker-800 dark:to-darker-700`}>
        { Object.values(display) }
        </div>)
    }
}

export default SettingsSimpleMenu;
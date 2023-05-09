import React from 'react';
import settingsDisplay from '../../../common/settings-display.json'

class SettingsPopupRadio extends React.Component {

    constructor(props) {
        super(props);
        this.settingBool = this.props.settingBool;
        this.element = this.props.settingElement;
    }

    render() {

        this.settingBool = !this.settingBool;
        let boolValue = this.settingBool === true ? 1 : 0;

        return (<div className={`settings-radio text-3xl lg:text-base flex`}>
            <div>{settingsDisplay.arrangement.boolQuestion} <span className={`value ${this.settingBool}`}>{this.element.values[boolValue]}</span></div>
        </div>)
    }
}

export default SettingsPopupRadio;
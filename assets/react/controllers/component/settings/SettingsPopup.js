import React from 'react';
import SettingsPopupRange from "./SettingsPopupRange";
import settingsScheme from '../../common/settings.json'
import {element} from "prop-types";

class SettingsPopup extends React.Component {

    render() {

        // props
        const settingElement = this.props.settingElement;
        const settingValue = this.props.settingValue;
        const closeHandler = this.props.closeHandler;

        // var
        let description;
        if (settingElement.description !== undefined) {
            description = <div className={`description`}><span>{settingElement.description}</span></div>;
        }

        let settingsForm;
        if (settingElement.bool === undefined) {
            settingsForm = <SettingsPopupRange settingValue={settingValue} step={settingElement.step} range={settingElement.range}/>;
        }

        return (<div className={`js-settings-popup-cover z-40 fixed flex justify-center items-center top-0`}>
            <div id='js-settings-popup' className={`settings-popup rounded-lg flex flex-col justify-between dark:text-blue-50`}>
                <div className={`label h-12 mx-1 px-2 border-b dark:border-blue-450`}>
                    <span>{settingElement.label}</span>
                    <button className={`js-btn-close`}><i className={`gf gf-close`} onClick={closeHandler}></i></button>
                </div>
                {description}
                <div className={`content`}>
                    {settingsForm}
                </div>
                <div className={`buttons h-16 pt-3 px-4 mx-1 border-t dark:border-blue-450`}>
                    <div className={`mt-2 float-left`}>
                        Aktualne wartość: <span className={`p-2 dark:bg-blue-950 rounded-lg`}>{settingValue}{settingElement['si']}</span>
                    </div>
                    <button className={`btn btn-save float-right ml-4`}>Zapisz</button>
                    <button className={`btn btn-cancel float-right`} onClick={closeHandler}>Zamknij</button>
                </div>
            </div>
        </div>)
    }
}


export default SettingsPopup;
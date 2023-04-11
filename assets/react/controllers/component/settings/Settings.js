import React from 'react';
import './settings.scss'
import settingsScheme from '../../common/settings.json'
import parser from 'html-react-parser';


class Settings extends React.Component {

    render() {

        // props
        const state = this.props.state;
        const selectedSettings = this.props.selectedSettings;

        //var
        const settings = state.settings;
        let display = {};
        let counter = 0;

        if (selectedSettings !== false) {
            for (const [key, element] of Object.entries(settingsScheme[selectedSettings])) {
                console.log(key);

                if (settings[key] !== undefined) {
                    display[counter] = getSettingButton(key, element);
                    console.log(settings[key]);
                }
                counter++;
            }
        }

        function getSettingButton (key, element){
            return (
                <div key={key} className={`item`}>
                    <span className={`title`}>{parser(element.desc)}</span>
                    <div className={`icon`}>
                        {element.icon.map((item, index) => {
                            return (<i key={index} className={`gf ${item}`}></i>);
                        })}
                    </div>
                    <p className={`value`}>20.5{element.si}</p>
                </div>
            )
        }

        return (<article id={`js-settings`} className={`setup`}>
            <div
                className={`container mx-auto flex bg-gradient-to-br dark:from-darker-700 dark:to-darker-900 dark:text-darker-100 rounded-md shadow-md relative dark:shadow-gray-900/30`}>
                <div className={`label px-4 h-8`}>Ustawienia: temperatura</div>
            </div>
            <div className={`dark:text-darker-100`} id={`js-settings-content`}>
                <div className={`container mx-auto `}>
                    <div className={`box flex rounded-b`}>
                        { Object.values(display)}
                    </div>
                </div>
            </div>
        </article>)
    }
}

export default Settings;
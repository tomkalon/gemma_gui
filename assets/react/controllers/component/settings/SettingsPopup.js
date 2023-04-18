import React from 'react';
import SettingsPopupRange from "./SettingsPopupRange";

class SettingsPopup extends React.Component {

    render() {

        // props
        const closeHandler = this.props.closeHandler;


        return (<div className={`js-settings-popup-cover z-40 fixed flex justify-center items-center top-0`}>
            <div id='js-settings-popup' className={`settings-popup rounded-lg flex flex-col justify-between dark:text-blue-50`}>
                <div className={`label h-12 mx-1 px-2 border-b dark:border-blue-450`}>
                    <span>Temperatura bezwzględnego zamknięcia wietrznika</span>
                    <button className={`js-btn-close`}><i className={`gf gf-close`} onClick={closeHandler}></i></button>
                </div>

                <div className={`description`}>
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Accusamus consequatur expedita explicabo fugiat inventore labore officia quibusdam reiciendis, repudiandae voluptate!</span>
                </div>
                <div className={`content`}>
                    <SettingsPopupRange />
                </div>
                <div className={`buttons h-16 pt-3 px-4 mx-1 border-t dark:border-blue-450`}>
                    <button className={`btn btn-save float-right ml-4`}>Zapisz</button>
                    <button className={`btn btn-cancel float-right`} onClick={closeHandler}>Zamknij</button>
                </div>
            </div>
        </div>)
    }
}

export default SettingsPopup;
import React from 'react';

class DetailsProgress extends React.Component {

    render() {

        // props
        const vent = this.props.vent;
        const shadow = this.props.shadow;
        const settings = this.props.settings;

        // var
        let ventBar;
        let shadowBar;

        if (vent) {
            ventBar = <div className="box flex w-full">
                <div className="label"><span>Wietrznik</span></div>
                <div className="row flex w-full">
                    <div className="shadow progress w-full dark:bg-blue-550 h-6 mr-4">
                        <div className="value flex dark:bg-darker-350 leading-none h-6"
                             style={{width: '45%'}}>45%
                        </div>
                        <div className="indicator flex bg-gradient-to-r dark:from-transparent-0 dark:to-darker-100/20 leading-none h-6"
                             style={{width: '45%'}}>
                        </div>
                    </div>
                </div>
            </div>;
        }

        if (shadow) {
            shadowBar = <div className="box flex w-full">
                <div className="label"><span>Cieniówka</span></div>
                <div className="row flex w-full">
                    <div className="shadow progress w-full dark:bg-blue-550 h-6 mr-4">
                        <div className="value flex dark:bg-darker-350 leading-none h-6"
                             style={{width: '45%'}}>45%
                        </div>
                        <div className="indicator flex bg-gradient-to-r dark:from-transparent-0 dark:to-darker-100/20 leading-none h-6"
                             style={{width: '45%'}}>
                        </div>
                    </div>
                </div>
            </div>;
        }

        // var
        return (
            <div
                className="readings stripe dark:bg-blue-960 dark:border-darker-200 dark:text-blue-100 rounded shadow-md dark:shadow-gray-900/30">
                <div className="container mx-auto px-4 flex text-blue-100 text-center">
                    {ventBar}
                    {shadowBar}
                </div>
            </div>
        )
    }
}

export default DetailsProgress;
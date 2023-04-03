import React from 'react';

class DetailsSetpoint extends React.Component {

    render() {

        // props
        let type = this.props.type;
        let si = this.props.si;
        let isDay = this.props.isDay;
        let valueDay = this.props.valueDay;
        let valueNight = this.props.valueNight;
        let controlDay = this.props.controlDay;
        let controlNight = this.props.controlNight;

        // components
        let primary;
        let secondary;

        // logic
        // IS DAY
        if (isDay) {
            if (controlDay) {
                primary = <span className={`post pr-4 active`}><i className={`gf gf-day rotate`}></i>{valueDay}{si}</span>;
            }
            if (controlNight) {
                secondary = <span className={`post`}><i className={`gf gf-night`}></i>{valueNight}{si}</span>;
            }

            return (<div className={`border-l dark:border-darker-100`}>
                <span className={`pre px-4`}>Zadana</span>
                {primary}
                {secondary}
            </div>)
        }
        else {
            if (controlDay) {
                primary = <span className={`post`}><i className={`gf gf-day`}></i>{valueDay}{si}</span>;
            }
            if (controlNight) {
                secondary = <span className={`post pr-4 active`}><i className={`gf gf-night`}></i>{valueNight}{si}</span>;
            }

            return (<div className={`border-l dark:border-darker-100`}>
                <span className={`pre px-4`}>Zadana</span>
                {secondary}
                {primary}
            </div>)
        }
    }
}

export default DetailsSetpoint;
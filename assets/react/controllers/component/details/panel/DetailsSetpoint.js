import React from 'react';

class DetailsSetpoint extends React.Component {

    render() {

        // props
        let day = this.props.day;
        let night = this.props.night;
        let isDay = this.props.isDay;

        // logic
        // IS DAY
        if (isDay) {
            return (<div className={`border-l dark:border-darker-100`}>
                <span className={`pre px-4`}>Zadana</span>
                {day}
                {night}
            </div>)
        }
        else {
            return (<div className={`border-l dark:border-darker-100`}>
                <span className={`pre px-4`}>Zadana</span>
                {night}
                {day}
            </div>)
        }
    }
}

export default DetailsSetpoint;
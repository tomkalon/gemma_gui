import React from 'react';

class DetailsSetpoint extends React.Component {

    render() {

        // props
        let day = this.props.day; // time of day
        let night = this.props.night; // set day value block
        let isDay = this.props.isDay; // set night value block

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
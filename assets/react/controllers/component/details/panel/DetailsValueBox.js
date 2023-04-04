import React from 'react';

class DetailsValueBox extends React.Component {
    render() {

        // props
        const sensor = this.props.sensor; // the sensor data like value, si, icon...
        const diff = this.props.diff; // difference between the set value and the real value
        const si = this.props.si; // si unit

        // components
        let valueList;
        let active;

        if (diff.length) {
            valueList = sensor.value.map((element, index) =>
                <div key={index} className={`box`}>
                    <span><i className={`gf ${sensor.calculated[index].icon}`}></i>{element}{si}</span>
                    <p className={`diff`}>{diff[index]}{si}</p>
                </div>
            );
        }
        else {
            valueList = sensor.value.map((element, index) =>
                <div key={index} className={`box`}>
                    <span><i className={`gf ${sensor.calculated[index].icon}`}></i>{element}{si}</span>
                </div>
            );
        }

        return (
            <div className={`value flex dark:bg-blue-550`}>
                {valueList}
            </div>
        )
    }
}

export default DetailsValueBox;
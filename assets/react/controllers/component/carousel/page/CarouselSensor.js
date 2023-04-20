import React from 'react';

class CarouselSensor extends React.Component {
    render() {
        let si = this.props.si;
        let icon = this.props.icon;
        let value = this.props.value;
        let desc = this.props.desc;

        return (<div>
            <i className={`gf ${icon}`}></i>
            <p><span>{value}{si}</span></p>
            <p className="desc">{desc}</p>
        </div>)
    }
}

export default CarouselSensor;
import React from 'react';

class CarouselPage extends React.Component {

    render() {
        return (<div>
            <span><i className={`gf ${this.props.icon} ${this.props.color}`}></i></span>
            <p>{this.props.value} {this.props.si}</p>
        </div>)
    }
}

export default CarouselPage;
import React from 'react';

class CarouselSidebar extends React.Component {

    render() {
        let handler = this.props.handler;
        let action = this.props.direction;

        return (
            <div className={`carousel-sidebar`} onClick={() => handler(action)}>
                <div className={`carousel-sidebar-${this.props.direction}`}>
                    <span><i className={`gf ${this.props.directionIcon}`}></i></span>
                </div>
            </div>
        )
    }
}

export default CarouselSidebar;
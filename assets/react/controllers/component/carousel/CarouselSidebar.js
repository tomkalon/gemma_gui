import React from 'react';

class CarouselSidebar extends React.Component {

    render() {
        return (
            <div className={`carousel-sidebar`}>
                <div className={`carousel-sidebar-${this.props.direction}`}>
                    <span><i className={`gf ${this.props.directionIcon}`}></i></span>
                </div>
            </div>
        )
    }
}

export default CarouselSidebar;
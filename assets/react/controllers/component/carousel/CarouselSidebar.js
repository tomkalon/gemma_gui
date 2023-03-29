import React from 'react';

class CarouselSidebar extends React.Component {

    render() {
        let handler = this.props.handler;
        let direction = this.props.direction;
        let visibility = this.props.visibility;
        let directionIcon = this.props.directionIcon;

        return (
            <div className={`carousel-sidebar`}>
                <div className={`${visibility} carousel-sidebar-${direction}`} onClick={() => handler(direction)} >
                    <span><i className={`gf ${directionIcon}`}></i></span>
                </div>
            </div>
        )
    }
}

export default CarouselSidebar;
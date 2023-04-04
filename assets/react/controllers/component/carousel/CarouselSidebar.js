import React from 'react';

class CarouselSidebar extends React.Component {

    render() {

        // props
        const handler = this.props.handler;
        const direction = this.props.direction;
        const visibility = this.props.visibility;
        const directionIcon = this.props.directionIcon;

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
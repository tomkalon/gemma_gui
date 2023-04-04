import React from 'react';
import CarouselObject from "./page/CarouselObject";

class CarouselPage extends React.Component {

    render() {

        // props
        const facilityState = this.props.objectsState;
        const facilityInfo = this.props.objectsInfo;
        const pages = this.props.pages;
        const maxRow = this.props.maxRow;

        return (<div className={`row carousel-content ${maxRow}`}>
            {pages.map(function (value, index) {
                return (<CarouselObject key={index} itemState={facilityState[value]} itemInfo={facilityInfo[value]} />)
            })}
        </div>)
    }
}

export default CarouselPage;
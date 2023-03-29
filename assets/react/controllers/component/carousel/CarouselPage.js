import React from 'react';
import CarouselObject from "./page/CarouselObject";

class CarouselPage extends React.Component {

    render() {
        let facilityState = this.props.objectsState;
        let facilityInfo = this.props.objectsInfo;
        let pages = this.props.pages;

        return (<div className={'row carousel-content'}>
            {pages.map(function (value, index) {
                return (<CarouselObject key={index} itemState={facilityState[value]} itemInfo={facilityInfo[value]} />)
            })}
        </div>)
    }
}

export default CarouselPage;
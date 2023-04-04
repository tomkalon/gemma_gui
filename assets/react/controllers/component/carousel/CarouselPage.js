import React from 'react';
import CarouselObject from "./page/CarouselObject";

class CarouselPage extends React.Component {

    render() {

        // props
        const facilityState = this.props.objectsState;
        const facilityInfo = this.props.objectsInfo;
        const current = this.props.current;
        const page = this.props.page;
        const pages = this.props.pages;
        const maxRow = this.props.maxRow;
        const handler = this.props.handler;

        return (<div className={`row carousel-content ${maxRow}`}>
            {pages[page].map(function (value) {
                return (<CarouselObject key={value} num={value} current={current} itemState={facilityState[value]}
                                        itemInfo={facilityInfo[value]} handler={handler}/>)
            })}
        </div>)
    }
}

export default CarouselPage;
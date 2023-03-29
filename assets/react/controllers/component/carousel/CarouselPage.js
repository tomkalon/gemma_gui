import React from 'react';
import CarouselItem from "./page/CarouselItem";

class CarouselPage extends React.Component {

    render() {
        return (<div className={'row carousel-content'}>
            {this.props.pages.map(function (value, index) {
                return (<CarouselItem key={index}/>)
            })}
        </div>)
    }
}

export default CarouselPage;
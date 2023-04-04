import React from 'react';
import CarouselPage from "./CarouselPage";
import CarouselPagination from "./CarouselPagination";
import CarouselSidebar from "./CarouselSidebar";
import './carousel.scss'

class Carousel extends React.Component {

    render() {

        // props
        const display = this.props.display;
        const state = this.props.state;
        const info = this.props.info;
        const pageState = this.props.page;
        const paginationHandler = this.props.paginationHandler;
        const sidebarHandler = this.props.sidebarHandler;
        const activeHandler = this.props.activeHandler;
        const current = this.props.current;

        // var
        let prevIsActive = "hidden";
        let nextIsActive = "hidden";

        if (display.pageCount) {
            if (pageState === 0) {
                prevIsActive = "hidden";
                nextIsActive = "block";
            } else {
                prevIsActive = "block";
            }

            if (pageState === display.pageCount) {
                prevIsActive = "block";
                nextIsActive = "hidden";
            } else {
                nextIsActive = "block";
            }
        }

        // === CAROUSEL
        // carousel content block
        const carouselShowPage = <CarouselPage
            page={pageState} pages={display.pages} objectsState={state} current={current}
            objectsInfo={info} maxRow={display.maxRows} handler={activeHandler}/>;

        // carousel pagination block
        const carouselPagination = <CarouselPagination
            pagination={display.pagination} active={pageState} handler={paginationHandler}/>;

        // carousel navigations blocks
        const prevCarouselSideBar = <CarouselSidebar
            direction={"prev"} directionIcon={"gf-left-arrow"} visibility={prevIsActive}
            handler={sidebarHandler}/>;
        const nextCarouselSideBar = <CarouselSidebar
            direction={"next"} directionIcon={"gf-right-arrow"} visibility={nextIsActive}
            handler={sidebarHandler}/>;


        return (
            <div className={`row flex`}>
                {prevCarouselSideBar}
                <div className={`flex flex-grow flex-col justify-center`}>
                    {carouselShowPage}
                    <div className={`row carousel-pagination`}>
                        {carouselPagination}
                    </div>
                </div>
                {nextCarouselSideBar}
            </div>
        )
    }
}

export default Carousel;
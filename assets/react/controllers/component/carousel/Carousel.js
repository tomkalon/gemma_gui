import React from 'react';
import CarouselPage from "./CarouselPage";
import CarouselPagination from "./CarouselPagination";
import CarouselSidebar from "./CarouselSidebar";

class Carousel extends React.Component {

    render() {

        // props
        let showPage = this.props.showPage;
        let prevSideBar = this.props.prevSideBar;
        let nextSideBar = this.props.nextSideBar;
        let pagination = this.props.pagination;

        // // === CAROUSEL
        // // carousel content block
        // const carouselShowPage = <CarouselPage
        //     page={pageState} pages={display.pages[pageState]} objectsState={facilityState}
        //     objectsInfo={facilityInfo} maxRow={display.maxRows}/>;
        //
        // // carousel pagination block
        // const carouselPagination = <CarouselPagination
        //     pagination={display.pagination} active={pageState} handler={this.carouselPaginationPageIndex.bind(this)}/>;
        //
        // // carousel navigations blocks
        // const prevCarouselSideBar = <CarouselSidebar
        //     direction={"prev"} directionIcon={"gf-left-arrow"} visibility={prevIsActive}
        //     handler={this.carouselSidebarPageIndex.bind(this)}/>;
        // const nextCarouselSideBar = <CarouselSidebar
        //     direction={"next"} directionIcon={"gf-right-arrow"} visibility={nextIsActive}
        //     handler={this.carouselSidebarPageIndex.bind(this)}/>;


        return (
            <div className={`row flex`}>
                {prevSideBar}
                <div className={`flex flex-grow flex-col justify-center`}>
                    {showPage}
                    <div className={`row carousel-pagination`}>
                        {pagination}
                    </div>
                </div>
                {nextSideBar}
            </div>
        )
    }
}

export default Carousel;
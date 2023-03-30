import React from 'react';

class Carousel extends React.Component {

    render() {
        let showPage = this.props.showPage;
        let prevSideBar = this.props.prevSideBar;
        let nextSideBar = this.props.nextSideBar;
        let pagination = this.props.pagination;

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
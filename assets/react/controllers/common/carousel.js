import React from 'react';

const carousel = {
    blockSize: { // number of sensors
        sm: 4, md: 6, lg: 9, xl: 12, xxl: 16, x2l: 20, x3l: 24
    }, blockColumn: { // number of columns regarding number of sensors
        sm: 2, md: 2, lg: 3, xl: 4, xxl: 4, x2l: 5, x3l: 6
    }, blockRows: { // number of rows per size
        sm: 2, md: 3, lg: 3, xl: 3, xxl: 4, x2l: 4, x3l: 4
    }, maxRows: 'sm', // max object rows
    pageCount: 0, // number of pages
    pages: {0: []}, // object id in pages
    page: 0, // selected page
    adder: 0, // object columns accumulator -> to calculate number of pages
    colPerPage: 12, // maximum columns per pages
    numberOfObjects: null, // number of objects
    pagination: [], // array with pages labels in pagination
    paginationPageStart: 1 // label number of first object
}

export default carousel;
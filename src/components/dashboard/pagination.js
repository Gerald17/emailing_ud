import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 
const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}
 
const defaultProps = {
    initialPage: 1,
    pageSize: 15
}
 
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }
 
    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.activePage.activePage);
        }
    }
 
    /*
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.activePage.activePage);
        }
    }
    */
 
    setPage(currentPage, page) {
        currentPage = this.props.activePage.activePage
        var { pageSize, totalCount } = this.props;
        var pager = this.state.pager; 
        if (page < 1 || page > pager.totalPages) {
            return;
        } 
        // get new pager object for specified page
        pager = this.getPager(totalCount, page, pageSize); 
        // update state
        this.setState({ pager: pager }); 
        // call change page function in parent component
        this.props.onChangePage(currentPage, page);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1; 
        // default page size is 10
        pageSize = pageSize || 10; 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize); 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages 
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        var pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
 
        return (

            <nav className='pagination' aria-label='pagination'>
                <div 
                    onClick={() => this.setPage(pager.currentPage, 1)} 
                    className='pagination-previous' 
                    disabled={ pager.currentPage === 1 ? true : false }>
                        Primero
                </div>
                <div 
                    onClick={() => this.setPage(pager.currentPage, pager.currentPage - 1)} 
                    className='pagination-next' 
                    disabled={ pager.currentPage === 1 ? true : false }>
                        Anterior
                </div>
                <ul className='pagination-list'>
                
                    {pager.pages.map((page, index) =>
                        <li onClick={() => this.setPage(pager.currentPage, page)} key={index} className={pager.currentPage === page ? 'pagination-link is-current' : 'pagination-link'}>
                            <span>{page}</span>
                        </li>
                    )}
                </ul>
                <div onClick={() => this.setPage(pager.currentPage, pager.totalPages)}
                    className='pagination-next' 
                    disabled={pager.currentPage === pager.totalPages ? true : false}>
                    Último
                </div>
                <div onClick={() => this.setPage(pager.currentPage, pager.currentPage + 1)}
                    className='pagination-previous' 
                    disabled={pager.currentPage === pager.totalPages ? true : false}>
                    Siguiente
                </div>
            </nav>
        );
    }
}
 
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

function mapState(state){
    return({
        activePage: state.activePage
    })
}

export default connect(mapState, null)(Pagination);

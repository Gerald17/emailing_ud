import React from 'react';
import { connect } from 'react-redux';

import { fetchEmailsFailed } from '../../actions/emails';
import CardCounter from './counter_card';
import DetailEmails from './detail_emails';
import Loader from '../loader/loader';
import { getFailed } from '../../config/api';
import Pagination from '../dashboard/pagination';
import { fetchActivePage } from '../../actions/pagination';
import { getIndex } from '../function_helpers/pagination_helper';

class FailedEmails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        };
        this.onChangePage = this.onChangePage.bind(this);
    }
 
    onChangePage(currentPage, page) {
        if(currentPage !== 0 && currentPage !== page && page !== undefined){
        const index = getIndex(page);
            this.loadData(index);
            this.props.fetchActivePage(page);
        }
    }
 
    loadData(page){       
        const { user } = this.props.user; 
        getFailed(user.userName, user.serverId, page)
        .then((res) => {
            this.props.fetchEmailsFailed(res);
        });
    }

    componentDidMount(){        
        this.loadData(0);
    }

    render() {
        const { failedFetched, failed } = this.props.emails;
        return (
            <React.Fragment>
                { failedFetched === false ?
                    <Loader/>
                    :
                    <div className='container'>
                        <div className='columns'>
                            <div className='column is-full has-text-centered'>
                                <CardCounter title={ 'Fallidos' } emailCount={ failed.totalCount }/>
                            </div> 
                        </div>
                        <div className='columns'>                    
                            <div className='column is-full'>
                                <DetailEmails state={ 'Fallido' } emailDetail={ failed.collection }/>
                                <Pagination totalCount={ failed.totalCount } items={ failed.collection } onChangePage={this.onChangePage}/>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
        
    }
}

function mapState(state){    
    return({
        emails: state.emailsFailed,
        user: state.user
    });
}

export default connect(mapState, { fetchEmailsFailed, fetchActivePage })(FailedEmails);
import React from 'react';
import { connect } from 'react-redux';

import { fetchEmailsQueued } from '../../actions/emails';
import { fetchActivePage } from '../../actions/pagination';
import { getIndex } from '../function_helpers/pagination_helper';
import CardCounter from './counter_card';
import DetailEmails from './detail_emails';
import Loader from '../loader/loader';
import { getQueued } from '../../config/api';
import Pagination from '../dashboard/pagination';

class SpamEmails extends React.Component {
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
        getQueued(user.userName, user.serverId, page)
        .then((res) => {
            this.props.fetchEmailsQueued(res);
            this.setState({loading: false})
        });
    }

    componentDidMount(){
        this.loadData(0);
    }

    render() {
        const { queued, queuedFetched } = this.props.emails;
        return(
            <React.Fragment>
                {   queuedFetched === false ?                    
                    <Loader/>
                :       
                    <div className='container'>
                        <div className='columns'>
                            <div className='column is-full has-text-centered'>
                                <CardCounter title={'Procesados'} emailCount={ queued.totalCount }/>
                            </div> 
                        </div>
                        <div className='columns'>                    
                            <div className='column is-full'>
                                <DetailEmails state={ 'Procesado' } emailDetail={ queued.collection }/>
                                <Pagination totalCount={ queued.totalCount } items={ queued.collection } onChangePage={this.onChangePage}/>
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
        emails: state.emailsQueued,
        user: state.user
    });
}

export default connect(mapState, { fetchEmailsQueued, fetchActivePage })(SpamEmails);

import React from 'react';
import { connect } from 'react-redux';

import { fetchEmailsSpam } from '../../actions/emails';
import { fetchActivePage } from '../../actions/pagination';
import CardCounter from './counter_card';
import DetailEmails from './detail_emails';
import Loader from '../loader/loader';
import { getSpam } from '../../config/api';
import { getIndex } from '../function_helpers/pagination_helper';
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
        getSpam(user.userName, user.serverId, page)
        .then((res) => {
            this.props.fetchEmailsSpam(res);
        });
    }

    componentDidMount(){
        this.loadData(0);
    }

    render() {
        const { spamFetched, spam } = this.props.emails;
        return(
            <React.Fragment>
                {   spamFetched === false ?
                    <Loader/>
                :       
                    <div className='container'>
                        <div className='columns'>
                            <div className='column is-full has-text-centered'>
                                <CardCounter title={ 'en Spam' }  emailCount={ spam.totalCount }/>
                            </div> 
                        </div>
                        <div className='columns'>                    
                            <div className='column is-full'>
                                <DetailEmails state={ 'En Spam' } emailDetail={ spam.collection }/>                                
                                <Pagination totalCount={ spam.totalCount } items={ spam.collection } onChangePage={this.onChangePage}/>
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
        emails: state.emailsSpam,
        user: state.user
    });
}

export default connect(mapState, { fetchEmailsSpam, fetchActivePage })(SpamEmails);

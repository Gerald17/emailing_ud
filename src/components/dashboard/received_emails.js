import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchEmailsReceived } from '../../actions/emails';
import { fetchActivePage } from '../../actions/pagination';
import CardCounter from './counter_card';
import DetailEmails from './detail_emails';
import Loader from '../loader/loader';
import Pagination from './pagination';
import { getIndex } from '../function_helpers/pagination_helper';
import { getReceived } from '../../config/api';

class ReceivedEmails extends React.Component {
    constructor(props) {
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
        getReceived(user.userName, user.serverId, page)
        .then((res) => {
            this.props.fetchEmailsReceived(res);
            this.setState({loading: false})
        });
    }

    componentDidMount(){
        this.loadData(0);
    }

    render() {
        const { receivedFetched, received } = this.props.emails;
        if(this.state.loading){
            return(
                <Loader/>
            );
        }   

        return(
            <React.Fragment>
                {   receivedFetched === false ?
                    <Loader/>
                :   
                <div>  
                    <div className='container'>
                        <div className='columns'>
                            <div className='column is-full has-text-centered'>
                                <CardCounter title={ 'Recibidos' } emailCount={ received.totalCount }/>
                            </div> 
                        </div>
                        <div className='columns'>                    
                            <div className='column is-full'>
                                <DetailEmails state={ 'Recibido' } emailDetail={ received.collection }/>                                
                                <Pagination totalCount={ received.totalCount } items={ received.collection } onChangePage={this.onChangePage}/>
                            </div>
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
        emails: state.emailsReceived,
        user: state.user,
        state: state.activePage
    });
}

function mapDispatch(dispatch){
    return bindActionCreators({ fetchEmailsReceived, fetchActivePage}, dispatch);
}

export default connect(mapState, mapDispatch)(ReceivedEmails);

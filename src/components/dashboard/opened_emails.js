import React from 'react';
import { connect } from 'react-redux';

import { fetchEmailsOpened } from '../../actions/emails';
import { fetchActivePage } from '../../actions/pagination';
import CardCounter from './counter_card';
import DetailEmails from './detail_emails';
import Loader from '../loader/loader';
import { getIndex } from '../function_helpers/pagination_helper';
import { getOpened } from '../../config/api';
import Pagination from '../../components/dashboard/pagination';

class OpenedEmails extends React.Component {
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
        getOpened(user.userName, user.serverId, page)
        .then((res) => {
            this.props.fetchEmailsOpened(res);
        });
    }

    componentDidMount(){
        this.loadData(0);
    }

    render() {  
        const { openedFetched, opened } = this.props.emails;
        return(
            <React.Fragment>
                { openedFetched === false ?  
                    <Loader/>
                :
                    <div className='container'>
                        <div className='columns'>
                            <div className='column is-full has-text-centered'>
                                <CardCounter title={ 'Abiertos' }  emailCount={ opened.totalCount }/>
                            </div> 
                        </div>
                        <div className='columns'>                    
                            <div className='column is-full'>
                                <DetailEmails state={ 'Abiertos' } emailDetail={ opened.collection }/>
                                <Pagination totalCount={ opened.totalCount } items={ opened.collection } onChangePage={this.onChangePage}/>
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
        emails: state.emailsOpened,
        user: state.user
    });
}

export default connect(mapState, { fetchEmailsOpened, fetchActivePage })(OpenedEmails);

//alternativa para usar acciones en props { fetchEmailsOpened } en lugar de crear una funcion aparte
//export default connect(mapState, {fetchEmailsOpened})(OpenedEmails);


import { combineReducers } from 'redux';
import user_reducer  from './user/user_reducer'; //user login data
import received_reducer  from './emails/received_reducer'; //emails received
import opened_reducer  from './emails/opened_reducer'; //emails opened
import failed_reducer  from './emails/failed_reducer'; //emails opened
import spam_reducer  from './emails/spam_reducer'; //emails in spam
import queued_reducer  from './emails/queued_reducer'; //emails outbound
import account_info from './account/account_info_reducer';
import pagination_reducer from '../reducers/pagination/pagination_reducer';
import { reducer as formReducer } from 'redux-form';

const mainReducer = combineReducers({
    user: user_reducer,
    emailsReceived: received_reducer,
    emailsOpened: opened_reducer,
    emailsFailed: failed_reducer,
    emailsSpam: spam_reducer,
    emailsQueued: queued_reducer,
    accountInfo: account_info,
    form: formReducer,
    activePage: pagination_reducer

});

export default mainReducer;

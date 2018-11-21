import { FETCH_EMAILS_RECEIVED } from '../../actions/emails_received';
import _ from 'lodash';

const receivedDefault = {
    received: [],
    receivedFetched: false,
    collection: {},
}

export default function(state = receivedDefault, action){
    switch(action.type){
        case FETCH_EMAILS_RECEIVED:        
            return{
                ...state, 
                received : action.payload.data, 
                receivedFetched: true,
                collection: _.mapKeys(action.payload.data.collection, 'MessageId')
            }
        default:
         return state;
    }
}
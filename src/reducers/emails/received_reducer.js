import { FETCH_EMAILS_RECEIVED } from '../../actions/emails';

const receivedDefault = {
    received: [],
    receivedFetched: false
}

export default function(state = receivedDefault, action){
    switch(action.type){
        case FETCH_EMAILS_RECEIVED:        
            return{...state, received : action.payload.data, receivedFetched: true }
        default:
         return state;
    }
}
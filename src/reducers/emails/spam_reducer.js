import { FETCH_EMAILS_SPAM } from '../../actions/emails';

const spamDefault = {
    spam: [],
    spamFetched: false
}

export default function(state = spamDefault, action){
    switch(action.type){
        case FETCH_EMAILS_SPAM:                
            return{...state, spam : action.payload.data, spamFetched: true }
        default:
         return state;
    }
}

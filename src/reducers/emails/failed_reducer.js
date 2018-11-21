import { FETCH_EMAILS_FAILED } from '../../actions/emails';

const failedDefault = {
    failed: [],
    failedFetched: false
}

export default function(state = failedDefault, action){
    switch(action.type){
        case FETCH_EMAILS_FAILED:        
            return{...state, failed : action.payload.data, failedFetched: true }
        default:
         return state;
    }
}
import { FETCH_EMAILS_QUEUED } from '../../actions/emails';

const queuedDefault = {
    queued: [],
    queuedFetched: false
}

export default function(state = queuedDefault, action){
    switch(action.type){
        case FETCH_EMAILS_QUEUED:                
            return{...state, queued : action.payload.data, queuedFetched: true }
        default:
         return state;
    }
}

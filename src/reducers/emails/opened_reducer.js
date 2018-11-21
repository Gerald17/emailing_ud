import { FETCH_EMAILS_OPENED } from '../../actions/emails';

const openedDefault = {
    opened: [],
    openedFetched: false
}

export default function(state = openedDefault, action){
    switch(action.type){
        case FETCH_EMAILS_OPENED:                
            return{...state, opened : action.payload.data, openedFetched: true }
        default:
         return state;
    }
}
import { FETCH_ACTIVE_PAGE } from '../../actions/pagination';

const defaultPage = {
    activePage: 1
}

export default function(state=defaultPage, action){
    switch(action.type){
        case FETCH_ACTIVE_PAGE:
            return {...state, activePage: action.payload}
        default :
            return {...state} 
    }
}

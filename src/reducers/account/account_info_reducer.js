import { FETCH_ACCOUNT_INFO } from '../../actions/account_info';

const accountDefault = {
    accountInfo: {},
    accountInfoFetched: false,
}

export default function(state = accountDefault, action) {
    switch(action.type){
        case FETCH_ACCOUNT_INFO:
            return { ...state, 
                accountInfo: action.payload.data, 
                accountInfoFetched: true,
            }
        default:
            return state;
    }
}

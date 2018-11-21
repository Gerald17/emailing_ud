import { FETCH_USER, LOGOUT } from '../../actions/user';

const userDefault = {
    user: {},
    userFetched: false,
    loggedIn: false,
}

function isLogged(user){
    if(user.userName !== ''){
        return true;
    }else{
        return false;
    }
}

export default function(state = userDefault, action) {
    switch(action.type){
        case FETCH_USER:          
            return { ...state, 
                user: action.payload.data, 
                userFetched: true,
                loggedIn: isLogged(action.payload.data)
            }
        case LOGOUT:
            return{
                ...state,
                user: {},
                loggedIn: false,
                userFetched: false,
            }
        // key value pair
        // return { ...state, [action.payload.data.id] : action.payload.data}
        default:
            return state;
    }
}

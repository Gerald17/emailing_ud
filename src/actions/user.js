export const FETCH_USER = 'FETCH_USER';
export const LOGOUT = 'LOGOUT';

export function fetchUser(payload){
    return{
        type: FETCH_USER,
        payload
    }
}

export function logOut(){
    return{
        type: LOGOUT
    }
}

export const FETCH_ACCOUNT_INFO = 'FETCH_ACCOUNT_INFO';

export function fetchAccountInfo(payload){
    return{
        type: FETCH_ACCOUNT_INFO,
        payload,
    }
}

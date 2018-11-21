export const FETCH_ACTIVE_PAGE = 'FETCH_ACTIVE_PAGE';

export function fetchActivePage(payload){
    return{
        type: FETCH_ACTIVE_PAGE,
        payload
    }
}
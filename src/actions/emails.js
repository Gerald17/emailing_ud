export const FETCH_EMAILS_RECEIVED = 'FETCH_EMAILS_RECEIVED';
export const FETCH_EMAILS_FAILED = 'FETCH_EMAILS_FAILED';
export const FETCH_EMAILS_SPAM = 'FETCH_EMAILS_SPAM';
export const FETCH_EMAILS_OPENED = 'FETCH_EMAILS_OPENED';
export const FETCH_EMAILS_QUEUED = 'FETCH_EMAILS_QUEUED';

export function fetchEmailsReceived(payload){ 
    return{
        type: FETCH_EMAILS_RECEIVED,
        payload,
    }
}

export function fetchEmailsFailed(payload){
    return{
        type: FETCH_EMAILS_FAILED,
        payload,
    }
}

export function fetchEmailsSpam(payload){
    return{
        type: FETCH_EMAILS_SPAM,
        payload,
    }
}

export function fetchEmailsOpened(payload){
    return{
        type: FETCH_EMAILS_OPENED,
        payload,
    }
}

export function fetchEmailsQueued(payload){
    return{
        type: FETCH_EMAILS_QUEUED,
        payload,
    }
}

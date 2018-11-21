import axios from 'axios';

//export const BASE_URL = 'http://localhost:4944/api/'; //interno
export const BASE_URL = 'http://www.svrrdca.com:9091/api/'; //interno
//export const BASE_URL = 'http://181.225.132.102/emailingAPI/api/';

export const api = axios.create({
    baseURL: BASE_URL,
    //timeout: 1000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'crossDomain': true
    }
  });


export function login(values){  
    const url = `userlogin?userName=${values.userName}&userPassword=${values.userPassword}`;
    const request = api.get(url);
    return request;
}

export function getAccountInfo(user, server){  
    const url = `accountData?user=${user}&serverId=${server}`;
    const request = api.get(url);
    return request;
}

export function getReceived(user, serverId, page){  
    const url = `messagesprocessed?user=${user}&serverId=${serverId}&index=${page}`;
    const request = api.get(url);
    return request;
}

export function getOpened(user, serverId, page){  
    const url = `messagesopen?user=${user}&serverId=${serverId}&index=${page}`;
    const request = api.get(url);
    return request;
}

export function getSpam(user, serverId, page){  
    const url = `messagesspam?user=${user}&serverId=${serverId}&index=${page}`;
    const request = api.get(url);
    return request;
}

export function getFailed(user, serverId, page){
    const url = `messagesfailed?user=${user}&serverId=${serverId}&index=${page}`;
    const request = api.get(url);
    return request;
}

export function getProcessed(user, serverId, page){
    const url = `messagesprocessed?user=${user}&serverId=${serverId}&index=${page}`;
    const request = api.get(url);
    return request;
}

export function getQueued(user, serverId, page){
    const url = `messagesQueued?user=${user}&serverId=${serverId}&index=${page}`;
    const request = api.get(url);
    return request;
}

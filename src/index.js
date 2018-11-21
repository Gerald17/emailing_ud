import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers/index';
//import logger from 'redux-logger';
import { loadState, saveState } from './config/loadState';

import App from './components/App';

const persistedState = loadState();
const store = createStore(reducers, persistedState, applyMiddleware(ReduxPromise, /*logger*/));

store.subscribe(()=>{    
    saveState(store.getState())
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

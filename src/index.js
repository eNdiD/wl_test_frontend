import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store';

import App from './containers/app';


const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

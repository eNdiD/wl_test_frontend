import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import filmsList from './films-list';


export default combineReducers({
    router: routerReducer,
    filmsList
});

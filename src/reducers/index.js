import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import filmsList from './films';
import actorsList from './actors';


export default combineReducers({
    router: routerReducer,
    filmsList,
    actorsList
});

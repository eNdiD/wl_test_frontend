import {
    GET_ACTORS_LIST_REQUEST,
    GET_ACTORS_LIST_SUCCESS,
    GET_ACTORS_LIST_FAIL
} from '../constants';


const initialState = {
    actors: [],
    fetching: true,
    error: false
};

export default function actorsList(state = initialState, action) {
    switch (action.type) {
        case GET_ACTORS_LIST_REQUEST:
            return {
                ...state,
                fetching: true,
                error: false
            };

        case GET_ACTORS_LIST_SUCCESS:
            return {
                ...state,
                actors: action.payload.actors,
                fetching: false,
                error: false
            };

        case GET_ACTORS_LIST_FAIL:
            return {
                ...state,
                fetching: false,
                error: true
            };

        default:
            return state;
    }
}

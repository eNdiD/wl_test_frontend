import {
    GET_FILMS_LIST_REQUEST,
    GET_FILMS_LIST_SUCCESS,
    GET_FILMS_LIST_FAIL
} from '../constants';


const initialState = {
    films: [],
    fetching: false,
    error: false
};

export default function filmsList(state = initialState, action) {
    switch (action.type) {
        case GET_FILMS_LIST_REQUEST:
            return {
                ...state,
                fetching: true,
                error: false
            };

        case GET_FILMS_LIST_SUCCESS:
            return {
                ...state,
                films: action.payload.films,
                fetching: false,
                error: false
            };

        case GET_FILMS_LIST_FAIL:
            return {
                ...state,
                fetching: false,
                error: true
            };

        default:
            return state;
    }
}

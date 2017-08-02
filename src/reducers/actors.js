import {
    GET_ACTORS_LIST_REQUEST,
    GET_ACTORS_LIST_SUCCESS,
    GET_ACTORS_LIST_FAIL,
    ADD_ACTOR_ITEM_REQUEST,
    ADD_ACTOR_ITEM_SUCCESS,
    ADD_ACTOR_ITEM_FAIL,
    DELETE_ACTOR_ITEM_REQUEST,
    DELETE_ACTOR_ITEM_SUCCESS,
    DELETE_ACTOR_ITEM_FAIL
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

        case ADD_ACTOR_ITEM_REQUEST:
            return {
                ...state,
                fetching: true,
                error: false
            };

        case ADD_ACTOR_ITEM_SUCCESS:
            return {
                ...state,
                actors: [
                    ...state.actors,
                    action.payload.actor
                ],
                fetching: false,
                error: false
            };

        case ADD_ACTOR_ITEM_FAIL:
            return {
                ...state,
                fetching: false,
                error: true
            };

        case DELETE_ACTOR_ITEM_REQUEST:
            return {
                ...state,
                fetching: true,
                error: false
            };

        case DELETE_ACTOR_ITEM_SUCCESS:
            return {
                ...state,
                actors: _remove(state.actors, item => item.pk != action.payload.pk),
                fetching: false,
                error: false
            };

        case DELETE_ACTOR_ITEM_FAIL:
            return {
                ...state,
                fetching: false,
                error: true
            };

        default:
            return state;
    }
}

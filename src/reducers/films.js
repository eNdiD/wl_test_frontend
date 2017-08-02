import {
    orderBy as _orderBy,
    remove as _remove
} from 'lodash-es';

import {
    GET_FILMS_LIST_REQUEST,
    GET_FILMS_LIST_SUCCESS,
    GET_FILMS_LIST_FAIL,
    DELETE_FILM_ITEM_REQUEST,
    DELETE_FILM_ITEM_SUCCESS,
    DELETE_FILM_ITEM_FAIL,
    ADD_FILM_ITEM_REQUEST,
    ADD_FILM_ITEM_SUCCESS,
    ADD_FILM_ITEM_FAIL,
    CHANGE_FILMS_LIST_ORDER,
    STATUS_TEXT_SHOW,
    STATUS_TEXT_HIDE
} from '../constants';


const initialState = {
    films: [],
    fetching: true,
    error: false,
    order_by: 'title',
    order: 'asc',
    status: ''
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
                films: _orderBy(action.payload.films, [state.order_by], [state.order]),
                fetching: false,
                error: false
            };

        case GET_FILMS_LIST_FAIL:
            return {
                ...state,
                fetching: false,
                error: true
            };

        case ADD_FILM_ITEM_REQUEST:
            return {
                ...state,
                fetching: true,
                error: false
            }

        case ADD_FILM_ITEM_SUCCESS:
            return {
                ...state,
                films: _orderBy(
                    [
                        ...state.films,
                        action.payload.film
                    ],
                    [state.order_by], [state.order]
                ),
                fetching: false,
                error: false
            }

        case ADD_FILM_ITEM_FAIL:
            return {
                ...state,
                fetching: false,
                error: true
            };

        case DELETE_FILM_ITEM_REQUEST:
            return {
                ...state,
                fetching: true,
                error: false
            };

        case DELETE_FILM_ITEM_SUCCESS:
            return {
                ...state,
                films: _remove(state.films, item => item.pk != action.payload.pk),
                fetching: false,
                error: false
            };

        case DELETE_FILM_ITEM_FAIL:
            return {
                ...state,
                fetching: false,
                error: true
            };

        case CHANGE_FILMS_LIST_ORDER:
            const { order_by } = action.payload;

            let order = undefined;
            if (state.order_by && state.order_by === order_by) {
                switch (state.order) {
                    case 'asc':
                        order = 'desc';
                        break;
                    case 'desc':
                        order = 'asc';
                        break;
                    default:
                        order = 'asc';
                }
            } else {
                order = 'asc';
            }

            return {
                ...state,
                films: _orderBy(state.films, [order_by], [order]),
                order_by: order_by,
                order: order
            }

        case STATUS_TEXT_SHOW:
            return {
                ...state,
                status: action.payload.text
            }

        case STATUS_TEXT_HIDE:
            return {
                ...state,
                status: ''
            }

        default:
            return state;
    }
}

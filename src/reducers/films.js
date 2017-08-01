import { orderBy as _orderBy } from 'lodash-es';

import {
    GET_FILMS_LIST_REQUEST,
    GET_FILMS_LIST_SUCCESS,
    GET_FILMS_LIST_FAIL,
    CHANGE_FILMS_LIST_ORDER
} from '../constants';


const initialState = {
    films: [],
    fetching: true,
    error: false,
    order_by: 'title',
    order: 'asc'
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

        default:
            return state;
    }
}

import 'whatwg-fetch';

import {
    GET_FILMS_LIST_REQUEST,
    GET_FILMS_LIST_SUCCESS,
    GET_FILMS_LIST_FAIL,
    CHANGE_FILMS_LIST_ORDER
} from '../constants';

import { API_ROOT_URL } from '../config';


export function getFilmsList() {
    return (dispatch) => {
        dispatch({
            type: GET_FILMS_LIST_REQUEST
        });

        const query = `${ API_ROOT_URL }films/`;

        fetch(query)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: GET_FILMS_LIST_SUCCESS,
                    payload: {
                        films: response
                    }
                })
            })
            .catch(e => {
                console.error(e);
                dispatch({
                    type: GET_FILMS_LIST_FAIL,
                    error: true
                })
            });
    }
}

export function changeOrder(order_by) {
    return {
        type: CHANGE_FILMS_LIST_ORDER,
        payload: {
            order_by: order_by
        }
    }
}

import 'whatwg-fetch';

import {
    GET_FILMS_LIST_REQUEST,
    GET_FILMS_LIST_SUCCESS,
    GET_FILMS_LIST_FAIL,
    DELETE_FILM_ITEM_REQUEST,
    DELETE_FILM_ITEM_SUCCESS,
    DELETE_FILM_ITEM_FAIL,
    CHANGE_FILMS_LIST_ORDER,
    STATUS_TEXT_SHOW,
    STATUS_TEXT_HIDE
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

export function deleteFilmItem(pk) {
    return (dispatch) => {
        dispatch({
            type: DELETE_FILM_ITEM_REQUEST
        });

        const query = `${ API_ROOT_URL }films/${ pk }/`;

        fetch(query, { method: 'DELETE' })
            .then(() => {
                dispatch({
                    type: DELETE_FILM_ITEM_SUCCESS,
                    payload: {
                        pk: pk
                    }
                })
            })
            .catch(e => {
                console.error(e);
                dispatch({
                    type: DELETE_FILM_ITEM_FAIL,
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

export function showStatus(text) {
    return (dispatch) => {
        dispatch({
            type: STATUS_TEXT_SHOW,
            payload: {
                text: text
            }
        });

        setTimeout(() => {
            dispatch({
                type: STATUS_TEXT_HIDE
            });
        }, 3000);
    }
}

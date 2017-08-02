import 'whatwg-fetch';

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

import { API_ROOT_URL } from '../config';


export function getActorsList() {
    return (dispatch) => {
        dispatch({
            type: GET_ACTORS_LIST_REQUEST
        });

        const query = `${ API_ROOT_URL }actors/`;

        fetch(query)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: GET_ACTORS_LIST_SUCCESS,
                    payload: {
                        actors: response
                    }
                })
            })
            .catch(e => {
                console.error(e);
                dispatch({
                    type: GET_ACTORS_LIST_FAIL,
                    error: true
                })
            });
    }
}

export function addActorItem(data) {
    return (dispatch) => {
        dispatch({
            type: ADD_ACTOR_ITEM_REQUEST
        });

        const query = `${ API_ROOT_URL }actors/`;

        fetch(query, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) })
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: ADD_ACTOR_ITEM_SUCCESS,
                    payload: {
                        actor: response
                    }
                })
            })
            .catch(e => {
                console.error(e);
                dispatch({
                    type: ADD_ACTOR_ITEM_FAIL,
                    error: true
                })
            });
    }
}

export function deleteActorItem(pk) {
    return (dispatch) => {
        dispatch({
            type: DELETE_ACTOR_ITEM_REQUEST
        });

        const query = `${ API_ROOT_URL }actors/${ pk }/`;

        fetch(query, { method: 'DELETE' })
            .then(() => {
                dispatch({
                    type: DELETE_ACTOR_ITEM_SUCCESS,
                    payload: {
                        pk: pk
                    }
                })
            })
            .catch(e => {
                console.error(e);
                dispatch({
                    type: DELETE_ACTOR_ITEM_FAIL,
                    error: true
                })
            });
    }
}

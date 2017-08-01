import 'whatwg-fetch';

import {
    GET_ACTORS_LIST_REQUEST,
    GET_ACTORS_LIST_SUCCESS,
    GET_ACTORS_LIST_FAIL
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

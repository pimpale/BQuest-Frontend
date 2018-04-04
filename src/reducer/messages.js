import Immutable, { fromJS } from 'immutable';

import Storage from 'storage';
import Config from 'config';
import { logout } from './login';

/////////////
// ACTIONS //
/////////////

const SEND_MESSAGE_START = 'send_message_start';
const SEND_MESSAGE_SUCCESS = 'send_message_success';
const SEND_MESSAGE_ERROR = 'send_message_error';

const FETCH_ALL_THREADS_START = 'fetch_all_threads_start';
const FETCH_ALL_THREADS_SUCCESS = 'fetch_all_threads_success';
const FETCH_ALL_THREADS_ERROR = 'fetch_all_threads_error';

const FETCH_ALL_MESSAGES_START = 'fetch_all_messages_start';
const FETCH_ALL_MESSAGES_SUCCESS = 'fetch_all_messages_success';
const FETCH_ALL_MESSAGES_ERROR = 'fetch_all_messages_error';

const fetchThreads = () => {
    return async dispatch => {
        const token = Storage.get('token');

        try {
            const response = await fetch(`${Config.API_URL}/messaging/me/`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`                    
                })
            });

            const status = await response.status;
            const data = await response.json();

            if (status >= 400) {
                return dispatch({
                    type: FETCH_ALL_MESSAGES_ERROR,
                    message: "Could not fetch your messages at this time"
                });
            }

            dispatch({
                type:FETCH_ALL_THREADS_SUCCESS,
                data,
            });            
        } catch (err) {
            dispatch({
                type: FETCH_ALL_THREADS_ERROR,
                error: err.message
            });
        }
    }
}

const defaultState = Immutable.fromJS({
    profileViewing: {  // the current user we are talking to in the thread view
        profileID: -1,  // ID of the user who we are currently talking to
        messages: [],
    },
    threads: [],  // all the threads that this user is part of
    count: null,
    error: null,
});

const Messages = (state = defaultState, action) => {
    switch(action.type) {
        // Add your action types here
        case FETCH_ALL_THREADS_SUCCESS: {
            return state.withMutations(val => {
                val.set('count', action.data.count);
                val.set('threads', fromJS(action.data.results));
            });
        }
        default: {
            return state;
        }
    }
}

export { 
    Messages,
    fetchThreads
}
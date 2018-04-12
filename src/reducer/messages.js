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
const SET_THREAD_VIEWING = 'change_thread_viewing';

const FETCH_MESSAGES_START = 'fetch_all_messages_start';
const FETCH_MESSAGES_SUCCESS = 'fetch_all_messages_success';
const FETCH_MESSAGES_ERROR = 'fetch_all_messages_error';

const setProfileViewing = id => {
    return {
        type: CHANGE_THREAD_VIEWING,
        id
    }
}
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
                throw new Error("Could not fetch your messages at this time");
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

const fetchMessages = id => {
    return async dispatch => {
        const token = Storage.get('token');
        
        try {
            const response = await fetch(`${Config.API_URL}/messaging/${id}/`, {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`
                })
            });
            const status = await response.status;
            const data = await response.json();

            if (status >= 400) {
                throw new Error("Error getting all messages for this thread");
            }

            return dispatch({
                type: FETCH_MESSAGES_SUCCESS,
                id,
                data
            });
        } catch (err) {
            dispatch({
                type: FETCH_MESSAGES_ERROR,
                error: err.message
            });
        }
    }
}

const fetchMessagesIfThreadExists = id => {
    return async dispatch  => {
        const token = Storage.get('token');

        try {
            const response = await fetch(`${Config.API_URL}/messaging/check/${id}/`, {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`
                })
            });
            const status = await response.status;
            const data = await response.json();

            if (status >= 400) {
                throw new Error("Error checking if thread exists for this user");
            }
    
            if (data.exists) {
                return dispatch(fetchMessages(id));
            }
        } catch (err) {
            dispatch({
                type: FETCH_MESSAGES_ERROR,
                error: err.message
            })
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
                val.set('error', null);
                val.set('threads', fromJS(action.data.results));
            });
        }
        case FETCH_ALL_THREADS_ERROR: {
            return state.withMutations(val => {
                val.set('error', action.error);
            })
        }
        case FETCH_MESSAGES_SUCCESS: {
            return state.withMutations(val => {
                val.setIn(['profileViewing', 'profileID'], action.id);
                val.setIn(['profileViewing', 'messages'], fromJS(action.data.results));
            })
        }
        case SET_THREAD_VIEWING: {
            return state.withMutations(val => {
                val.setIn(['profileViewing', 'profileID'], action.id);
            })
        }
        default: {
            return state;
        }
    }
}


export {
    Messages,
    fetchThreads,
    fetchMessagesIfThreadExists,
    setProfileViewing,
}

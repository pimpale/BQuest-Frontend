import Immutable, { fromJS } from 'immutable';
import { notify } from 'reapop';

import Storage from 'storage';
import Config from 'config';
import { logout } from './login';

/////////////
// ACTIONS //
/////////////

const SEND_MESSAGE_SUCCESS = 'send_message_success';
const SEND_MESSAGE_ERROR = 'send_message_error';

const FETCH_ALL_THREADS_START = 'fetch_all_threads_start';
const FETCH_ALL_THREADS_SUCCESS = 'fetch_all_threads_success';
const FETCH_ALL_THREADS_ERROR = 'fetch_all_threads_error';

const THREAD_EXISTS = 'thread_exists'; 
const FETCH_MESSAGES_START = 'fetch_all_messages_start';
const FETCH_MESSAGES_SUCCESS = 'fetch_all_messages_success';
const FETCH_MESSAGES_ERROR = 'fetch_all_messages_error';

const REMOVE_PROFILE_VIEWING = 'remove_profile_viewing';

const sendMessageSuccess = message => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        message
    }
}

const sendMessage = (message, profileID) => {
    return async (dispatch, getState) => {
        try {
            let shouldNotify = true;
            if (!profileID) {
                profileID = getState().Messages.getIn(['profileViewing','profileID']);
                shouldNotify = false;
            }

            const response = await fetch(Config.API_URL + `/messaging/${profileID}/`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Storage.get("token")}`
                }),
                body: JSON.stringify({
                    body: message
                })
            });

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error();
            } else {
                dispatch(sendMessageSuccess(data));
                dispatch(fetchThreads());
                if (shouldNotify) {
                    dispatch(notify({status: 'success', message: 'Your message has been sent!', position: 'tc'}));
                }
            }
        }
        catch (err) {
            const message = "We couldn't send your message :( Try again later";
            dispatch(notify({title: 'Error!', status: 'error', message, position: 'tc'}));
            dispatch({type: SEND_MESSAGE_ERROR});
        }
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

const checkIfThreadExists = id => {
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
            if (status >= 400) {
                throw new Error("NO_THREAD");
            }     

            const data = await response.json();
            if (!data.exists) {
                throw new Error("NO_THREAD");
            }

            dispatch({
                id,
                type: THREAD_EXISTS
            })
        } catch (err) {
            dispatch({
                type: FETCH_MESSAGES_ERROR,
                error: err.message
            })
        }
    }
}

const removeProfileViewing = () => {
    return {
        type: REMOVE_PROFILE_VIEWING
    }
}

const defaultState = Immutable.fromJS({
    profileViewing: {  // the current user we are talking to in the thread view
        profileID: null,  // ID of the user who we are currently talking to
        messages: [],
    },
    threads: [],  // all the threads that this user is part of
    count: null,
    error: null,
});


const Messages = (state = defaultState, action) => {
    switch(action.type) {
        case THREAD_EXISTS: {
            return state.withMutations(val => {
                val.setIn(['profileViewing', 'profileID'], action.id);
            });
        }
        case SEND_MESSAGE_SUCCESS: {
            return state.withMutations(val => {
                const messages = val.getIn(['profileViewing', 'messages']);
                // push to beginning of list
                const newMessages = messages.insert(0, fromJS(action.message));
                val.setIn(['profileViewing', 'messages'], newMessages);
            })
        }
        case FETCH_ALL_THREADS_SUCCESS: {
            return state.withMutations(val => {
                val.set('count', action.data.count);
                val.set('error', null);
                val.set('threads', fromJS(action.data.results));
            })
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
        case FETCH_MESSAGES_ERROR: {
            return state.withMutations(val => {
                val.set('error', action.error);
            });
        }
        case REMOVE_PROFILE_VIEWING: {
            return state.withMutations(val => {
                val.set('profileViewing', fromJS({
                    profileID: null,
                    messages: []
                }));
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
    fetchMessages,
    checkIfThreadExists,
    sendMessage,
    removeProfileViewing
}

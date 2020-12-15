import Immutable, { fromJS } from 'immutable';
import formurlencoded from "form-urlencoded";
import {push} from 'connected-react-router';
import { addNotification as notify } from 'reapop';
import Config from '../config';
import Storage from '../storage';

/////////////
/// TYPES ///
/////////////

const REQUESTS_START = 'requests_start';
const REQUESTS_SUCCESS = 'requests_success';

const SEND_REQUEST_START = 'send_request_start';
const SEND_REQUEST_SUCCESS = 'send_request_success';
const SEND_REQUEST_ERROR = 'send_request_error';


/////////////
// ACTIONS //
/////////////

const dummyRequests = Immutable.fromJS([
    {
        mentee: {
            id: 1,
            first_name: "Bob",
            last_name: "Smith",
            email: "test@marktai.com",
            verified: false,
            picture: null
        },
        mentor: {
            id: 3,
            profile: {
                id: 2,
                first_name: "Jane",
                last_name: "Doe",
                email: "longerbeamalex@gmail.com",
                verified: true,
                picture: null
            }
        },
        email_body: "Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        preferred_mentee_email: "longerbeamalex@gmail.com",
        phone: "",
        date_created: "2017-12-03T22:36:17.422868Z"
    },
    {
        mentee: {
            id: 1,
            first_name: "Jane",
            last_name: "Doe",
            email: "test@marktai.com",
            verified: false,
            picture: null
        },
        mentor: {
            id: 2,
            profile: {
                id: 2,
                first_name: "Alex",
                last_name: "Longerbeam",
                email: "longerbeamalex@gmail.com",
                verified: true,
                picture: null
            }
        },
        email_body: "You sound really cool!",
        preferred_mentee_email: "longerbeamalex@gmail.com",
        phone: "",
        date_created: "2017-12-03T22:36:17.422868Z"
    }
])

const requestsStart = () => {
    return {
        type: REQUESTS_START
    }
}

const requestsSuccess = (requests) => {
    return {
        type: REQUESTS_SUCCESS,
        requests
    };
}

const getRequests = () => {
	return async dispatch => {
		try {
            const token = Storage.get('token');

			dispatch({type: REQUESTS_START});

            const requestResponse = await fetch(Config.API_URL + '/requests/list/me/', {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`
                })
            })

            const requestStatus = await requestResponse.status;
            const requestData = await requestResponse.json();

            if (requestStatus > 299 || requestStatus < 200) {
                throw new Error("Error fetching profile");
            } else {
                dispatch({type: REQUESTS_SUCCESS, requests: requestData.results});
            }

        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: 'There was an error fetching requests', position: 'tc'}));
        }
	};
}

const sendRequest = (message, mentorId) => {
    return async (dispatch, getState) => {
        try {
            const profile = getState().Profile

            dispatch({type: SEND_REQUEST_START});

            const response = await fetch(Config.API_URL + `/requests/${mentorId}/`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Storage.get("token")}`
                }),
                body: JSON.stringify({
                    phone: '', // FOR NOW
                    preferred_mentee_email: profile.getIn(['user', 'email']),
                    message
                })
            });

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error(data.error);
            } else {
                dispatch(notify({title: "Success!", status: 'success', message: "Your message is on the way", position: "tc"}));
                dispatch({type: SEND_REQUEST_SUCCESS, request: data});
            }
        }
        catch (err) {
            const message = "We couldn't send your request :( Try again or contact us";
            dispatch(notify({title: 'Error!', status: 'error', message, position: 'tc'}));
            dispatch({type: SEND_REQUEST_ERROR, error: err.message});
        }
    }
}

///////////
// STATE //
///////////

const defaultState = Immutable.fromJS({
    error: null,
    loading: false,
    requests: []
});

const Requests = (state=defaultState, action) => {
    switch(action.type) {
        case REQUESTS_START: {
            return state.withMutations(val => {
                val.set('loading', true);
            })
        }
        case REQUESTS_SUCCESS: {
            return state.withMutations(val => {
                val.set('loading', false);
                val.set('requests', fromJS(action.requests));
            })
        }
        case SEND_REQUEST_START: {
            return state.withMutations(val => {
                val.set('loading', true);
            });
        }
        case SEND_REQUEST_SUCCESS: {
            return state.withMutations(val => {
                const requests = val.get('requests');
                const newRequests = requests.push(fromJS(action.request));
                val.set('requests', newRequests);
            });
        }
        case SEND_REQUEST_ERROR: {
            return state.withMutations(val => {
                val.set('error', action.error);
            });
        }
        default: {
            return state;
        }
    }
}


export { Requests, getRequests, sendRequest }

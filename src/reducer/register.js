import Immutable from 'immutable';
import { addNotification as notify } from 'reapop';
import { replace } from 'connected-react-router';

import { setProfile } from './profile';
import { login, logout } from './login';
import Storage from '../storage';
import Config from '../config';

////////////
// TYPES  //
////////////

const START_SEND_VERIFICATION_LINK = 'start_send_verification_link';
const SEND_VERIFICATION_LINK_SUCCESS = 'send_verification_link_success';
const SEND_VERIFICATION_LINK_FAILURE = 'send_verification_link_failure';

const VERIFY_CODE_START = 'verify_code_start';
const VERIFY_CODE_SUCCESS = 'verify_code_success';
const VERIFY_CODE_FAILURE = 'verify_code_failure';

const COMPLETE_REGISTRATION_START = 'complete_registration_start';
const COMPLETE_REGISTRATION_SUCCESS = 'complete_registration_success';
const COMPLETE_REGISTRATION_FAILURE = 'complete_registration_failure';

/////////////
// ACTIONS //
/////////////
const startSendVerificationLink = (email) => {
    return {
        type: START_SEND_VERIFICATION_LINK,
        email
    }
}


const registerEmailSuccess = (email, profileId) => {
    return {
        type: SEND_VERIFICATION_LINK_SUCCESS,
        email,
        profileId
    };
}

const verifyCodeSuccess = profile_id => {
    return {
        type: VERIFY_CODE_SUCCESS,
        profile_id
    }
}

const sendVerificationLink = (email, password) => {
    return async (dispatch) => {
        try {
            const fullEmail = email + '@g.ucla.edu';
            dispatch(startSendVerificationLink(fullEmail));

            const response = await fetch(Config.API_URL + '/users/', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    email: fullEmail,
                    password
                })
            });

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error(data.error);
            } else {
                dispatch(registerEmailSuccess(data.email, data.id));

                // also login to get the access token
                dispatch(login(email, password));
            }


        } catch (error) {
            // handle errors here
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'}));
            dispatch({type: SEND_VERIFICATION_LINK_FAILURE, message: error.message});
        }
    }
}

const confirmCode = (verification_code) => {
    return async (dispatch, getState) => {
        try {
            if (!Storage.get("token")) {
                const state = getState();
                const redirect = state.router.location.pathname + state.router.location.search;
                dispatch(notify({status: "info", message: "Please enter the credentials you used to create your account", position: "tc"}));
                return dispatch(replace(`/login?redirect=${redirect}`));
            }

            dispatch({type: VERIFY_CODE_START});

            const response = await fetch(Config.API_URL + '/verify/', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Storage.get('token')}`
                }),
                body: JSON.stringify({
                    verification_code
                })
            })

            const status = await response.status;
            const data = await response.json();

            if (status == 401) {
                dispatch(logout());
                const state = getState();
                const redirect = state.router.location.pathname + state.router.location.search;
                dispatch(notify({status: "info", message: "Please enter the credentials you used to create your account", position: "tc"}));
                return dispatch(replace(`/login?redirect=${redirect}`));
            }

            if (status > 299 || status < 200) {
                throw new Error(data.error);
            } else {
                dispatch(verifyCodeSuccess(data.profile_id));
            }
        } catch (error) {
            dispatch(logout());
            dispatch(replace("/"));
            dispatch(notify({title: "Error!", status: 'error', message: "Could not verify this account", position: 'tc'}));
        }
    }
}

const completeRegistration = year => {
    return async dispatch => {
        try {
            dispatch({type: COMPLETE_REGISTRATION_START});

            const response = await fetch(Config.API_URL + '/users/me/', {
                method: 'PATCH',
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Storage.get("token")}`
                }),
                body: JSON.stringify({
                    year,
                })
            })

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error(data.error);
            } else {
                dispatch(setProfile(data));
                dispatch({type: COMPLETE_REGISTRATION_SUCCESS});
            }
        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'})); 
        }
    }
}

const defaultState = Immutable.fromJS({
    user: {},
    verifiedEmail: false,
    sendingEmail: false,
    sentEmail: false,
    registerSuccess: false,
    error: null
});

const Register = (state = defaultState, action) => {
    switch (action.type) {
        case START_SEND_VERIFICATION_LINK: {
            return state.withMutations(val => {
                val.set('sendingEmail', true);
            });
        }
        case SEND_VERIFICATION_LINK_SUCCESS: {
            return state.withMutations(val => {
                val.set('sendingEmail', false);
                val.set('sentEmail', true);
                val.setIn(['user', 'email'], action.email);
                val.setIn(['user', 'profileId'], action.profileId);
            });
        }
        case SEND_VERIFICATION_LINK_FAILURE: {
            return state.withMutations(val => {
                val.set('error', action.message);
                val.set('sendingEmail', false);
                val.set('sentEmail', false);
            });
        }
        case VERIFY_CODE_SUCCESS: {
            return state.withMutations(val => {
                val.set('verifiedEmail', true);
                val.setIn(['user', 'profile_id'], action.profile_id);
            });
        }
        case COMPLETE_REGISTRATION_SUCCESS: {
            return state.withMutations(val => {
                val.set('registerSuccess', true);
            })
        }
        default: {
            return state;
        }
    }
}

export {
    Register, sendVerificationLink, confirmCode, completeRegistration
};

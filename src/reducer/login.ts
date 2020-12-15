import Immutable from 'immutable';
import formurlencoded from "form-urlencoded";
import { push, replace } from "connected-react-router";
import { notify } from 'reapop';

import Config from '../config';
import Storage from '../storage';
import { fetchProfile, removeProfileInfo } from './profile';

const START_LOGIN = 'start_login';
const LOGIN_SUCCESS = 'login_success';
const LOGIN_FAILURE = 'login_failure';

const SET_REDIRECT = 'set_redirect';

const LOGOUT = 'logout';

// action!!
const startLogin = () => {
    return {
        type: START_LOGIN
    }
}

const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
}

const loginFailure = () => {
    return {
        type: LOGIN_FAILURE
    }
}

const logout = () => {
    return (dispatch:any) => {
        dispatch(removeProfileInfo());
        dispatch({
            type: LOGOUT
        });
    }
}

const loginAndRedirect = (redirect:any) => {
    return (dispatch:any) => {
        dispatch({
            type: SET_REDIRECT,
            redirect
        });
        dispatch(push("/login"));
    }
}

const sendResetEmail = (email:string) => {
    return async (dispatch:any) => {
        try {
            const fullEmail = email + '@g.ucla.edu';

            const response = await fetch(Config.API_URL + '/password_link/', {
                method: 'POST',
                headers: new Headers({
                "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    username: fullEmail
                })
            });

            dispatch(push("/forget-password/pending"));

            // const status = await response.status;
            // const data = await response.json();
            
            // if (status > 299 || status < 200) {
            //     throw new Error(data.error);
            // } else {
            //     dispatch(push("/forget-password/pending"));
            // }
        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: 'There was an error sending the email', position: 'top-center'}));
        }
    }
}

const resetPassword = (password:string, passwordCode:string, userId:number) => {
    return async (dispatch:any) => {
        try {
            const response = await fetch(Config.API_URL + '/password/', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    userid: userId,
                    code: passwordCode,
                    password
                })
            });

            dispatch(push("/login"));

            // const status = await response.status;
            // const data = await response.json();
            
            // if (status > 299 || status < 200) {
            //     throw new Error(data.error);
            // } else {
            //     dispatch(push("/login"));
            // }
        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: 'There was an error changing the password', position: 'top-center'}));
        }
    }
}

const login = (email:string, password:string) => {
    return async (dispatch:any) => {
        try {
            dispatch(startLogin());
            email = email + "@g.ucla.edu";

            const response = await fetch(Config.API_URL + '/o/token/', {
                method: 'POST',
                headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded"
                }),
                body: formurlencoded({
                    username: email,
                    password: password,
                    grant_type: "password",
                    client_id: "web",
                    client_secret: Config.CLIENT_SECRET
                })
            });
            
            const status = await response.status;
            const data = await response.json();
            
            if (status > 299 || status < 200) {
                throw new Error("Error login");
            } else {
                Storage.set("token", data.access_token)
                
                // get their profile
                dispatch(fetchProfile());
                dispatch(loginSuccess());
            }
        } catch (error) {
            // handle errors here
            dispatch(notify({title: 'Error!', status: 'error', message: 'There was an error logging in', position: 'top-center'}));
            dispatch(loginFailure());
        }
    }
}

const defaultState = () => {
 const token = Storage.get('token');

 return Immutable.fromJS({
     authenticated: !!token,
     loading: false,
     redirect: null,
     error: null
 });
}

const Login = (state = defaultState(), action:any) => {
    switch (action.type) {
        case START_LOGIN: {
            return state.withMutations((val:any) => {
                val.set('loading', true);
            });
        }
        case LOGIN_SUCCESS: {
            return state.withMutations((val:any) => {
                val.set('authenticated', true);
                val.set('loading', false);
                val.set('error',null);
            })
        }
        case LOGIN_FAILURE: {
            return state.withMutations((val:any) => {
                val.set('authenticated',false);
                val.set('loading', false);
                val.set('error', true);
            })
        }
        case LOGOUT: {
            Storage.remove("token");
            return state.withMutations((val:any) => {
                val.set('authenticated', false);
            })
        }
        case SET_REDIRECT: {
            return state.withMutations((val:any) => {
                val.set('redirect', action.redirect);
            })
        }
        default: {
            return state;
        }
    }
}

export {
    Login, login, logout, loginAndRedirect, sendResetEmail, resetPassword
};

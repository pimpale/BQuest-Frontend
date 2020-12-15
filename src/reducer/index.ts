import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware, connectRouter, routerActions} from 'connected-react-router';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as notificationsReducer } from 'reapop';

import { Login, login, logout, loginAndRedirect, sendResetEmail, resetPassword } from './login';
import { Register, sendVerificationLink, confirmCode, completeRegistration } from './register';
import { Profile, fetchProfile, updateMentorStatus, updateUserProfile, updateMentorProfile, setProfilePic, reportMentor } from './profile';
import { SearchMentors, handleSearch } from './searchMentors'
import { Requests, getRequests, sendRequest } from './requests'
import { Messages, fetchThreads, fetchMessages, checkIfThreadExists, sendMessage, removeProfileViewing } from './messages';

export const history = createHistory();
const reactRouterMiddleware = routerMiddleware(history);

let middleware = [reactRouterMiddleware, thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger({collapsed: true})];
}

// Install redux-devtools-extension to get a nice full view of what current state is
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const rootReducer = combineReducers({
        Register,
        Login,
        Profile,
        SearchMentors,
        Requests,
        Messages,
        router: connectRouter(history),
        notifications: notificationsReducer()
    });

export type RootState = ReturnType<typeof rootReducer>


export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
        ...middleware
    ))
);

export const Actions = {
    registerActions: {
        sendVerificationLink, completeRegistration, confirmCode
    },
    loginActions: {
        login, logout, loginAndRedirect, sendResetEmail, resetPassword
    },
    profileActions: {
        fetchProfile, updateMentorStatus, updateUserProfile, updateMentorProfile, setProfilePic, reportMentor
    },
    searchMentorsActions: {
        handleSearch
    },
    requestsActions: {
        getRequests, sendRequest
    },
    messagesActions: {
        fetchThreads, fetchMessages, sendMessage, removeProfileViewing, checkIfThreadExists,
    }
}

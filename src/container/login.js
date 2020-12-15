import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {  replace} from 'connected-react-router';
import { parse } from 'qs';

import { Actions } from '../reducer';
import Login from '../components/pages/login';

class LoginContainer extends React.Component {
    componentWillMount() {
        if (this.props.loginSuccess && !this.props.error){
            this.props.redirect();
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.loginSuccess && nextProps.profileFetched && !nextProps.error){
            const parsed = parse(nextProps.location.search.substr(1));
            return this.props.redirect(parsed.redirect);
        };
    }

    render() {
        return(
            <Login
                login={this.props.login}
                loginSuccess={this.props.loginSuccess}
            />
        )
    }
}

const mapStateToProps = state => {
    const LoginState = state.Login;
    const Profile = state.Profile;

    return {
        loading: LoginState.get('loading'),
        loginSuccess: LoginState.get('authenticated'),
        profileFetched: !!Profile.getIn(['user', 'id']),
        error: LoginState.get('error')
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (email, password) => {
        	dispatch(Actions.loginActions.login(email, password));
        },
        redirect: (path) => {
            if (!path) {
                dispatch(replace("/home"));
            } else {
                dispatch(replace(path));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';

import { Actions } from '../reducer';

export default function(ComposedComponent) {

    class Authentication extends React.Component {
        componentWillReceiveProps(nextProps) {
            if (!nextProps.isLoggedIn) {
                this.props.login();
            }
            if (!nextProps.isProfileFetched) {
                this.props.fetchProfile();
            }
        }

        render() {
            if (this.props.isLoggedIn) {
                return <ComposedComponent {...this.props} />;
            } else {
                return null;
            }
        }
    }

    const mapStateToProps = state => {
        const Login = state.Login
        const Profile = state.Profile
        return {
            isLoggedIn: Login.get('authenticated'),
            isProfileFetched: !!Profile.getIn(['user', 'id'])
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            login: () => {
                dispatch(replace("/"));
            },
            fetchProfile: () => {
                dispatch(Actions.profileActions.fetchProfile());
            }
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}

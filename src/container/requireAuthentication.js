import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'connected-react-router';

import { Actions } from 'reducer';

import Loading from '../components/loading';

export default function(ComposedComponent) {

    class Authentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                fetching: false
            }
        }

        componentWillMount() {
            if (!this.props.isLoggedIn) {
                return this.props.login(this.props.path);
            }

            if (!this.props.isProfileFetched) {
                this.setState({
                    fetching: true
                })
                return this.props.fetchProfile();
            }

            if (this.props.isProfileFetched && !this.props.isProfileVerified) {
                return this.props.redirectToPending();
            }
        }

        componentWillReceiveProps(nextProps) {
            if (!nextProps.isLoggedIn) {
                return this.props.login();
            }

            if (nextProps.isProfileFetched) {
                if (!nextProps.isProfileVerified) {
                    return this.props.redirectToPending();
                }
                
                this.setState({
                    fetching: false
                });
            }
        }

        render() {
            if (this.state.fetching) {
                return <Loading />;
            } else {
                return <ComposedComponent {...this.props} />;
            }
        }
    }

    const mapStateToProps = state => {
        const Login = state.Login;
        const Profile = state.Profile;

        return {
            isLoggedIn: Login.get('authenticated'),
            isProfileFetched: !!Profile.getIn(['user', 'id']),
            isProfileVerified: Profile.getIn(['user', 'verified']),
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            login: path => {
                dispatch(Actions.loginActions.loginAndRedirect(path));
            },
            fetchProfile: () => {
                dispatch(Actions.profileActions.fetchProfile());
            },
            redirectToPending: () => {
                dispatch(Actions.loginActions.logout());
                dispatch(replace("/register/pending"));
            },
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}

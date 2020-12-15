import React from 'react';
import { connect } from 'react-redux';
import { replace, push } from 'connected-react-router';
import { bindActionCreators } from 'redux'
import { parse } from 'qs';

import { Actions } from '../reducer';
import Loader from '../components/loading';

class VerifyUserContainer extends React.Component {
    componentDidMount() {
        const query = parse(this.props.location.search.substr(1));
        this.props.confirmVerificationCode(query.code);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.verifiedEmail) {
            return this.props.finishRegistration();
        }
    }

    render() {
        return (
            <Loader />
        );
    }
}

const mapStateToProps = state => {
    const Register = state.Register;
    const Login = state.Login;
    const Profile = state.Profile;

    return {
        verifiedEmail: Register.get('verifiedEmail'),
        authenticated: Login.get('authenticated'),
        user: Profile.get('user'),
    };
}

const mapDispatchToProps = dispatch => {
    return {
        confirmVerificationCode: code => {
            dispatch(Actions.registerActions.confirmCode(code))
        },
        redirectToLogin: () => {
            dispatch(push("/login", {redirect: "/verify"}))
        },
        redirectToProfile: () => {
            dispatch(push("/profile/1"));
        },
        finishRegistration: () => {
            dispatch(replace('/completeRegistration'));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUserContainer);

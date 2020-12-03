import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { replace,push } from 'react-router-redux';

class RegisterPending extends React.Component {
    render() {
        return(
            <div className="container-pending">
                <div className="pending-text">
                    A verification link has been sent to your email,
                    please click on the link in your mailbox to continue the registration
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const RegisterState = state.Register;
    return {
        email: RegisterState.getIn(['user', 'email'], ''),
        sentEmail: RegisterState.get('sentEmail')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirectHome: () => {
            dispatch(replace('/'));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPending);

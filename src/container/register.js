import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { Actions } from '../reducer';
import Register from '../components/pages/register';

class RegisterContainer extends React.Component {
    render() {
        return(
            <Register
                sendingEmail={this.props.sendingEmail}
                sentEmail={this.props.sentEmail}
                sendVerificationLink={this.props.sendVerificationLink}
                redirectToPending={this.props.redirectToPending}
                email={this.props.email}
                error={this.props.error}
            />
        )
    }
};

const mapStateToProps = state => {
    const RegisterState = state.Register;
    return {
        sendingEmail: RegisterState.get('sendingEmail'),
        email: RegisterState.getIn(['user', 'email'], ''),
        sentEmail: RegisterState.get('sentEmail'),
        error: RegisterState.get('error')
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendVerificationLink: (email, password) => {
            dispatch(Actions.registerActions.sendVerificationLink(email, password));
        },

        // bindActionCreators(Actions.registerActions.sendVerificationLink, dispatch),
        redirectToPending: () => {
            dispatch(push('/register/pending'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);

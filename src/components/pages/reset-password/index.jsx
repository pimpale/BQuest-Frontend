import React from 'react';
import newBquest from '../../../../images/loginPage/white-bquest.svg.inline'
import newBquestLogo from '../../../../images/loginPage/white-bquest-logo.svg.inline'
import Footer from '../../../components/footer';
import Form from '../../util/ResetPasswordForm';

class ResetPassword extends React.Component {
    render() {
        return (
            <div className="container-login">
                <div className="logo">
                    <div className="logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
                    <div className="logo-text" dangerouslySetInnerHTML={{__html: newBquest}} />
                </div>
                <div className="container-password-reset">
                    <h1 className="password-reset-title">Password Reset</h1>
                    <Form action={this.props.resetPassword} buttonText="Reset"/>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ResetPassword;

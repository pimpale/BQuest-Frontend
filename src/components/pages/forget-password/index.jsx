import React from 'react';
import newBquest from 'images/loginPage/white-bquest.svg.inline'
import newBquestLogo from 'images/loginPage/white-bquest-logo.svg.inline'
import Footer from '../../../components/footer';
import Form from '../../util/ForgetPasswordForm';

class ForgetPassword extends React.Component {
    render() {
        return (
            <div className="container-login">
                <div className="logo">
                    <div className="logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
                    <div className="logo-text" dangerouslySetInnerHTML={{__html: newBquest}} />
                </div>
                <div className="container-password-reset">
                    <h1 className="password-reset-title">Password Reset</h1>
                    <p>We'll send a password reset link to your email.</p>
                    <Form action={this.props.sendResetEmail} buttonText="Send Email"/>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ForgetPassword;

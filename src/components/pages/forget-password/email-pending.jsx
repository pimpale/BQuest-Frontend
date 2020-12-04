import React from 'react';
import newBquest from 'images/loginPage/white-bquest.svg.inline'
import newBquestLogo from 'images/loginPage/white-bquest-logo.svg.inline'
import Footer from '../../../components/footer';

class ForgetPasswordPending extends React.Component {
    render() {
        return (
            <div className="container-login">
                <div className="logo">
                    <div className="logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
                    <div className="logo-text" dangerouslySetInnerHTML={{__html: newBquest}} />
                </div>
                <div className="container-pending">
                    <h1 className="loginform-title">Email Sent! Check your email :)</h1>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ForgetPasswordPending;

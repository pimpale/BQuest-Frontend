import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'components/util/LoginRegisterForm';
import newBquest from '../../../../images/loginPage/white-bquest.svg.inline'
import newBquestLogo from '../../../../images/loginPage/white-bquest-logo.svg.inline'
import Footer from '../../footer';

import Loader from '../../loading';

class Register extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (!this.props.sentEmail && nextProps.sentEmail) {
            this.props.redirectToPending();
        }
    }

    render() {
        return (
            <div className="container-register">
                <div className="logo">
                    <div className="logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
                    <div className="logo-text" dangerouslySetInnerHTML={{__html: newBquest}} />
                </div>
                <section className="register-splash">
                    <div className="register-text">
                        <h1>Connect with students on all your major-related questions.</h1>
                    </div>
                </section>  
                <div className="register-form">
                    {this.props.sendingEmail ? <Loader /> :
                    <div className="container-emailform">
                        <h1>Create an account</h1>
                        <Form action={this.props.sendVerificationLink} buttonText="Send Verification Link" />
                    </div>
                    }
                </div>
                <Footer />
            </div>
        )
    }
};

export default Register;

import React from 'react';
import Form from 'components/util/LoginRegisterForm';
import newBquest from 'images/loginPage/white-bquest.svg.inline'
import newBquestLogo from 'images/loginPage/white-bquest-logo.svg.inline'
import Footer from '../../../components/footer';

class Login extends React.Component {

    render() {
        return(
            <div className="container-login">
                <div className="logo">
                    <div className="logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
                    <div className="logo-text" dangerouslySetInnerHTML={{__html: newBquest}} />
                </div>
                <div className="container-loginform">
                    <h1 className="loginform-title">Login</h1>
                    <Form action={this.props.login} buttonText="Log In"/>
                </div>
                <Footer />
            </div>
        )
    }
};


export default Login;

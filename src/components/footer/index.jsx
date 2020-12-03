import React from "react";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import BquestLogo from '../../../images/loginPage/white-bquest-logo.svg.inline';

class Footer extends React.Component {
    
    navigate = location => {
        if (location != this.props.location) {
            this.props.goTo(location);
        }
    }
    
    render() {
        return (
            <div className="footer-container">
                <div className="link-logo">
                    <div className="inner-logo" dangerouslySetInnerHTML={{__html: BquestLogo}} />
                    {this.props.isLoggedIn && <p onClick={() => this.navigate("home")}>BQUEST</p>}
                    {!this.props.isLoggedIn && <p onClick={() => this.navigate("")}>BQUEST</p>}
                </div>
                <div className="between-link">
                    <p>/</p>
                </div>
                <div className="link-privacy">
                    <p onClick={() => this.navigate("privacy")}>Privacy Policy</p>
                </div>
                <div className="between-link">
                    <p>/</p>
                </div>
                <div className="link-about">
                    <p onClick={() => this.navigate("about")}>About Us</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const Login = state.Login;

    return {
        isLoggedIn: Login.get('authenticated'),
        location: state.router.location.pathname.substr(1)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goTo: (location) => {
            dispatch(push("/" + location));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

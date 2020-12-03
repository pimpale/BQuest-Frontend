import React from 'react';
import { Link } from 'react-router-dom';

import newBquestLogo from '../../../../../images/loginPage/teal-bquest-logo.svg.inline';
import newBquest from '../../../../../images/loginPage/teal-bquest.svg.inline';

export default (props) => {
    return (
        <section className="top-bar">
            <div className="logo">
                <div className="logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
                <div className="logo-text" dangerouslySetInnerHTML={{__html: newBquest}} />
            </div>
            <div className="nav-buttons">
                <Link id="login" to="/login">Login</Link>
                <Link id="signup" to="/register">Sign Up</Link>
                {/*<div id="login" onClick={() => location.href="/login"}>Login</div>*/}
                {/*<div id="signup" onClick={() => location.href="/register"}>Sign Up</div>*/}
            </div>
        </section>
    );
};

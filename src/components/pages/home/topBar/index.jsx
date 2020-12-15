import React from 'react';
import { Link } from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import newBquestLogo from 'images/loginPage/teal-bquest-logo.svg.inline';
import newBquest from 'images/loginPage/teal-bquest.svg.inline';

export default (props) => {
    return (
        <section className="top-bar">
            <div className="logo">
                <ReactSVG className="logo-logo" src={newBquestLogo} />
                <ReactSVG className="logo-text" src={newBquest} />
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

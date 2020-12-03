import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import BquestLogo from '../../../images/loginPage/white-bquest-logo.svg.inline';

class NavBar extends React.Component {

    navigate = location => {
        if (location != this.props.location) {
            this.props.goTo(location);
        }
    }

    render() {
        const { location } = this.props
        return(
            <div>
                <div className="navbar-container">
                    <div className="logo">
                        <div className="logo-logo" dangerouslySetInnerHTML={{__html: BquestLogo}} />
                    </div>
                    <div className="buttons">
                        <div className="navigation-item">
                            <p onClick={() => this.navigate("home")} className={classNames({selected: location.startsWith("home")})}>Home</p>
                        </div>
                        <div className="navigation-item">
                            <p onClick={() => this.navigate("search")} className={classNames({selected: location.startsWith("search")})}>Ambassadors</p>
                        </div>
                        <div className="navigation-item">
                            <p onClick={() => this.navigate("messages")} className={classNames({selected: location.startsWith("messages")})}>Messages</p>
                        </div>
                        <div className="navigation-item">
                            <p onClick={() => this.navigate("profile/1")} className={classNames({selected: location.startsWith("profile")})}>Settings</p>
                        </div>
                        <div className="navigation-item">
                            <p onClick={() => this.navigate("logout")} className={classNames({selected: location.startsWith("logout")})}>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="navbar-spaceholder"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        location: state.router.location.pathname.substr(1)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        goTo: (location) => {
            dispatch(push("/" + location));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);


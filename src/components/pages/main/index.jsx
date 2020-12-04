import React from 'react';
import { withRouter } from "react-router-dom";

import NavBar from '../../../components/navbar';
import Footer from '../../../components/footer';
import newBquestLogo from 'images/loginPage/white-bquest-logo.svg.inline'

class MainPage extends React.Component {
    render() {
        return (
            <div className="main-container">
                <NavBar />
                <div className="main-window">
                    <div className="main-content">
                        <div className="main-logo">
                            <div className="main-logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
                            <div className="main-logo-text">BQUEST</div>
                        </div>
                        <div className="main-find">
                            <p onClick={() => this.props.history.push("/search")}>Find an ambassador.</p>
                        </div>
                        <div className="main-onboarding">
                            <p onClick={() => this.props.history.push("/onboarding")}>Need help using BQuest? <u>Click here</u>!</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(MainPage);

import React from 'react'
import Footer from '../../footer';
import NavBar from '../../navbar';
import TopBar from '../home/topBar';
import { connect } from 'react-redux';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="about-container">
                <div className="bar-container">
                    {this.props.isLoggedIn ? <NavBar /> : <TopBar />}
                    {!this.props.isLoggedIn && <div className="topbar-spaceholder" />}
                </div>
                <div className="about-title">
                    <p>ABOUT US</p>
                </div>
                <div className="about-content">
                    <p>
                        BQuest is a peer-to-peer platform that helps UCLA students find the right major.
                    </p>
                    <br />
                    <p>
                        On BQuest, undecided or undeclared UCLA students can find ambassadors from the majors 
                        they are interested in. Ambassadors share their personal experience and give students 
                        an insight into their major.
                    </p>
                    <br />
                    <p>
                        This information can help students make good decisions! :)
                    </p>
                    <br />
                    <p>
                        This project is hosted by UCLA DevX. To learn more about the organization, 
                        visit the <a href="http://ucladevx.com/#/">DevX homepage</a>.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const Login = state.Login;

    return {
        isLoggedIn: Login.get('authenticated'),
    }
}

export default connect(mapStateToProps)(AboutUs);

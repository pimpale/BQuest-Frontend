import React from 'react';
import Footer from '../../footer';
import NavBar from '../../navbar';
import TopBar from '../home/topBar';
import { connect } from 'react-redux';

class PrivacyPolicy extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="policy-container">
                <div className="bar-container">
                    {this.props.isLoggedIn ? <NavBar /> : <TopBar />}
                    {!this.props.isLoggedIn && <div className="topbar-spaceholder" />}
                </div>
                <div className="policy-title">
                    <p>PRIVACY  POLICY</p>
                </div>
                <div className="policy-content">
                    <p>This privacy notice discloses the privacy practices for BQuest and is effective 11/04/18. 
                        It applies solely to information collected by our website, which includes:
                    </p>
                    <br />
                    <ul>
                        <li className="policy-list-element">Name</li>
                        <li className="policy-list-element">Email</li>
                        <li className="policy-list-element">Personal information regarding academics</li>
                    </ul>
                    <p>We only have access to information that you voluntarily give us through the sign-up process. 
                        We will only use this information to assist students in determining their academic path while at UCLA. 
                        This information can be edited by the user in the <b>General Settings and FAQs section</b>.
                    </p>
                    <br />
                    <p>
                    Unless you ask us not to, we may contact you via email in the future to tell you about new features/services or 
                    changes to this policy.
                    </p>
                    <br />
                    <p>The only instance where data is shared with third parties is with Google Analytics through the use of cookies. 
                    This is to improve and gain more insight to site performance. To opt out of this, go to your browser settings 
                    and its Privacy and Security section. Alternatively, follow <a href="https://tools.google.com/dlpage/gaoptout">this link</a>. 
                    Instructions on this page will guide you through the process.
                    </p>
                    <br />
                    <p>If you feel we are not abiding by this privacy policy, you should contact us immediately via email at 
                        bquest.ucla@gmail.com or on Facebook at <a href="https://www.facebook.com/ucladevx/">UCLA DevX</a>.
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

export default connect(mapStateToProps)(PrivacyPolicy);

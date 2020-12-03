import React from 'react';
import { toJS } from 'immutable';

import NavBar from '../../navbar';
import Footer from '../../footer';

import GeneralProfile from './generalProfile';
import AmbassadorProfile from './ambassadorProfile';
import ProfileSelect from './profileSelect/profileSelect';

class MultipleProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.profile.get('user').toJS(),
            mentor: props.profile.get('mentor').toJS(),
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            user: props.profile.get('user').toJS(),
            mentor: props.profile.get('mentor').toJS()
        });
    }

    _handleChangeMentorProfile = (key, value) => {
        let body = {};
        body[key] = value;
        this.props.updateMentorProfile(body);
    }

    _handleChangeUserProfile = (key, value) => {
        let body = {};
        body[key] = value;
        this.props.updateUserProfile(body);
    }

    _handleChangeMultipleUserProfile = (...args) => {
        let body = {};
        for (let arg of args) {
            body[arg[0]] = arg[1];
        }
        this.props.updateUserProfile(body);
    }

    _choosePage = (whichPage) => {
        if (whichPage.toString() === '1') {
            return (
                <GeneralProfile
                    user={this.state.user}
                    profile={this.props.profile}
                    setProfilePic={this.props.setProfilePic}
                    updateMultipleProfile={this._handleChangeMultipleUserProfile}
                    updateProfile={this._handleChangeUserProfile}
                />
            );
        } else {
            return (
                <AmbassadorProfile
                    user={this.state.user}
                    mentor={this.state.mentor}
                    updateMentorStatus={this.props.updateMentorStatus}
                    updateProfile={this._handleChangeMentorProfile}
                />
            );
        }

    }

    render() {
        const {
            whichPage,
        } = this.props;

        if (!this.state.user.id) {
            return null;
        } else {
            return (
                <div className="container-profile">
                    <NavBar />
                    <div className="multiple-profile-wrapper">
                        <ProfileSelect
                            whichPage={whichPage}
                            navigateTo={this.props.navigateTo}
                        />
                        {this._choosePage(whichPage)}
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}

export default MultipleProfile;

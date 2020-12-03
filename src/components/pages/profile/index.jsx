import React from 'react';
import { toJS } from 'immutable';

import ProfileTop from './profileTop';
import General from './general';
import Mentorship from './mentorship';

import NavBar from '../../navbar';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.profile.get('user').toJS(),
            mentor: props.profile.get('mentor').toJS(),

            newUser: props.profile.get('user').toJS(),
            newMentor: props.profile.get('mentor').toJS()
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            newUser: props.profile.get('user').toJS(),
            newMentor: props.profile.get('mentor').toJS()
        });
    }

    _handleChangeStatus = (_, value) => {
        this.props.updateMentorStatus(value);
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

    render() {

        if (!this.state.newUser.id) {
            return null;
        } else {
            const name = `${this.state.newUser.first_name} ${this.state.newUser.last_name}`;
            return (
                <div className="container-profile">
                    <NavBar />
                    <div className="profile-wrapper">
                        <ProfileTop
                            editable={true}
                            name={name}
                            profile={this.props.profile}
                            setProfilePic = {this.props.setProfilePic}
                        />
                        <div className="profile-detail-container">
                            <General
                                user={this.state.newUser}
                                mentor={this.state.newMentor}
                                updateProfile={this._handleChangeUserProfile}
                                logout={this.props.logout}
                            />
                            <Mentorship
                                user={this.state.newUser}
                                mentor={this.state.newMentor}
                                updateMentorStatus={this._handleChangeStatus}
                                updateProfile={this._handleChangeMentorProfile}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Profile;

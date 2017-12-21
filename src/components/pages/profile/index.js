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

    _handleChangeProfile = (key, value) => {

    }

    render() {
        if (!this.state.user.id) {
            return null;
        } else {
            const name = `${this.state.user.first_name} ${this.state.user.last_name}`;
            return (
                <div className="container-profile">
                    <div className="profile-wrapper">
                        <ProfileTop 
                            name={name}
                        /> 
                        <div className="profile-detail-container">
                            <General 
                                user={this.state.user}
                                mentor={this.state.mentor}
                            />
                            <Mentorship 
                                user={this.state.newUser}
                                mentor={this.state.newMentor}
                                updateMentorStatus={this._handleChangeStatus}
                                handleChangeProfile={this._handleChangeProfile}
                            />
                        </div>
                    </div>
                    <NavBar />
                </div>
            );
        }
    }
}

export default Profile;

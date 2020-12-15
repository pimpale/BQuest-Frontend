import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { Actions } from '../reducer';
import MultipleProfile from '../components/pages/profile/multipleProfile';

class MultipleProfileContainer extends React.Component {
    componentDidUpdate() {
        if (!this.props.profile.getIn(['user', 'id'])) {
            // We need to fetch profile data
            this.props.fetchProfileData()
        }
    }

    render() {
        return (
            <MultipleProfile
                profile={this.props.profile}
                whichPage={this.props.match.params.page}
                navigateTo={this.props.navigateTo}
                logout={this.props.logout}
                updateMentorStatus={this.props.updateMentorStatus}
                updateUserProfile={this.props.updateUserProfile}
                updateMentorProfile={this.props.updateMentorProfile}
                setProfilePic={this.props.setProfilePic}
            />
        );
    }
}

const mapStateToProps = state => {
    const Profile = state.Profile;
    return {
        profile: Profile,

    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchProfileData: () => {
            dispatch(Actions.profileActions.fetchProfile());
        },
        updateMentorStatus: (status) => {
            dispatch(Actions.profileActions.updateMentorStatus(status));
        },
        updateUserProfile: body => {
            dispatch(Actions.profileActions.updateUserProfile(body));
        },
        updateMentorProfile: body => {
            dispatch(Actions.profileActions.updateMentorProfile(body));
        },
        setProfilePic: pic => {
            dispatch(Actions.profileActions.setProfilePic(pic));
        },
        logout: () => {
            dispatch(Actions.loginActions.logout());
            dispatch(replace("/"));
        },
        navigateTo: (path) => {
            dispatch(replace(path));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleProfileContainer);

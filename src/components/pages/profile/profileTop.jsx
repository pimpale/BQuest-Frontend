import React from 'react';

import Search from '../../searchBar';
import ProfilePicture from 'components/profilePicture';

class ProfileTop extends React.Component {
    _profilePic = () => {
        return (
            <ProfilePicture
                picture={this.props.profile.getIn(['user', 'picture'])}
                editable={this.props.editable}
                setProfilePic={this.props.setProfilePic}
            />
        );
    }

    render() {
        return(
            <div className="top">
                <div className="user-info">
                    {this._profilePic()}
                    <h1>{this.props.name}</h1>
                </div>
            </div>
        );
    }
}

ProfileTop.defaultProps = {
    editable: false
}

export default ProfileTop;
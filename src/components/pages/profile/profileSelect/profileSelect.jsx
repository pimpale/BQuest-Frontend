import React from 'react';

class ProfileSelect extends React.Component {
    render() {
        const isGeneralSettings = this.props.whichPage === '1';
        const isAmbassadorProfile = this.props.whichPage === '2';

        return (
            <div className="profile-select">
                <div className="entry first-entry" style={{fontWeight: isGeneralSettings ? 'bolder' : 'normal'}} onClick={() => this.props.navigateTo('/profile/1')}>General Settings & FAQ</div>
                <div className="entry" style={{fontWeight: isAmbassadorProfile ? 'bolder' : 'normal'}} onClick={() => this.props.navigateTo('/profile/2')}>Ambassador Profile</div>
            </div>
        )
    }
}

export default ProfileSelect;

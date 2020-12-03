import React from 'react';

import ProfilePicture from './profilePicture';
import ProfilePictureEditable from './profilePictureEditable';

export default (props) => {
    return (props.editable ?
        <ProfilePictureEditable 
            picture={props.picture} 
            setProfilePic={props.setProfilePic}
        /> : 
        <ProfilePicture 
            picture={props.picture} 
            size={props.size}
        />
    );
}
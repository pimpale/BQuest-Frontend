import React from 'react';
import ReactFileReader from 'react-file-reader';

class ProfilePicEditable extends React.Component {

	_handleFiles = files => {
  		this.props.setProfilePic(files[0]) 
	}	

	_renderPic = () => {
 		const url = this.props.picture;
        return (
            <div className="profile-pic editable" style={{backgroundImage: 'url('+url+')'}}></div>
        );
    }

    render() {

        return(
        	<ReactFileReader fileTypes={[".jpg",".png",".svg",".jif"]} multipleFiles={false} handleFiles={this._handleFiles}>
	            {this._renderPic()}
	        </ReactFileReader>
        )
    }
}

export default ProfilePicEditable;

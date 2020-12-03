import React from 'react';


class ProfilePic extends React.Component {

    _renderPic = () => {
        const url = this.props.picture;
        let classes = ['profile-pic'];
        classes.push(this.props.size);

        return (
            <div className={classes.join(' ')} style={{backgroundImage: 'url('+url+')'}}></div>
        );
    }

    render() {
        return this._renderPic();
    }
}

export default ProfilePic;

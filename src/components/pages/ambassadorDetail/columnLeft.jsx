import React from 'react';

import ProfilePicture from 'components/profilePicture';
import Button from 'components/util/Button';
import { getName } from 'common';

class ColumnLeft extends React.Component {
    renderMajors = () => {
        const majors = this.props.mentor.get('major');
        return majors.reduce((str, major, idx) => {
            return idx === majors.size - 1 ? str += `${major.get('name')}` : str += `${major.get('name')}, `;
        }, '');
    }

    render() {
        return (
            <div className="column-left">
                <ProfilePicture
                    picture={this.props.profile.get('picture')}
                    size="large"
                />
                <div className="info">
                    <h1>{getName(this.props.profile)}</h1>
                    <p>{this.renderMajors()}</p>
                </div>
                <Button color="orange" onClick={this.props.onClick}>Send a Message</Button>
                <br />
                <Button color="red" onClick={this.props.onReport}>Report Ambassador</Button>
            </div>
        );
    }
}

export default ColumnLeft;
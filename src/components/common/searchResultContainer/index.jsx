import React from 'react';
import Shave from 'react-shave';
import { Link } from 'react-router-dom';

import ProfilePicture from 'components/profilePicture';
import { getName } from 'common';

class SearchResultContainer extends React.Component {
    state = {
        maxHeight: 70
    }

    commponentDidMount() {
        if (window.innerWidth <= 320) {
            this.resetMaxHeight(70);
        }
    }

    resetMaxHeight = (maxHeight) => {
        this.setState((prevState, props) => {
            return {maxHeight};
        })
    }

    renderMajor = () => {
        // an ambassador can have multiple majors
        const majors = this.props.mentorProfile.getIn(['mentor', 'major']);
        return majors.reduce((str, major, idx) => {
            if (idx === majors.size - 1) {
                return str += `${major.get('name')}`;
            } else {
                return str += `${major.get('name')}, `;
            }
        }, '');
    }

    render() {
        const {
            maxHeight
        } = this.state;

        const {
            mentorProfile
        } = this.props;

        const name = getName(mentorProfile.get('user'));
        let classes = ["mentor-heading"];
        if (this.props.size === "small") {
            classes.push(this.props.size);
        }
        
        return (
            <Link to={`/ambassadors/${this.props.mentorProfile.getIn(['mentor','id'])}`}>
                <div className="search-result-container">
                    <div className="profile-pic-container">
                        <ProfilePicture
                            size={this.props.size}
                            picture={mentorProfile.getIn(['user', 'picture'])}
                        />
                    </div>                
                    <div className="mentor-details">
                        <div className={classes.join(' ')}>
                            <p>{name}</p>
                            <span>{mentorProfile.getIn(['user', 'year'])} year</span>
                        </div>
                        <div className="mentor-major">{this.renderMajor()}</div>
                        {this.props.size !== "small" && 
                        <div className="mentor-bio">
                            <Shave maxHeight={maxHeight}>{this.props.mentorProfile.getIn(['mentor','bio'])}</Shave>
                        </div>}
                    </div>
                </div>
            </Link>   
        );
    }
}

export default SearchResultContainer;
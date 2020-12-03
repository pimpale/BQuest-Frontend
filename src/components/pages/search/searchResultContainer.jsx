import React from 'react';
import Shave from 'react-shave';
import { Link } from 'react-router-dom';

import ProfilePicture from 'components/profilePicture';

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

    render() {
        const {
            maxHeight
        } = this.state;

        const {
            mentorProfile
        } = this.props;

        const name = `${mentorProfile.getIn(['user', 'first_name'])} ${mentorProfile.getIn(['user', 'last_name'])}`
        
        return (
            <Link to={`/ambassadors/${this.props.mentorProfile.getIn(['mentor','id'])}`}>
                <div className="search-result-container">
                    <div className="profile-pic-container">
                        <ProfilePicture
                            picture={mentorProfile.getIn(['user', 'picture'])}
                        />
                    </div>                
                    <div className="mentor-details">
                        <div className="mentor-heading">
                            <p>{name}</p>
                            <span>{mentorProfile.getIn(['user', 'year'])} year</span>
                        </div>
                        <div className="mentor-major">{this.props.mentorProfile.getIn(['mentor', 'major', 'name'])}</div>
                        <div className="mentor-bio">
                            <Shave maxHeight={maxHeight}>{this.props.mentorProfile.getIn(['mentor','bio'])}</Shave>
                        </div>
                    </div>
                </div>
            </Link>   
        );
    }
}

export default SearchResultContainer;
import React from 'react';
import Header from './header';

import SearchResultContainer from 'components/common/searchResultContainer';

class AmbassadorDetailSidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <Header 
                    count={this.props.count}
                    searchedMajor={this.props.searchedMajor}
                />
                {this.props.mentors.map(mentorProfile => 
                    <SearchResultContainer 
                        key={mentorProfile.getIn(['mentor', 'id'])} 
                        mentorProfile={mentorProfile} 
                        size="small"
                    />
                )}
            </div>
        );
    }
}

export default AmbassadorDetailSidebar;

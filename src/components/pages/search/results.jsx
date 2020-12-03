import React from 'react';
import SearchResultContainer from 'components/common/searchResultContainer';
import SearchBar from './searchBar'

import Divider from 'components/util/divider';
import { pluralize } from 'common';

class Results extends React.Component {
    content = () => {
        if (this.props.count !== 0) {
            return (
                <div className="results-container">
                    {this.props.mentors.map(mentorProfile => 
                        <SearchResultContainer 
                            key={mentorProfile.getIn(['mentor', 'id'])} 
                            mentorProfile={mentorProfile} 
                        />
                    )}
                </div>
            );
        } else {
            return (
                <div className="instructions">
                
                    <h1>We don't have ambassadors in ${} at the moment. Check back soon!</h1>
                
                </div>
            );
        }
    }

    render() {
        if (!this.props._internal.get('searched')) {
            return(
                <div className="instructions">
                    <h1>&#x1F446; Try typing in the search bar above to find ambassadors in majors you're interested in</h1>
                </div>
            ); 
        }

        return (
            <div className="search-results-container">
                <div className="results-wrapper">
                    <div className="header">
                        <p className="results-count">{this.props.count} {pluralize(this.props.count, "result")}</p>
                    </div>
                    {this.content()}
                </div>
            </div>
        );
    }
}

export default Results;
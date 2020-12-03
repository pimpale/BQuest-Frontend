import React from 'react';

import NavBar from '../../navbar';
import RequestsResultContainer from './requestsResultContainer';

class Requests extends React.Component {
    render() {
        let key = 0;
		let no_requests = <p>You have no requests at the moment</p>;

        return(
            <div className="requests-container">
                <NavBar />
	            <div className="requests-results-container">
                    <h1>Request History</h1>
					{ !this.props.requests.size
						? no_requests
						: this.props.requests.map(request => {
	                        key += 1;
	                        return <RequestsResultContainer
	                            profile={this.props.profile}
	                            request={request}
	                            key={key}
	                        />
	                    })
					}
	            </div>
	        </div>
        );
    }
}

export default Requests;

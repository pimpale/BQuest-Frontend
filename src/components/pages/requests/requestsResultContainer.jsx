import React from 'react';
import moment from 'moment';
import Shave from 'react-shave';

import Divider from '../../util/divider';

class RequestsResultContainer extends React.Component {
    constructor(props) {
        super(props);

        const ownId = props.profile.get('id');
        const mentorId = props.request.getIn(['mentor', 'profile', 'id']);
        const menteeId = props.request.getIn(['mentee', 'id']);

        let sentRequest;
        let valid = true;
        if (ownId === mentorId) {
            sentRequest = false;
        } else if (ownId === menteeId) {
            sentRequest = true;
        } else {
            // invalid request!! this request is not associated with the current user. 
            valid = false;
        }

        this.state = {
            valid,
            sentRequest,
            date: moment(new Date(props.request.get('date_created'))).format("MMMM Do YYYY"),
            mentorName: props.request.getIn(['mentor', 'profile', 'first_name']),
            menteeName: props.request.getIn(['mentee', 'first_name'])
        }
    }

    renderHeading = () => {
        const date = <h2 id="date">{this.state.date}</h2>;

        if (this.state.sentRequest) {
            return (
                <div className="heading">
                    <h1><span>You</span> sent a request to <span>{this.state.mentorName}</span></h1>
                    {date}
                </div>
            ); 
        } else {
            return (
                <div className="heading">
                    <h1><span>{this.state.menteeName}</span> sent <span>you</span> a request</h1>
                    {date}
                </div>
            ); 
        }
    }

    renderBody = () => {
        return (
            <div className="body">
                <Shave maxHeight={70}>{this.props.request.get('email_body')}</Shave>
            </div>
        );
    }

    render() {
        if (!this.state.valid) {
            return null;
        }

        return (
            <div className="request-container">
                {this.renderHeading()}
                <Divider orientation="horizontal" />
                {this.renderBody()}
            </div>
        );
    }
}

export default RequestsResultContainer;

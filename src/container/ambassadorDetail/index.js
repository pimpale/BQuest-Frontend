import React from 'react';
import { connect } from 'react-redux';
import { replace, goBack, push } from 'connected-react-router';

import { Actions } from 'reducer';
import { getAmbassadorState } from 'selectors/ambassadors';

import AmbassadorDetail from 'components/pages/ambassadorDetail';
import NavBar from 'components/navbar';
import Sidebar from './sidebar';

class AmbassadorDetailContainer extends React.Component {
    componentWillMount() {
        if (!this.props.ambassador) {
            this.props.redirectHome();
        }
    }

    render() {
        // TODO: figure out how to fix this hack
        if (this.props.ambassador) {
            return (
                <div className="ambassador-detail-container">
                    <NavBar />
                    <div className="ambassador-detail-wrapper">
                        <Sidebar />
                        <AmbassadorDetail 
                            ambassador={this.props.ambassador}
                            goBack={this.props.goBack}
                            sendMessage={this.props.sendMessage}
                            reportMentor={this.props.reportMentor}
                        />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ambassador: getAmbassadorState(state, ownProps),
    };
}

const mapDispatchToProps = dispatch => {
    return {
        goBack: () => {
            dispatch(replace("/search"));
        },
        sendMessage: (messageText, profileId) => {
            dispatch(Actions.messagesActions.sendMessage(messageText, profileId));
        },
        redirectHome: () => {
            dispatch(replace("/search"));
        },
        reportMentor: (reported_id, reason) => {
            dispatch(Actions.profileActions.reportMentor(reported_id, reason));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbassadorDetailContainer);

import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { Actions } from 'reducer';
import Sidebar from 'components/pages/messages/sidebar';

class SidebarContainer extends React.Component {
    componentDidMount() {
        if (!this.props.threads.size) {
            this.props.fetchThreads()
        } 
    }
    
    render() {
        return (
            <Sidebar 
                profile={this.props.profile}
                threads={this.props.threads}
                count={this.props.count}
                changeProfileViewing={this.props.changeProfileViewing}
                profileViewing={this.props.profileViewing}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.Profile,
        threads: state.Messages.get('threads'),
        count: state.Messages.get('count'),
        profileViewing: state.Messages.get('profileViewing'),
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThreads: () => {
            dispatch(Actions.messagesActions.fetchThreads());
        },
        changeProfileViewing: id => {
            dispatch(replace(`/messages/${id}`));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);


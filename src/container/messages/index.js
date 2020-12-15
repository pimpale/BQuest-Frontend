import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { Actions } from 'reducer';
import Config from 'config';

import Input from './input';
import Sidebar from './sidebar';
import ThreadView from './threadView';
import NavBar from 'components/navbar';

class MessagesContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showThread: false
        }

        const profileViewing = props.match.params.profileId;
        if (profileViewing) {
            this.props.checkIfThreadExists(profileViewing);
        }

        const socketId = this.props.profile.getIn(['user', 'id']);
        if (!socketId) {
            return;
        }
        const threadViewingId = this.props.match.params.profileId;

        try {
            this.socket = new WebSocket(`${Config.WS_URL}/${socketId}`);
            this.socket.onmessage = event => {
                const message = JSON.parse(event.data);
                if (message.TYPE == 'MESSAGE_UPDATE') {
                    this.props.fetchThreads();
                    if (threadViewingId) {
                        this.props.fetchMessages(threadViewingId);
                    }
                }
            }
        } catch (err) {
            console.info("Unable to obtain a websocket connection.");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messages.getIn(['profileViewing', 'profileID'])) {
            this.setState({
                showThread: true
            });
        }

        if (nextProps.messages.get('error') === "NO_THREAD") {
            return this.props.redirectToMessages();
        }
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.props.removeProfileViewing();
    }

    _render = () =>{
        if (!this.state.showThread) {
            return null;
        }

        return (
            <div className="threadview-input-container">
                <ThreadView
                    profileId={this.props.match.params.profileId}
                />
                <Input />
            </div>
        );
    }

    render() {
        return (
            <div className="messages-container">
                <NavBar />
                <div className="messages-wrapper">
                    <Sidebar />
                    {this._render()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.Profile,
        messages: state.Messages,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThreads: () => {
            dispatch(Actions.messagesActions.fetchThreads());
        },
        fetchMessages: id => {
            dispatch(Actions.messagesActions.fetchMessages(id));
        },
        removeProfileViewing: () => {
            dispatch(Actions.messagesActions.removeProfileViewing());
        },
        checkIfThreadExists: id => {
            dispatch(Actions.messagesActions.checkIfThreadExists(id));
        },
        redirectToMessages: () => {
            dispatch(replace("/messages"));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);


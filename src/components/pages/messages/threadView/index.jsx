import React from 'react';
import Message from './message'
import Loading from 'components/loading';

class ThreadView extends React.Component {
    componentDidMount() {
        // scroll the messages div to the bottom
        const view = document.getElementById('messages');
        view.scrollTop = view.scrollHeight;
    }

    componentDidUpdate() {
        // scroll the messages div to the bottom
        const view = document.getElementById('messages');
        view.scrollTop = view.scrollHeight;
    }
    
    _render() {
        const messages = this.props.messages;
        if (this.props.loading) {
            return <Loading />
        } else {
            return (
				<div className="all-messages">
					{messages ? messages.reverse().map(message => {
						return (
							<Message
								key={message.get('id')}
								messageText={message.get('body')}
								messageSender={message.get('sender')}
								currentUser={this.props.currentUser}
							/>
						);
					}) : null}
				</div>
            );
        }
    }

    render() {
        return (
            <div id="messages" className="thread-view">
                {this._render()}
            </div>
        );
    }
}

export default ThreadView;

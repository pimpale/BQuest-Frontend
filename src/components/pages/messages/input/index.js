import React from 'react';

import paperplane from '../../../../../images/messages/paperplane.svg';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('You have sent a message: ' + this.state.value);
		event.preventDefault();
	}

    render() {
        return (
        	<form className="input" onSubmit={this.handleSubmit}>
    			<input className="inputText" type="text" value={this.state.value} onChange={this.handleChange} />
        		<input type="image" src={paperplane} className="send" alt="Submit Form" />
        	</form>
        );
    }
}

export default Input;
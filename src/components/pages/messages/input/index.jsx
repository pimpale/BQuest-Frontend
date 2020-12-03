import React from 'react';

class Input extends React.Component {
	state = {value: ''};

	handleChange = (event) => {
		this.setState({value: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.state.value != '') {
			this.props.sendMessage(this.state.value);
			this.setState({value: ''});
		} 
	}

    render() {
        return (
			<form className="input" onSubmit={this.handleSubmit}>
				<input className="inputText" type="text" value={this.state.value} placeholder="Enter your message here..." onChange={this.handleChange} />
				<div className="send">
					<div className={this.state.value ? "message" : "noMessage"} onClick={this.handleSubmit}>
						<span>SEND</span>
					</div>
				</div>
			</form>
        );
    }
}

export default Input;

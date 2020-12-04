import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';

import { Collapse, Button, CardBody, Card, Alert } from 'react-bootstrap';

const styles = {
  toggle: {
    width: 44,
	height: 23,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
  update_button: {
	margin: "0px"
  },
  textfield: {
	  height: 31,
	  textAlign: "center",
  },
  textfield_input: {
	  textAlign: "center",
	  height: "50%"
  },
  logoutButton: {
    backgroundColor: "#007bff"
},
  info_card: {
	  paddingLeft:"4%",
	  fontSize: "90%",
	  color: '#5d636f',
	  lineHeight:"1.5em"
  }
};

var isActive = true
let changed = false

class General extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
			oldEmail: this.props.user.email,
			collapse: false
    	};
		this.toggle_info = this.toggle.bind(this);
  	};

	onBlur(event) {
		const newEmail = event.target.value
		if (newEmail!=this.state.oldEmail && !changed) {
			this.setState({oldEmail: newEmail})
			this.props.updateProfile("email", newEmail);
			changed = true
		}
	};

	onKeyUp(event) {
		if (event.key === 'Enter' && !changed) {
			const newEmail = event.target.value
			if (newEmail!=this.state.oldEmail) {
				this.setState({oldEmail: newEmail})
				this.props.updateProfile("email", newEmail);
				changed = true
			}
		}
	};

	toggle = () => {
    	this.setState({ collapse: !this.state.collapse });
  	};

    render() {
        const notifications = this.props.notifications || 'ON';
		changed = false
        return(
			<MuiThemeProvider>
            	<div className="general">
                	<div className="heading">
						<div className="icon-and-title">
                    		<i className="fa fa-cog fa-2x" aria-hidden="true"></i>
                    		<h1>General</h1>
						</div>
						<RaisedButton onClick={this.props.logout} label="Logout" />
                	</div>
                	<div className="body">
                    	{/*<div className="notifications">
                        	<h2>Notifications:</h2>
							{ notifications=='OFF'
								? <Toggle label="" style={styles.toggle} />
								: <Toggle label="" defaultToggled={true} style={styles.toggle} />
							}
                    	</div>*/}
                    	<div className="preferred-email">
                        	<h2>Preferred Email:</h2>
							<TextField id="email-field" defaultValue={this.props.user.email} style={styles.textfield} inputStyle = {styles.textfield_input} onBlur={this.onBlur.bind(this)} onKeyUp={this.onKeyUp.bind(this)}/>
                    	</div>

						<div className="info">
							<Button color="primary" onClick={this.toggle_info} style={{ marginBottom: '1rem' }}>Help</Button>
							<Collapse isOpen={this.state.collapse}>
							<Alert color="secondary">
								<p>How to use BQuest: </p>
								<ul style={styles.info_card}>
									<li>Make sure you update your preferred email, if you don’t use your UCLA email </li>
									<li>If you signed up to be an ambassador, activate and fill out your profile to the right </li>
									<li>If you’re looking for an ambassador, click search up top, and send out a request to meet with an ambassador on campus. Please remember ambassadors are just students who wants to help you. You should buy them a cup of coffee as a thank you for their time. </li>
									<li>If you want to see the requests you have sent/received, click requests up top. These will also be send to your email </li>
								</ul>
      						</Alert>
        					</Collapse>
						</div>
                	</div>
            	</div>
			</MuiThemeProvider>
        );
    }
}

export default General;

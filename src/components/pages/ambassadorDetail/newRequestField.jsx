import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Button } from 'react-bootstrap';

const styles = {
    textareaStyle: {
        "backgroundColor": "#f5f4f6",
        "padding": "10px"
    },
    underlineStyle: {
        borderColor: "#007bff"
    }
}

class NewRequestField extends React.Component {
    state = {
        text: '',
    }

    _sendRequest = () => {
        this.setState({
            text: ''
        });
        this.props.sendRequest(this.state.text);
    }

    handleChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        const {
            mentorName 
        } = this.props;

        return (
            <div className="new-request-input">
                <h1>Tell {mentorName} a little bit about yourself</h1>
                <p>If you would like to meet, be sure to include your availability</p>
                <MuiThemeProvider>
                    <TextField
                        fullWidth={true}
                        id={"request-text-field"}
                        multiLine={true}
                        rows={4}
                        textareaStyle={styles.textareaStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                </MuiThemeProvider>
                <div className="buttons">
                    <Button color="success" disabled={this.state.text==""} onClick={this._sendRequest}>Send Message</Button>
                </div>
            </div>
        );
    }
}

export default NewRequestField;
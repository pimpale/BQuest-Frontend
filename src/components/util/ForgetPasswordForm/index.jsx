import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'components/util/Button';
import { withRouter } from "react-router-dom";

class ForgetPasswordForm extends React.Component {
    handleKeyDown = (event) => {
        let key = event.key || event.keyIdentifier || event.keyCode;
        if (key.toString().toLowerCase() === 'enter' || +key === 13) {
            this._action();
            event.preventDefault();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    state = {
        email: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _action = () => {
        if (this.state.email) {
            this.props.action(this.state.email);
        }
    }

    render() {
        const disabled = !this.state.email;
        return(
            <div>
                <div className="login-form">
                    <Form.Group className="form-group">
                        <Label className="label">Email</Label>
                        <div className="flex-group">
                            <Form.Control className="inline-input" type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                            <span>@g.ucla.edu</span>
                        </div>
                    </Form.Group>
                </div>
                <Button className="login-button" onClick={this._action} disabled={disabled} block>{this.props.buttonText}</Button>
            </div>
        );
    }
}

export default withRouter(ForgetPasswordForm);

import React from 'react';
import {Form } from 'react-bootstrap';
import Button from 'components/util/Button';
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
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
        password: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _action = () => {
        if (this.state.email && this.state.password) {
            this.props.action(this.state.email, this.state.password);
        }
    }

    render() {
        const disabled = !this.state.email || !this.state.password;
        return(
            <div>
                <div className="login-form">
                    <Form.Group className="form-group">
                        <Form.Label className="label">Email</Form.Label>
                        <div className="flex-group">
                            <Form.Control className="inline-input" type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                            <span>@g.ucla.edu</span>
                        </div>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control className="inline-input" type="password" name="password" id="password" placeholder="password" onChange={this.handleChange} />
                    </Form.Group>
                </div>
                <Button className="login-button" onClick={this._action} disabled={disabled} block>{this.props.buttonText}</Button>
                <div className="forget-block">
                    <p className="forget-password" onClick={() => this.props.history.push("/forget-password")}>I forgot my password!</p>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginForm);

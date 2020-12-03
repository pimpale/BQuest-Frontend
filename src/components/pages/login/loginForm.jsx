import React from 'react';
import { Input, FormGroup, Label } from 'react-bootstrap';
import Button from '../../util/Button';

class LoginForm extends React.Component {
    handleKeyDown = (event) => {
        let key = event.key || event.keyIdentifier || event.keyCode;
        if (key.toString().toLowerCase() === 'enter' || +key === 13) {
            this._login();
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
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _login = () => {
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        return(
            <div>
                <div className="login-form">
                    <FormGroup className="form-group">
                        <Label className="label">Email</Label>
                        <div className="flex-group">
                            <Input className="inline-input" type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                            <span>@g.ucla.edu</span>
                        </div>
                    </FormGroup>

                    <FormGroup className="form-group">
                        <Label className="label">Password</Label>
                        <Input className="inline-input" type="password" name="password" id="password" placeholder="password" onChange={this.handleChange} />
                    </FormGroup>

                    <p className="forget-password"><a href="#">Forgot password?</a></p>
                </div>
                <Button className="login-button" onClick={this._login} block>LOG IN</Button>
            </div>
        );
    }
}

export default LoginForm;

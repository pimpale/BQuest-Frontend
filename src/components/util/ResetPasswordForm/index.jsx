import React from 'react';
import { Input, FormGroup, Label } from 'react-bootstrap';
import Button from 'components/util/Button';
import { withRouter } from "react-router-dom";
import { parse } from 'qs';

class ResetPasswordForm extends React.Component {
    state = {
        password: '',
        repeatPassword: '',
        passwordCode: '',
        userId: '',
    }
    
    handleKeyDown = (event) => {
        let key = event.key || event.keyIdentifier || event.keyCode;
        if (key.toString().toLowerCase() === 'enter' || +key === 13) {
            this._action();
            event.preventDefault();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);

        const params = new URLSearchParams(this.props.location.search);

        const query1 = params.get('code');
        const query2 = params.get('userid');

        this.setState({
            passwordCode: query1,
            userId: query2
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _action = () => {
        if (this.state.password && this.state.repeatPassword && (this.state.password == this.state.repeatPassword)) {
            this.props.action(this.state.password, this.state.passwordCode, this.state.userId);
        }
    }

    render() {
        const disabled = !(this.state.repeatPassword && this.state.password && (this.state.password == this.state.repeatPassword));
        return(
            <div>
                <div className="login-form">
                    <FormGroup className="form-group">
                        <Label className="label">New password</Label>
                        <Input className="inline-input" type="password" name="password" id="password1" placeholder="password" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup className="form-group">
                        <Label className="label">Re-enter password</Label>
                        <Input className="inline-input" type="password" name="repeatPassword" id="password2" placeholder="password" onChange={this.handleChange} />
                    </FormGroup>
                </div>
                <Button className="login-button" onClick={this._action} disabled={disabled} block>{this.props.buttonText}</Button>
            </div>
        );
    }
}

export default withRouter(ResetPasswordForm);

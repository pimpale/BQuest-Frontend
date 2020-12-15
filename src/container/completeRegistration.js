import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { Actions } from '../reducer';
import CompleteRegistration from '../components/pages/completeRegistration';

class CompleteRegistrationContainer extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.registerSuccess) {
            this.props.redirectToChooseRole();
        }
    }
    render() {
        return (
            <CompleteRegistration 
                completeRegistration={this.props.completeRegistration}
            />
        );
    }
}

const mapStateToProps = state => {
    const Register = state.Register;
    return {
        registerSuccess: Register.get('registerSuccess')
    };
}

const mapDispatchToProps = dispatch => {
    return {
        completeRegistration: (fullName, year) => {
            dispatch(Actions.registerActions.completeRegistration(fullName, year));
        },
        redirectToChooseRole: () => {
            dispatch(replace("/chooseRole"));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteRegistrationContainer);

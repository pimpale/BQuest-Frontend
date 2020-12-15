import React from 'react';
import {connect} from 'react-redux';
import { push, replace } from 'connected-react-router';

import { Actions } from '../reducer';
import Home from '../components/pages/home';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.setState({
                fetching: true
            });
            this.props.fetchProfile();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fetching: false
        });

        if (nextProps.verified) {
            this.props.redirectToHome();
        }
    }

    render() {
        if (this.state.fetching) {
            return <div></div>;
        }

        return(
            <Home
                signUp={this.props.signUp}
            />
        );
    }
}

const mapStateToProps = state => {
    const Login = state.Login;
    const Profile = state.Profile;

    return {
        loggedIn: Login.get('authenticated'),
        verified: Profile.getIn(['user', 'verified']),
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signUp: () => {
            dispatch(push('/register'));
        },
        redirectToHome: () => {
            dispatch(replace('/home'));
        },
        fetchProfile: () => {
            dispatch(Actions.profileActions.fetchProfile());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

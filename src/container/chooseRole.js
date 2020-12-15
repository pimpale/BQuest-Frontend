import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { Actions } from 'reducer';
import ChooseRole from 'components/pages/chooseRole';

class ChooseRoleContainer extends React.Component {
    render() {
        return(
            <ChooseRole
                beAmbassador={this.props.beAmbassador}
                redirectToProfile={this.props.redirectToProfile}
                showOnboarding={this.props.showOnboarding}
            />
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {
        beAmbassador: () => {
            dispatch(Actions.profileActions.updateMentorStatus(true));
            dispatch(replace("/profile/2"));
        },
        redirectToProfile: () => {
            dispatch(replace("/profile/1"));
        },
        showOnboarding: () => {
            dispatch(replace("/onboarding"));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRoleContainer);

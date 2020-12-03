import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import NotificationsSystem from 'reapop';
import {render} from 'react-dom';
import {store, history} from './reducer';

import HomeContainer from './container/home';
import VerifyUserContainer from './container/verify';
import RegisterContainer from './container/register';
import MultipleProfileContainer from './container/multipleProfile';
import ProfileContainer from './container/profile';
import SearchContainer from './container/search';
import ambassadorDetailContainer from 'container/ambassadorDetail';
import CompleteRegistrationContainer from './container/completeRegistration';
import ChooseRoleContainer from 'container/chooseRole';
import LoginContainer from './container/login';
import Logout from "./components/pages/logout";
//import RequestsContainer from './container/requests';
import MessagesContainer from 'container/messages';
import Authentication from './container/requireAuthentication';
import RegisterPendingContainer from './components/pages/register/registerPending';
import PrivacyPolicy from './components/pages/privacy';
import AboutUs from './components/pages/about';
import MainPage from './components/pages/main';
import ForgetPasswordContainer from './container/forget-password';
import ForgetPasswordPending from './components/pages/forget-password/email-pending';
import ResetPasswordContainer from './container/reset';
import Onboarding from './components/pages/onboarding';

import 'bootstrap/dist/css/bootstrap.css';
import './main.scss';

// google analytics
import withTracker from './container/analytics.js';

class PageTracker extends React.Component {
    render() { return null; }
}

if (module.hot) {
    module.hot.accept();
}

class App extends React.Component {
	render() {
		return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <NotificationsSystem theme={theme} />
                        <Switch>
                            <Route exact path="/" component={HomeContainer}/>
                            <Route exact path="/login" component={LoginContainer}/>
                            <Route exact path="/logout" component={Logout}/>
                            <Route exact path="/forget-password" component={ForgetPasswordContainer}/>
                            <Route exact path="/forget-password/pending" component={ForgetPasswordPending} />
                            <Route exact path="/register" component={RegisterContainer}/>
                            <Route exact path="/privacy" component={PrivacyPolicy}/>
                            <Route exact path="/about" component={AboutUs}/>
                            <Route path="/register/pending" component={RegisterPendingContainer} />
                            <Route path="/verify" component={VerifyUserContainer} />
                            <Route path="/password" component={ResetPasswordContainer} />
                            <Route path="/completeRegistration" component={CompleteRegistrationContainer} />

                            <Route exact path="/home" component={Authentication(MainPage)} />
                            <Route exact path="/chooseRole" component={Authentication(ChooseRoleContainer)} />
                            <Route exact path="/onboarding" component={Authentication(Onboarding)} />
                            <Route exact path="/profile/:page" component={Authentication(MultipleProfileContainer)} />
                            {/*<Route exact path="/profile" component={Authentication(ProfileContainer)} />*/}
                            <Route exact path="/search" component={Authentication(SearchContainer)} />
                            <Route exact path="/messages" component={Authentication(MessagesContainer)}/>
                            <Route exact path="/messages/:profileId" component={Authentication(MessagesContainer)} />
                            <Route exact path="/ambassadors/:mentorId" component={Authentication(ambassadorDetailContainer)} />
                            <Redirect to="/"/>
                        </Switch>
                        <Route path="/" component={withTracker(PageTracker)} />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

render(
    <App />,
    document.getElementById('mount')
);

import React from 'react';

import TopBar from 'components/util/TopBar';
import Button from 'components/util/Button';

class ChooseRole extends React.Component {
    state = {
        option: null
    }

    onClick = option => {
        this.setState({option});
    }

    submit = () => {
        return this.props.showOnboarding();
    }
    
    render() {
        return (
            <div className="choose-role--container">
                <TopBar />
                <div className="choose-role--splash">
                    <h1>Welcome!</h1>
                    <h2>We see that it's your first time. To make this process faster,
                        why don't you tell us a bit more about yourself:</h2>
                    <div className="buttons">
                        <div className="options">
                            <button 
                                onClick={() => this.onClick("find")}
                                className={this.state.option === "find" ? "active" : null}
                            >
                                I want to find an ambassador
                            </button>
                            <button 
                                onClick={() => this.onClick("be")}
                                className={this.state.option === "be" ? "active" : null}
                            >
                                I want to be an ambassador
                            </button>
                        </div> 
                        <Button 
                            disabled={!this.state.option}
                            onClick={this.submit}
                        >
                            Take me there
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseRole;
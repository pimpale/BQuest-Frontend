import React from 'react';

import TopBar from 'components/util/TopBar';
import Button from 'components/util/Button';

const styles = {
    radioStyles: {
        fill: "#007bff"
    },
    fieldStyles: {
        borderColor: "#007bff"
    },
    buttonStyles: {
        color: "#007bff",
        labelColor: "#FFFFFF"
    }
}

class CompleteRegistration extends React.Component {

    state = {
        year: null
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.completeRegistration(this.state.year);
    }
    
    onChange = e => {
        this.setState({
            year: e.target.value
        });
    }

    render() {
        const buttonDisabled = !!this.state.fullName && !!this.state.year;
        return(
            <div className="container-complete-registration">
                <TopBar />
                <div className="verify-card">
                    <h1 className="welcome">Last step: What year are you?</h1>
                    <h2>If you're a transfer student, use the number of years studied at UCLA + the number of years at your previous school</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="options">
                            <label>
                                <input
                                    type="radio"
                                    value="1st"
                                    checked={this.state.year === "1st"}
                                    onChange={this.onChange}
                                />
                                1st
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="2nd"
                                    checked={this.state.year === "2nd"}
                                    onChange={this.onChange}
                                />
                                2nd
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="3rd"
                                    checked={this.state.year === "3rd"}
                                    onChange={this.onChange}
                                />
                                3rd 
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="4th"
                                    checked={this.state.year === "4th"}
                                    onChange={this.onChange}
                                />
                                4th 
                            </label>
                        </div>
                        <Button onClick={this.handleSubmit} block disabled={!this.state.year}>I'm ready</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CompleteRegistration;

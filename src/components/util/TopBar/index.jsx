import React from 'react';
import newBquestLogo from 'images/loginPage/white-bquest-logo.svg.inline'

export default () => {
    return (
        <div className="onboard--top-bar">
            <div className="logo">
                <div className="logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
            </div>
        </div>
    );
}

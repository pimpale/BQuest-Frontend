import React from 'react';

const tokenKey = "token";

class Logout extends React.Component {
    componentDidMount() {
        localStorage.removeItem(tokenKey);

        window.location = "/";
    }

    render() {
        return null;
    }
}

export default Logout;

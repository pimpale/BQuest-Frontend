import React from 'react';
import {ReactSVG} from 'react-svg';

import TopBar from './topBar';
import Footer from '../../footer';
import bg from 'images/landingPage/bg.svg.inline';

class Home extends React.Component {

  render() {
    return (
      <div className="home-container">
        <div className="landing-screen">
          <TopBar />
          <ReactSVG className="bg" src={bg} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;

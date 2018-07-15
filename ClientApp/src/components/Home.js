import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
  <div>
    <h1>Hello, to shop of something!</h1>
  </div>
);

export default connect()(Home);

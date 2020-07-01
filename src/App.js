import React, {Component} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
import {Container, Header, Content, Button, Text} from 'native-base';
import {Router, Scene, Stack} from 'react-native-router-flux';
import DetailPage from './pages/detail';

import HomePage from './pages/home';

export default class App extends Component {
  render() {
    // return <HomePage />;
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={HomePage} title="Home" initial={true} />
          <Scene key="details" component={DetailPage} title="Details" />
        </Scene>
      </Router>
    );
  }
}

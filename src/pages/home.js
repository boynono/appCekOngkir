import React, {Component} from 'react';
import {Container, Text, Header, Content, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
// import {StyleSheet, Text, View} from 'react-native';

const HomePage = () => {
  return (
    <Container>
      <Header>
        <Text>home</Text>
      </Header>
      <Content>
        <Button onPress={() => Actions.details()}>
          <Text>Click Me to details!</Text>
        </Button>
      </Content>
    </Container>
  );
};
export default HomePage;

import React, {Component} from 'react';
import {Container, Text, Header, Content, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
// import {StyleSheet, Text, View} from 'react-native';

const DetailPage = () => {
  return (
    <Container>
      <Header>
        <Text>detailPage</Text>
      </Header>
      <Content>
        <Button onPress={() => Actions.home()}>
          <Text>Click Me!Home</Text>
        </Button>
      </Content>
    </Container>
  );
};
export default DetailPage;

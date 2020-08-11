/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Title,
  Subtitle,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  View,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {baseURL, apiKey, logoUrl} from '../utils/Const';

export default class DetailPage extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }
  componentDidMount() {
    this.cekOngkir();
  }
  cekOngkir() {
    let params = this.props.data;
    console.log('detail data', params);
    const formData = new URLSearchParams();
    formData.append('origin', params.originCity);
    formData.append('destination', params.destinationCity);
    formData.append('weight', params.weight);
    formData.append('courier', params.courier);

    console.log('detail data', formData.toString());
    fetch(baseURL + '/cost', {
      method: 'POST',
      headers: {
        key: apiKey,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })
      .then((res) => res.json())
      .then((resData) => {
        let status = resData.rajaongkir.status.code;
        if (status === 200) {
          console.log('data result masuk');
          this.setState({results: resData.rajaongkir.results[0].costs});
        }
      });
  }
  render() {
    let costItem = <View />;
    if (this.state.results) {
      console.log('res data ongkir:', this.state.results);
      costItem = this.state.results.map((item, index) => {
        console.log('data url', logoUrl, this.props.data.courier);
        return (
          <ListItem thumbnail>
            <Left>
              <Thumbnail
                source={{
                  uri: logoUrl[this.props.data.courier],
                }}
              />
            </Left>
            <Body>
              <Text>{item.service}</Text>
              <Text note numberOfLines={index}>
                {item.description}
              </Text>
              <Text>{item.cost[0].etd} Hari</Text>
            </Body>
            <Right>
              <Text>{item.cost[0].value}</Text>
            </Right>
          </ListItem>
        );
      });
    }
    return (
      <Container>
        <Header style={{backgroundColor: '#002dbb'}}>
          <Body>
            <Title style={{color: '#fff'}}>Ongkir App</Title>
            <Subtitle style={{color: '#fff'}}>Input data</Subtitle>
          </Body>
        </Header>
        <Content>
          <List>{costItem}</List>
          <Button onPress={() => Actions.pop()}>
            <Text>Click Me!Home</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

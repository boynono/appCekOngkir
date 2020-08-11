/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  Text,
  Header,
  Content,
  Button,
  Body,
  Title,
  Subtitle,
  Card,
  CardItem,
  Picker,
  Icon,
  Item,
  Label,
  Input,
  View,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {baseURL, apiKey} from '../utils/Const';
// import {StyleSheet, Text, View} from 'react-native';

export default class HomePage extends Component {
  constructor() {
    super();
    // this.onChangeProvice = this.onChangeProvice.bind(this);
    this.state = {
      provinces: [],
      originCities: [],
      destinationCities: [],
      selectedOriginProvince: null,
      selectedOriginCity: null,
      selectedDestinationProvince: null,
      selectedDestinationCity: null,
      weight: 0,
      courier: null,
    };
  }
  componentDidMount() {
    this.onLoadProvince();
  }
  onLoadProvince = () => {
    fetch(baseURL + '/province', {
      method: 'GET',
      headers: {
        key: apiKey,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log('ini data raw', responseData);
        let status = responseData.rajaongkir.status.code;
        if (status === 200) {
          this.state = this.setState({
            provinces: responseData.rajaongkir.results,
          });
        }
      });
  };
  onChangeProvice = (source, value) => {
    if (value && source === 'origin') {
      this.setState({selectedOriginProvince: value}, () => {
        fetch(
          baseURL +
            '/city?province=' +
            this.state.selectedOriginProvince.province_id,
          {
            method: 'GET',
            headers: {
              key: apiKey,
            },
          },
        )
          .then((response) => response.json())
          .then((responseData) => {
            // console.log('data response:', responseData);
            let status = responseData.rajaongkir.status.code;
            if (status === 200) {
              this.setState({
                originCities: responseData.rajaongkir.results,
              });
            }
          });
      });
    } else {
      this.setState({selectedDestinationProvince: value}, () => {
        fetch(
          baseURL +
            '/city?province=' +
            this.state.selectedDestinationProvince.province_id,
          {
            method: 'GET',
            headers: {
              key: apiKey,
            },
          },
        )
          .then((response) => response.json())
          .then((responseData) => {
            // console.log('data response:', responseData);
            let status = responseData.rajaongkir.status.code;
            if (status === 200) {
              this.setState({
                destinationCities: responseData.rajaongkir.results,
              });
            }
          });
      });
    }
  };
  onChangeCity = (source, value) => {
    if (value && source === 'origin') {
      this.setState({selectedOriginCity: value});
    } else {
      this.setState({selectedDestinationCity: value});
    }
  };
  onNavToDetail = () => {
    let params = {
      originCity: this.state.selectedOriginCity.city_id,
      destinationCity: this.state.selectedDestinationCity.city_id,
      weight: this.state.weight,
      courier: this.state.courier,
    };
    console.log('submit data', params);
    Actions.details({data: params});
  };
  render() {
    let provinceItems = <View />;
    if (this.state && this.state.provinces) {
      provinceItems = this.state.provinces.map((prov) => {
        return (
          <Picker.Item
            key={prov.province_id}
            label={prov.province}
            value={prov}
          />
        );
      });
    }
    let originCityItems = <View />;
    if (this.state && this.state.originCities) {
      originCityItems = this.state.originCities.map((city) => {
        return (
          <Picker.Item key={city.city_id} label={city.city_name} value={city} />
        );
      });
    }
    let destinationCityItem = <View />;
    if (this.state && this.state.destinationCities) {
      destinationCityItem = this.state.destinationCities.map((city) => {
        return (
          <Picker.Item key={city.city_id} label={city.city_name} value={city} />
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
        <Content padder>
          <Card>
            <CardItem>
              <Text>Alamat Asal</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item>
                  <Picker
                    note
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select your Province"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{width: 320}}
                    selectedValue={this.state.selectedOriginProvince}
                    onValueChange={this.onChangeProvice.bind(this, 'origin')}>
                    {provinceItems}
                  </Picker>
                </Item>
                <Item>
                  <Picker
                    note
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select your City"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{width: 320}}
                    selectedValue={this.state.selectedOriginCity}
                    onValueChange={this.onChangeCity.bind(this, 'origin')}>
                    {originCityItems}
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Alamat Tujuan</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item>
                  <Picker
                    note
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select your Province"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{width: 320}}
                    selectedValue={this.state.selectedDestinationProvince}
                    // eslint-disable-next-line prettier/prettier
                    onValueChange={this.onChangeProvice.bind(this, 'destination')}>
                    {provinceItems}
                  </Picker>
                </Item>
                <Item>
                  <Picker
                    note
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select your City"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{width: 320}}
                    selectedValue={this.state.selectedDestinationCity}
                    onValueChange={this.onChangeCity.bind(this, 'destination')}>
                    {destinationCityItem}
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Berat</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item floatingLabel>
                  <Label>gram</Label>
                  <Input
                    onChangeText={(value) => {
                      this.setState({weight: value});
                    }}
                    maxLength={6}
                  />
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Pilih kurir</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item>
                  <Picker
                    note
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select your Kurir"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{width: 320}}
                    selectedValue={this.state.courier}
                    onValueChange={(value) => {
                      this.setState({courier: value});
                    }}>
                    <Picker.Item label="JNE" value="jne" />
                    <Picker.Item label="POS INDONESIA" value="pos" />
                    <Picker.Item label="TIKI" value="tiki" />
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Button onPress={this.onNavToDetail}>
            <Text>Click Me to details!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
// export default HomePage;

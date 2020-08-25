import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Card from '../component/Card';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      countBag: 0,
      estimateBag: 0,
      isFetching: false,
    };
    console.log('construktor executed');
  }
  componentDidMount() {
    this.getProduct();
  }
  componentWillUpdate() {
    console.log('component Update');
  }
  getProduct() {
    const url =
      'https://www.blibli.com/backend/search/products?searchTerm=vans';
    fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((resData) => {
        let status = resData.code;
        if (status === 200) {
          console.log('data result masuk', resData.data.products);
          this.setState({products: resData.data.products});
          this.setState({isFetching: true});
        }
      });
  }

  render() {
    console.log('rendered', this.state);
    return (
      <View>
        <Text>ini halaman product</Text>
        <Text> Total Produk dibeli : {this.state.countBag}</Text>
        <Text> Total Harga : {this.state.estimateBag}</Text>
        {this.state.isFetching ? (
          <Card
            data={this.state.products}
            onButtonPress={() =>
              this.setState({countBag: (this.state.countBag += 1)})
            }
          />
        ) : null}
      </View>
    );
  }
}

// const styles = StyleSheet.create({});

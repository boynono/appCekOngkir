import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';

export default class Card extends Component {
  constructor() {
    super();
    console.log('construktor executed');
  }
  componentDidMount() {
    console.log('component mount card', this.props.data);
  }
  render() {
    let cardItems = <View />;
    if (this.props && this.props.data) {
      cardItems = this.props.data.slice(0, 5).map((item, i) => {
        return (
          <View style={styles.card} key={i}>
            <View>
              <ImageBackground
                style={styles.cardImage}
                source={{
                  uri: item.images[0],
                }}
              />
            </View>
            <View style={styles.cardContent}>
              <Text numberOfLines={1} style={styles.cardContentTitle}>
                {item.name}
              </Text>
              <Text style={styles.cardContentSubTitle}>{item.itemSku}</Text>
            </View>
            <View style={styles.action}>
              <View style={styles.actionPrice}>
                <Text>{item.price.priceDisplay}</Text>
              </View>
              <TouchableOpacity
                onPress={this.props.onButtonPress}
                style={styles.container}>
                <View style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Beli</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      });
    }
    return (
      <ScrollView horizontal>
        <View style={{display: 'flex', flexDirection: 'row'}}>{cardItems}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  card: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    padding: 10,
    margin: 20,
    backgroundColor: 'grey',
    borderColor: '#c0c5ce',
    borderRadius: 4,
    width: 200,
    height: 300,
  },
  cardImage: {
    // backgroundColor: '#fff',
    height: 100,
    width: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    marginVertical: 10,
  },
  cardContentTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardContentSubTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  cardContentDescriptions: {
    fontSize: 12,
    marginBottom: 8,
  },
  action: {
    display: 'flex',
    flex: 1,
    height: 200,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  actionPrice: {
    display: 'flex',
    flex: 1,
    // height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  actionPriceText: {
    textAlign: 'center',
  },
  actionButton: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'darkorange',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 25,
    // height: 50,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

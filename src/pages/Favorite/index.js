import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Header from '../../components/Header';

export default class Favorite extends Component {
  render(){
    const navigation = this.props.navigation;
    return(
      <View>
        <Header navigation={navigation}/>
        <Text>Favorites</Text>
      </View>
    );
  }
}
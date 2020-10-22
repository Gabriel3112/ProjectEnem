import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Card, Title, Paragraph, Button} from 'react-native-paper';

import 'react-native-gesture-handler';

import Style from './style';

const CardComponent = ({navigation, title, scopo, author, matter})=>{
  
    return(
      <Card style={Style.container}>
        <Card.Title title={title} subtitle={matter}/>
        <Card.Content>
          <Paragraph style={Style.scopo}>{scopo}</Paragraph>
          <Paragraph style={Style.author}>Author: {author}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={()=>navigation.navigate('Content', {matter: matter, title: title, scopo: scopo, author: author})}>Vizualizar</Button>
        </Card.Actions>
      </Card>
    );
  
}

export default CardComponent;
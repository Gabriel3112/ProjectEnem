import React, {Component, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Title, Text} from 'react-native-paper';


import Style from './style';

const Content = ({route})=>{

const matter = route.params.matter;
const title = route.params.title;
const scopo = route.params.scopo;
const author = route.params.author;
  
  return(
  <ScrollView style={Style.container}>
    <Title style={Style.title}>{title}</Title>
    <Text style={Style.matter}>{matter}</Text>
    <View style={Style.lineBreak}></View>
    <Text style={Style.scopo}>{scopo}</Text>
    <Text style={Style.author}>Author: {author}</Text>
  </ScrollView>
  );
}

export default Content;
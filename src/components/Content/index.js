import React, {Component, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';


import Style from './style';

const Content = ({route})=>{

const matter = route.params.matter;
const title = route.params.title;
const scopo = route.params.scopo;
const author = route.params.author;
  
  return(
  <ScrollView>
    <Text style={Style.matter}>{matter}</Text>
    <Text style={Style.title}>{title}</Text>
    <Text style={Style.scopo}>{scopo}</Text>
    <Text style={Style.author}>Author: {author}</Text>
  </ScrollView>
  );
}

export default Content;
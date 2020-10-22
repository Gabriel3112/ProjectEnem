import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {Text,TextInput, Button} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

import Context from '../../services/auth';

import Style from './style';

import api from '../../services/api';


const Publish = ({navigation, route})=>{
  const {user} = useContext(Context); 

  const [matter, setMatter] = useState('Matemática');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  function ClearText(){
    setContent('');
    setTitle('');
  }

  function HandlePublish(){
    api.post('/content',{
      matter: matter,
      title: title,
      content: content,
      author: user.displayName
    }).then((result)=>{
      ClearText();
      navigation.navigate('Home');
    })
    .catch(err=>console.log(err));
  }
  
  

  return(
    
    <View style={Style.container}>
      <View style={Style.matterPicker}>
        <Picker 
          selectedValue={matter}
          onValueChange={(itemValue) => {
            setMatter(itemValue);
          }}>
          <Picker.Item label="Matemática" value="Matemática" />
          <Picker.Item label="Geografia" value="Geografia" />
          <Picker.Item label="História" value="História" />
          <Picker.Item label="Inglês" value="Inglês" />
          <Picker.Item label="Português" value="Português" />
          <Picker.Item label="Física" value="Física" />
          <Picker.Item label="Química" value="Química" />
          <Picker.Item label="Filosofia" value="Filosofia" />
          <Picker.Item label="Sociologia" value="Sociologia" />
          <Picker.Item label="Biologia" value="Biologia" />
        </Picker>
    </View>
    <TextInput mode={"outlined"} selectionColor={'#a9a9a9'} label='Título' style={Style.titleInput} theme={{colors:{primary: '#000'}, roundness: 25}} onChangeText={(Text)=>{setTitle(Text)}} value={title}/>
    
    <TextInput mode={"outlined"} selectionColor={'#a9a9a9'} multiline label='Conteúdo' style={Style.contentInput} theme={{colors:{primary: '#000'}, roundness: 25}} onChangeText={(Text)=>{setContent(Text)}} value={content}/>
    
    <Button onPress={()=>HandlePublish()} 
    color='#000'
    icon={({color, size}) =>(
      <Icon 
        name='publish'
        size={size}
        color={color}/>
    )}>Publicar</Button>
    
  </View>
  );
}

export default Publish;
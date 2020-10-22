import React, {useState, useContext} from 'react';

import {View} from 'react-native';

import {TextInput, Button} from 'react-native-paper';

import Style from './style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Context from '../../services/auth';

const Register = ()=>{

  const {HandleRegister} = useContext(Context);

  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
 
  return(
    <View>
      <TextInput  style={Style.NameInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Nome'} onChangeText={(text)=>{setDisplayName(text)}} value={displayName}/>
      <TextInput  style={Style.EmailInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Email'} onChangeText={(text)=>{setEmail(text)}} value={email}/>
      <TextInput  style={Style.PasswordInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Senha'} onChangeText={(text)=>{setPassword(text)}} value={password}/>
      <Button color='#000' icon={({color, size}) => (
          <Icon name='account-plus'
          color={color}
          size={size}/>
        )} onPress={()=>HandleRegister(displayName, email, password)}>Cadastrar</Button>
    </View>
  );
}

export default Register;
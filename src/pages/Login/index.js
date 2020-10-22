import React, {useState, useEffect, useContext} from 'react';

import {View} from 'react-native';

import {TextInput, Button, Text} from 'react-native-paper';

import auth from '@react-native-firebase/auth';

import AuthContext from '../../services/auth';

import Style from './style';

import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = ({navigation})=>{

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {HandleLogin} = useContext(AuthContext);


return(
  <View>
    <TextInput keyboardType={"email-address"} style={Style.EmailInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Email'} onChangeText={(text)=>{setEmail(text)}} value={email}/>
    
    <TextInput secureTextEntry={true} autoCorrect={false} keyboardType={"visible-password"}  style={Style.PasswordInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Senha'} onChangeText={(text)=>{setPassword(text)}} value={password}/>
  
    <Button style={Style.LoginBtn} color='#000' icon={({color, size}) => (
          <Icon name='arrow-right'
          color={color}
          size={size}/>
        )} onPress={()=>HandleLogin(email, password)}>Entrar</Button>

    <Button style={Style.RegisterBtn} color='#000' icon={({color, size}) => (
          <Icon name='account-plus'
          color={color}
          size={size}/>
        )} onPress={()=>navigation.navigate('Register')}>Cadastrar-se</Button>
  </View>
);
  
}

export default Login;
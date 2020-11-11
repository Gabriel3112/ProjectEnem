import React, {useState} from 'react';

import {View} from 'react-native';

import {TextInput, Button} from 'react-native-paper';

import Style from './style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import auth from '@react-native-firebase/auth';

const Register = ()=>{

  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secureText, setSecureText] = useState(true);

  const [loading, setLoading] = useState(false);

  const HandleRegister = async ()=>{
    
    if(displayName != null && email != null && password != null){
      
      setLoading(true);
        auth().createUserWithEmailAndPassword(email, password).then((result)=>{
          result.user.updateProfile({
            displayName: displayName
          });
          setLoading(false);
        }).catch(()=>{
          alert('Email ou senha inválido(a)');
          setLoading(false);
        })
    }else{
      alert('Preencha todos os campos');
    }
  }
   
  

  var iconEyeStats;
  
  if(secureText){
    iconEyeStats = 'eye';
  }else{
    iconEyeStats = 'eye-off';
  }
 
  return(
    <View>
      <TextInput  style={Style.NameInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Nome'} onChangeText={(text)=>{setDisplayName(text)}} value={displayName}/>
      <TextInput  style={Style.EmailInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Email'} onChangeText={(text)=>{setEmail(text)}} value={email}/>
      <TextInput right={<TextInput.Icon name={iconEyeStats} onPress={()=> secureText ? setSecureText(false) : setSecureText(true)}/>} secureTextEntry={secureText} autoCorrect={false}   style={Style.PasswordInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Senha'} onChangeText={(text)=>{setPassword(text)}} value={password}/>
      <Button disabled={loading} loading={loading} color='#000' icon={({color, size}) => (
          <Icon name='account-plus'
          color={color}
          size={size}/>
        )} onPress={HandleRegister}>Cadastrar</Button>
    </View>
  );
}

export default Register;
import React, {useState} from 'react';

import {View} from 'react-native';

import {TextInput, Button} from 'react-native-paper';

import auth from '@react-native-firebase/auth';

import Style from './style';

import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = ({navigation})=>{

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [secureText, setSecureText] = useState(true);

  const [loading, setLoading] = useState(false);

 

  const HandleLogin = async ()=>{
      
    if(email != null && password != null){
      
        setLoading(true);
        await auth().signInWithEmailAndPassword(email, password).then(()=>setLoading(false)).catch((err)=>{
          //identificação de erro do Firebase após enviado 
        if(err.code === 'auth/wrong-password'){
        alert('Senha incorreta');
      }else if(err.code === 'auth/user-not-found'){
        alert('Email incorreto');
      }else if(err.code === 'auth/too-many-requests'){
        alert('Erro de conexão, verifique sua internet ou reinicie o aplicativo');
      }

      setLoading(false);
      });
    
  }else{
    alert('Preencha todos os campos');
  }
  }
  // Icon show and hide password
  var iconEyeStats;
  if(secureText){
    iconEyeStats = 'eye';
  }else{
    iconEyeStats = 'eye-off';
  }
return(
  <View>
    <TextInput keyboardType={"email-address"} style={Style.EmailInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Email'} onChangeText={(text)=>{setEmail(text)}} value={email}/>
    
    <TextInput right={<TextInput.Icon name={iconEyeStats} onPress={()=> secureText ? setSecureText(false) : setSecureText(true)}/>} secureTextEntry={secureText} autoCorrect={false}   style={Style.PasswordInput} selectionColor={'#a9a9a9'} theme={{colors:{primary: '#000'}}} label={'Senha'} onChangeText={(text)=>{setPassword(text)}} value={password}/>
  
    <Button style={Style.LoginBtn} disabled={loading} loading={loading} color='#000' icon={({color, size}) => (
          <Icon name='arrow-right'
          color={color}
          size={size}/>
        )} onPress={HandleLogin}>Entrar</Button>

    <Button style={Style.RegisterBtn} color='#000' icon={({color, size}) => (
          <Icon name='account-plus'
          color={color}
          size={size}/>
        )} onPress={()=>{navigation.navigate('Register');}}>Cadastrar-se</Button>
  </View>
);
  
}

export default Login;
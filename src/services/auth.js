import React, {createContext, useState} from 'react';

import auth from '@react-native-firebase/auth';

const Context = createContext({});

export const AuthContext = (props)=>{
  const [user, setUser] = useState(null);
  
  return(
    <Context.Provider value={{
      user,
      setUser,
      HandleLogin: async(email, password)=>{
        
         
        if(email != null && password != null){
          try{
          auth().signInWithEmailAndPassword(email, password);
        }catch(e){
          alert('Preencha todos os campos');
        }
      }else{
        alert('Preencha todos os campos');
      }
      },
      HandleRegister: async(displayName, email, password)=>{
        
          
        if(displayName != null && email != null && password != null){
        try{
          auth().createUserWithEmailAndPassword(email, password).then((result)=>{
            result.user.updateProfile({
              displayName: displayName
            });
          })
        }catch(e){
          alert('Preencha todos os campos');
        }
      }else{
        alert('Preencha todos os campos');
      }
      },
      HandleLogout: async(navigation)=>{
        try{
          await auth().signOut();
        }catch(e){
          
        }
      }
    }
  }>{props.children}</Context.Provider>
  
  );
}

export default Context;

import React, {useState, useEffect, useContext, useCallback}from 'react';

import {View, Text, FlatList, RefreshControl} from 'react-native';

import Card from '../../components/Card';

import Style from './style';

import Context, {AuthContext} from '../../services/auth';

import api from '../../services/api';




const Home = ({navigation})=>{
  

  const [data, setData] = useState([]);
  
  const {user} = useContext(Context);

  const [refreshing, setRefreshing] = useState(false);
  const Wait = (timeout)=>{
    return new Promise(resolve =>{
      setTimeout(resolve, timeout);
    });
  }  

  const OnRefresh = useCallback(()=>{
    setRefreshing(true);
    
      api.get("/content")
      .then(response=>{setData(response.data)
        Wait(1500).then(()=> setRefreshing(false));})
      .catch(err=>{console.log(err ) 
        setRefreshing(false)});
      
   

    
  }, [])


  useEffect(()=>{
    api.get("/content")
    .then(response=>{setData(response.data)})
    .catch(err=>{console.log(err )});
    
  }, []);

  const RenderItem = ({item})=>{
    return(
    <Card matter={item.matter} title={item.title} scopo={item.content} author={item.author} navigation={navigation}/>
    )
  }
    console.log(user)
  return(
    <FlatList data={data} ListHeaderComponent={<Text style={Style.welcome}>Bem-Vindo {!user ? null : user.displayName}</Text>} renderItem={RenderItem} refreshing={refreshing} onRefresh={OnRefresh} keyExtractor={(item)=> item.title}/>
  );}
  
  


export default Home;

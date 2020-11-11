import React, {useContext, useState, useEffect, useCallback} from 'react';

import {FlatList} from 'react-native';

import {Text, ActivityIndicator} from 'react-native-paper';

import Card from '../../components/Card';

import Style from './style';

import api from '../../services/connection/api';

import Context from '../../services/context';

const Profile = ({navigation})=>{

  const {user} = useContext(Context);

  const [data, setData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  const [finalPage, setFinalPage] = useState(false);

  const [page, setPage] = useState(1);

  const Wait = (timeout)=>{
    return new Promise(resolve=>{
      setTimeout(resolve, timeout);
    })
  }
  
  useEffect(()=> {FetchData()}, []);
  
  
  const OnRefresh = useCallback(()=> {
    setRefreshing(true);
    setLoadingMore(false);
    setPage(1);
    FetchData();
  },[]);

  const OnLoadingContent = ()=>{
    if(!loadingMore && !finalPage){
      setPage(page + 1, FetchData().then(()=>{
        
        setLoadingMore(true);
      
        console.log('Loading More: ' + loadingMore);
        console.log('Refreshing: ' + refreshing);
        console.log('Final Page: ' + finalPage);
        console.log('Page: ' + page);
        
      }));
    }
    
    
  }

  const FetchData = async ()=>{
    await api.get(`/user?UID=${(!user)?null:user.uid}&page=${page}`).then((response)=>{
      console.log('data: ' + response.data.length + ' Page: ' + page);
      if(response.data.length == 0){
        setLoadingMore(false);
        setRefreshing(false);
        setFinalPage(true);
      }else{

        Wait(1000).then(()=> {
          if(page === 1){
            setData(response.data);
            setLoadingMore(false);
          }else{setData(data.concat(response.data));
            setLoadingMore(false);
            setRefreshing(false);
        
            if(finalPage){
        
              if(response.data.length > 0){
                setFinalPage(false);
              }
        
            }
        
          }

          setLoadingMore(false);
          setRefreshing(false);
      
        
        });
      }
    })
  }

  const RenderItemFooter = ()=>{
    return(
      (finalPage) ? <Text style={Style.footerList}>Fim da página!</Text> : 
      (loadingMore) ? <ActivityIndicator 
      animating color={'#000'} size={"large"} 
      style={Style.footerList}/> 
      : <Text style={Style.footerList}>Carregando...</Text>
    )
  }

  const RenderItem = ({item})=>{
    return(
    <Card  home={false} id={item._id} UID={item.userUID} matter={item.matter} title={item.title} scopo={item.content} author={item.author} navigation={navigation}/>
    );
  }

  return(
    <FlatList onEndReachedThreshold={0.1} onEndReached={OnLoadingContent} ListHeaderComponent={<Text style={Style.welcome}>Bem-Vindo {!user ? null : user.displayName}</Text>} ListFooterComponent={RenderItemFooter} onRefresh={OnRefresh} refreshing={refreshing} data={data} renderItem={RenderItem} keyExtractor={(item, index)=> index.toString()}/>
  );
} 

export default Profile;

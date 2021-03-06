import React, {useState, useEffect, useContext, useCallback}from 'react';

import {Text, FlatList} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';

import Card from '../../components/Card';

import Style from './style';

import Context from '../../services/context';

import api from '../../services/connection/api';




const Home = ({navigation, refresh})=>{
  
  const [data, setData] = useState([]);
  
  const {user} = useContext(Context);

  const [refreshing,setRefreshing] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  const [finalPage, setFinalPage] = useState(false);

  const [page, setPage] = useState(1);

  
  const Wait = (timeout)=>{
    return new Promise(resolve =>{
      setTimeout(resolve, timeout);
    });
  }  
  useEffect(()=> {FetchData()}, []);
 
  const OnRefresh = useCallback(()=>{
    setRefreshing(true);
    setFinalPage(false);
    setLoadingMore(false);

    setData([]);
    setPage(1);
    FetchData();
  }, [])

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
    
    
  
    
    
    
  };

  const RenderItemFooter = ()=>{
    return(
      (finalPage) ? <Text style={Style.footerList}>Fim da página!</Text> : 
      (loadingMore) ? <ActivityIndicator 
      animating color={'#000'} size={"large"} 
      style={Style.footerList}/> 
      : <Text style={Style.footerList}>Carregando...</Text>
    )
  }
 
  const FetchData = async ()=>{
    await api.get("/content?page=" + page)
    .then(response=>{
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
    .catch(()=>{
      alert('Desculpe, problemas de conexão!');
    });
}
  const RenderItem = ({item})=>{
    return(
    <Card  home={true} id={item._id} UID={item.userUID} matter={item.matter} title={item.title} scopo={item.content} author={item.author} navigation={navigation}/>
    )
  }
  return(
  
    
 
    <FlatList onEndReachedThreshold={0.1} onEndReached={OnLoadingContent}  data={data} ListFooterComponent={RenderItemFooter} ListHeaderComponent={<Text style={Style.welcome}>Bem-Vindo {!user ? null : user.displayName}</Text>} renderItem={RenderItem} refreshing={refreshing} onRefresh={OnRefresh} keyExtractor={(item, index)=> index.toString()}/>
  
  
  );

}
  
  


export default Home;

import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Card, Paragraph, Button, Portal, Dialog} from 'react-native-paper';

import Context from '../../services/context';

import 'react-native-gesture-handler';

import api from '../../services/connection/api';

import Style from './style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardComponent = ({id ,home ,UID ,navigation, title, scopo, author, matter})=>{
    const {user, setRefreshingProfile} = useContext(Context);

    const [dialogVisible, setDialogVisible] = useState(false);

    const HandleDeleteContent = ()=>{
      api.delete('/user?id=' + id).then(result=>{
        setDialogVisible(false);
        setRefreshingProfile(true);
        console.log(result);
      });
    }
    return(
      
      <Card style={Style.container}>
        <Card.Title title={title} subtitle={matter}/>
        <Card.Content>
          <Paragraph style={Style.scopo}>{scopo}</Paragraph>
          <Paragraph style={Style.author}>Author: {author}</Paragraph>
        </Card.Content>
        <Card.Actions style={Style.cardActionsShower}>
          {
            (!home)?(user)?(UID == user.uid) ? <Button style={Style.cardButtonDelete} color='#B22' icon={({color})=>(<Icon name='delete' color={color} size={30}/>)} onPress={()=>setDialogVisible(true)}/> : null : null : null
          }
          <Button color='#000' icon={({color})=>(<Icon name='arrow-right' color={color} size={30}/>)} onPress={()=>navigation.navigate('Content', {matter: matter, title: title, scopo: scopo, author: author})}/>
        </Card.Actions>

        
      
        <Dialog style={Style.dialog} theme={{roundness: 25,}} visible={dialogVisible} onDismiss={()=>setDialogVisible(false)}>
            <Dialog.Title>Tem certeza, que vai apagar o post ?</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={()=>setDialogVisible(false)}>Não</Button>
              <Button onPress={HandleDeleteContent}>Sim</Button>
            </Dialog.Actions>
        </Dialog>
      
      </Card>

      
    );
      }

export default CardComponent;
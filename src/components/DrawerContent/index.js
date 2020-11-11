import React, {useContext} from 'react';
import {View} from 'react-native';

import auth from '@react-native-firebase/auth';

import {Drawer} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Style from './style';

import Context from '../../services/context';

const DrawerContent = (props)=>{

  const {setRefreshingProfile, setLoadingContent} = useContext(Context);

  return(
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={Style.drawerContent}>
        <DrawerItem
        icon={({color, size}) => (
          <Icon name='home'
          color={color}
          size={size}/>
        )}
        label={'Home'}
        onPress={()=>{
          props.navigation.navigate('Home');
        }}/>

        <DrawerItem
        icon={({color, size}) => (
          <Icon name='publish'
          color={color}
          size={size}/>
        )}
        label={'Publicar'}
        onPress={()=>{props.navigation.navigate('Publish')}}/>

        <DrawerItem
          icon={({color, size}) => (
            <Icon name='account'
            color={color}
            size={size}/>
          )}
        label={'Perfil'}
        onPress={()=>{
          props.navigation.navigate('Profile')
          setRefreshingProfile(true);
        }}/>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={Style.bottomSection}>
        <DrawerItem
        icon={({color, size}) => (
          <Icon name='exit-to-app'
          color={color}
          size={size}/>
        )}
        label={'Sair da conta'} onPress={async ()=>await auth().signOut()}/>
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;
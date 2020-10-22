import React, {useContext} from 'react';
import {View} from 'react-native';


import {Drawer} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Style from './style';

import Context from '../../services/auth';

const DrawerContent = (props)=>{

  const {HandleLogout} = useContext(Context);

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
        onPress={()=>{props.navigation.navigate('Home')}}/>

        <DrawerItem
        icon={({color, size}) => (
          <Icon name='publish'
          color={color}
          size={size}/>
        )}
        label={'Publish'}
        onPress={()=>{props.navigation.navigate('Publish')}}/>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={Style.bottomSection}>
        <DrawerItem
        icon={({color, size}) => (
          <Icon name='exit-to-app'
          color={color}
          size={size}/>
        )}
        label={'Sair da conta'} onPress={()=>HandleLogout(props.navigation)}/>
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;
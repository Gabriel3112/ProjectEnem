import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import auth from '@react-native-firebase/auth';

import DrawerContent from './components/DrawerContent';

//LoginScreen
import Login from './pages/Login';
import Register from './pages/Register';


//HomeScreen
import Home from './pages/Home';
import Content from './components/Content';

//PublishScreen
import Publish from './pages/Publish'



import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Context from './services/auth';

const StackLoginScreen = () => {
  return(
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen name={'Login'} component={Login}/>
      <Stack.Screen name={'Register'} component={Register}/>
    </Stack.Navigator>
  );
}

const StackContentScreen = ({navigation, route})=>{
  return(
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerLeft: (()=><TouchableOpacity onPress={()=>navigation.goBack({routeName:'Home'})}><Icon name={'arrow-left'} size={55}/></TouchableOpacity>),
  }}>
      <Stack.Screen name={'Content'} component={Content} initialParams={{matter: route.params.matter, title: route.params.title, scopo: route.params.scopo, author: route.params.author}}/>
    </Stack.Navigator>
  );
}

const StackHomeScreen = ({navigation, route}) => {
  const ModeHeader = ()=>{
    
    if(route.state == undefined || route.state.routes.length == 1){
      return 'screen';
    }else if(route.state.routes.length == 2){
      return 'none';
    }}

  return(  
    <Stack.Navigator initialRouteName={'Home'} headerMode={ModeHeader()} screenOptions={{
      headerTitleAlign: 'center',
      headerLeft: (()=><TouchableOpacity onPress={()=> navigation.openDrawer()}><Icon name={'menu'} size={55}/></TouchableOpacity>),
    }}>
      <Stack.Screen name={'Home'} component={Home}/>
      <Stack.Screen name={'Content'} component={StackContentScreen}/>
    </Stack.Navigator>
  );
}

const DrawerHomeScreen = ()=>{
    
  return(
    <Drawer.Navigator drawerContent={ props=><DrawerContent {...props}/> }  >
      <Drawer.Screen name='Home' component={StackHomeScreen}/>
      <Drawer.Screen name='Publish' component={StackPublishScreen}/>
    </Drawer.Navigator>
  );
}

const StackPublishScreen = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName={'Publish'} screenOptions={{
      headerTitleAlign: 'center',
      headerLeft: (()=><TouchableOpacity onPress={()=> navigation.openDrawer()}><Icon name='menu' size={55}/></TouchableOpacity>),
  }}>
      <Stack.Screen name={'Publish'} component={Publish}/>
    </Stack.Navigator>
  );
}


const Routes = () => {
  const {user, setUser} = useContext(Context);
  const [initializing, setInitializing] = useState(true);


  const onAuthStateChanged = (user)=>{
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(()=>{
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  return(
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {user ? <Stack.Screen name='Home' component={DrawerHomeScreen}/> : <Stack.Screen name='Login' component={StackLoginScreen}/>}
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default Routes;

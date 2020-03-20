import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, Image, View, ImageBackground, TouchableOpacity} from 'react-native'
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'


import LoginScreen from './src/screens/Login'
import HomeScreen from './src/screens/Home'
import NewsScreen from './src/screens/News'
import AddNewsScreen from './src/screens/AddNews'
import EditNewsScreen from './src/screens/EditNews'
import DetailNewsScreen from './src/screens/DetailNews'

import { Card, Left, Thumbnail, Title } from 'native-base';


const Stack = createStackNavigator();

const Drawer =createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
        <View style={{marginTop:-10}}>
          <ImageBackground
            source={require('./src/images/paket-internet-marketing.webp')}
            style={{ flex: 1, justifyContent:'flex-end', height:250, resizeMode: 'cover' }}
          >
            <View style={{padding:10, backgroundColor:'rgba(0,0,0,0.5)'}}>
              <Title>Reza Tri</Title>
              <Title>Babastudio</Title>
            </View>
          </ImageBackground>
        </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const myDrawer=()=>{
  return(
      <Drawer.Navigator drawerContent={props=> <CustomDrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="News" component={NewsScreen}/>
        <Drawer.Screen name="Logout" component={() => {
          props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Login' },
            ]
          }));
        }}/>
      </Drawer.Navigator>
  )
}

function MenuButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Image style={{width:20, height:20, marginLeft:20}} source={require('./src/images/icon/menu.png')} />
    </TouchableOpacity>
  );
}

function App() {
return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="AddNews" component={AddNewsScreen} />
        <Stack.Screen name="EditNews" component={EditNewsScreen} />
        <Stack.Screen name="DetailNews" component={DetailNewsScreen} />
        <Stack.Screen name="Home" component={myDrawer}
          options={{
            title: 'NEWS',
            headerRight : () => 
              <TouchableOpacity>
                <Image style={{width:20, height:20, marginRight:20}} source={require('./src/images/icon/recycle.png')} />
              </TouchableOpacity>
            ,
            headerLeft : () => 
              <MenuButton/>
            ,
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
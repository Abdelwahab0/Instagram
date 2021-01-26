import React,{ useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { firebase } from './lib/firebase.prod';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LandingScreen from './components/auth/Landing';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));


const Stack = createStackNavigator();

export default function App({navigation}) {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        setLoggedIn(false)
        setLoaded(true)
      }
      else{
        setLoggedIn(true)
        setLoaded(true)
      }
    });
  }, []);


  if (!loaded){
    return (
      <View style={{flex: 1, justifyContent:'center'}}>
        <Text>Loading</Text>
      </View>
    )
  }
  if(!loggedIn) {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: true}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: true}}/>
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Add" component={AddScreen} navigation={navigation}/>
          <Stack.Screen name="Save" component={SaveScreen} navigation={navigation}/>
        </Stack.Navigator>
      </NavigationContainer>  
    </Provider>
  )
}

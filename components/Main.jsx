import React, { useEffect } from 'react'
import { View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons as Icons } from 'react-native-vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts } from '../redux/actions/index';

import FeedScreen from './main/Feed';
import SearchScreen from './main/Search';
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => (
  null
);

function Main({ fetchUser, fetchUserPosts, currentUser, navigation }) {
  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      <Tab.Screen name="Feed" component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="home" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="Search" component={SearchScreen} navigation={navigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="magnify" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="AddContainer" component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("Add")
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="plus-box" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="account-circle" color={color} size={26} />
          ),
        }} />
    </Tab.Navigator>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main);

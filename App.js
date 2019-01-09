import React from 'react';
import {vView, Text } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import HelloScreen from './screens/HelloScreen';
import SearchScreen from './screens/SearchScreen';
import StartScreen from './screens/StartScreen';

const AppNavigator = createStackNavigator({
  Start: {
    screen: StartScreen,
    navigationOptions: {
      header: null
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  },

}, {
    initialRouteName: 'Start',
});

export default createAppContainer(AppNavigator);

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/StartScreen';
import HelloScreen from '../screens/HelloScreen';
import Chat from '../screens/Chat';
import createBottomTabNavigator from './NavigationBar';

const DashboardStackNavigator = createBottomTabNavigator;

  const AppSwitchNavigator = createSwitchNavigator({
    Chat: {screen: Chat},
    HelloScreen: {screen: HelloScreen},
    Welcome: {screen: WelcomeScreen},
    Dashboard: {screen: DashboardStackNavigator},

  });

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;

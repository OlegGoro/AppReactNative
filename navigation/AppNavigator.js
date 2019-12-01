import React from 'react';
import { Image , Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Feed from '../screens/SearchScreen';
import Likes from '../screens/LikesScreen';
import Messages from '../screens/MessagesScreen';
import Profile from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/StartScreen';
import HelloScreen from '../screens/HelloScreen';
import Icon from '@expo/vector-icons/Ionicons';





const DashboardStackNavigator = createBottomTabNavigator(



  {
    FeedStack: {
      screen: Feed,
      navigationOptions: {
        header: null,
        headerMode: null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/feed_icon.png')}
            style={{width: 26, height: 26, tintColor: tintColor}}
          />
        )
      }
    },
    LikesStack: {
      screen: Likes,
      navigationOptions: {
        header: null,
        headerMode: null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/like_icon.png')}
            style={{width: 26, height: 26, tintColor: tintColor}}
          />
        )
      }
    },
    MessagesStack: {
      screen: Messages,
      navigationOptions: {
        header: null,
        headerMode: null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/messages_icon.png')}
            style={{width: 26, height: 26, tintColor: tintColor}}
          />
        )
      }
    },
    ProfileStack: {
      screen: Profile,
      navigationOptions: {
        header: null,
        headerMode: null,
        tabBarIcon: ({ tintColor }) => (
          <Text style={{color: '#fffbfb', fontSize:20}}>60</Text>
        )
      }
    },
  },
  {
    initialRouteName: 'FeedStack',
    tabBarOptions: {
      activeTintColor: '#f08d8d',
      inactiveTintColor: '#fffbfb',
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 0,

       }
    }
  }
);




  const AppSwitchNavigator = createSwitchNavigator({
    HelloScreen: { screen: HelloScreen },
    Welcome: { screen: WelcomeScreen },
    Dashboard: { screen: DashboardStackNavigator },

  });

export default AppContainer = createAppContainer(AppSwitchNavigator);

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Feed from '../screens/SearchScreen';
import Likes from '../screens/LikesScreen';
import WelcomeScreen from '../screens/StartScreen';
import Icon from '@expo/vector-icons/Ionicons';


const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: ({ navigation }) => {
        return {
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
);

const LikesStack = createStackNavigator(
  {
    Likes: {
      screen: Likes,
      navigationOptions: ({ navigation }) => {
        return {
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
);

const DashboardTabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    LikesStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  }
);


  const AppSwitchNavigator = createSwitchNavigator({
    Welcome: { screen: WelcomeScreen },
    Dashboard: { screen: DashboardStackNavigator }
  });

export default AppContainer = createAppContainer(AppSwitchNavigator);

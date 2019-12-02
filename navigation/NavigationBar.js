import {createBottomTabNavigator} from "react-navigation-tabs";
import Feed from "../screens/SearchScreen";
import {Image, Text} from "react-native";
import Likes from "../screens/LikesScreen";
import Profile from "../screens/ProfileScreen";
import React from "react";
import MessagesScreen from "../screens/MessagesScreen";

var feedStack = {
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
};

var likesStack = {
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
};

var chat = {
    screen: MessagesScreen,
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
};

var profileStack = {
    screen: Profile,
    navigationOptions: {
        header: null,
        headerMode: null,
        tabBarIcon: ({ tintColor }) => (
            <Text style={{color: '#fffbfb', fontSize:20}}>60</Text>
        )
    }
};

export default createBottomTabNavigator(
    {
        FeedStack: feedStack,
        LikesStack: likesStack,
        Chat: chat,
        ProfileStack: profileStack
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
    /*{
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below.
            IconComponent = HomeIconWithBadge;
          } else if (routeName === 'Settings') {
            iconName = `ios-options`;
          }

          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }*/
);

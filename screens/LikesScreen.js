import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ListView, ActivityIndicator, RefreshControl  } from 'react-native';
import Constants from 'expo-constants';
import Row from './Row';
import LikesList from './LikesList';
import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
  <Ionicons
    name={'md-home'}
    size={35}
    color={props.focused ? 'grey' : 'darkgrey'}
  />
)

 export default class LikesScreen extends Component {

   static navigationOptions = {
     tabBarIcon: TabIcon
   };

   render() {
     return (
       <View style={{backgroundColor:"#131417"}}>
       <LikesList></LikesList>
       </View>
     );
   }
 }

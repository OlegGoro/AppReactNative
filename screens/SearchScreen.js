import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ListView, ActivityIndicator, RefreshControl  } from 'react-native';
import Constants from 'expo-constants';
import Row from './Row';
import ClaimsList from './ClaimsList';
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';

const TabIcon = (props) => (
  <Ionicons
    name={'md-home'}
    size={35}
    color={props.focused ? 'grey' : 'darkgrey'}
  />
)

 export default class SearchScreen extends Component {

   static navigationOptions = {
     tabBarIcon: TabIcon
   };

   render() {
     return (
       <SafeAreaView style={{backgroundColor:"#131417", flex: 1}}>
       <View style={{backgroundColor:"#131417"}}>
       <ClaimsList></ClaimsList>
       </View>
       </SafeAreaView>
     );
   }
 }

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ListView, ActivityIndicator, RefreshControl  } from 'react-native';
import Constants from 'expo-constants';
import Row from './Row';
import ClaimsList from './ClaimsList';


 export default class SearchScreen extends Component {


   render() {
     return (
       <View style={{backgroundColor:"#131417"}}>

       <ClaimsList></ClaimsList>
       </View>
     );
   }
 }

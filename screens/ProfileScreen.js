import React, { Component } from 'react';
import { Image, StyleSheet, Text, View,} from 'react-native';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';
import {SafeAreaView} from 'react-navigation';


var deviceid

 export default class ProfileScreen extends Component {


   constructor(){
   super();
   this.state = {
      time: '60',
    }
   };

   _retrieveData = async () => {
     try {
       deviceid = await AsyncStorage.getItem('deviceid');
       this._fetchData();
     } catch (error) {
      console.log("NO DATA");
     }
   };
   closemyclaim(){
     NativeModules.DevSettings.reload();
   }

   _fetchData = () => {
     fetch("http://192.168.0.107:8000/api/v1/claims/?name=" + deviceid )
     .then((response) => response.json())
     .then((responseJson) => {
       data = responseJson[0]
       esttime = Math.round (data.esttime)
       this.setState({
         time: esttime,
       });
     })
     .catch((error) =>{
       closemyclaim()
     });

   }

   componentDidMount() {
     this._retrieveData()
     setInterval(this._fetchData, 1000)
   }

   static navigationOptions = {

   };


   render() {
     return (
       <SafeAreaView style={{backgroundColor:"#131417", flex:1}}>
       <View style={{backgroundColor:"#131417", marginTop: 200, justifyContent: 'center', alignItems: 'center'}}>
       <Text style={{color: "white", fontSize: 20}}>Осталось минут</Text>
       <Text style={{color: "white", fontSize: 50}}>{this.state.time}</Text>
       </View>
       </SafeAreaView>
     );
   }
 }

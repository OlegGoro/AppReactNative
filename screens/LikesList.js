import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, NativeModules    } from 'react-native';
import Constants from 'expo-constants';
import Row from './Row';
import { AsyncStorage } from 'react-native';

var deviceid
var wholikesme
var wholikesme2
var refresherstate

var REQUEST_URL = 'http://192.168.0.107:8000/api/v1/claims/?name=';

 export default class SearchScreen extends Component {

   _retrieveData = async () => {
     try {
       deviceid = await AsyncStorage.getItem('deviceid');
       if (deviceid !== null) {
         REQUEST_URL = 'http://192.168.0.107:8000/api/v1/claims/?name=' + deviceid
         this._fetchData();
       }
     } catch (error) {
      console.log("NO DATA");
     }
   };

   constructor(props){
   super(props);
   this.state = {
      _data: null,
      // Used for RefreshControl
      isRefreshing: false,
      demoData: [],
    }
 }
 closemyclaim(){
   NativeModules.DevSettings.reload();
 }
   /**
    * Call _fetchData after component has been mounted
    */
   componentDidMount() {
     this._retrieveData();
     setInterval(this._fetchData, 200)
   }



   /**
    * Prepare demo data for ListView component
    */
   _fetchData = () => {
     fetch(REQUEST_URL)
     .then((response) => response.json())
     .then((responseJson) => {
      data = responseJson[0]
      wholikesme = data.wholikes
      this._fetchData2();
     })
     .catch((error) =>{
      this.closemyclaim()
     });

   };




   /**
    * Prepare demo data for ListView component
    */
   _fetchData2 = () => {

     fetch("http://192.168.0.107:8000/api/v1/claims/?name=" + wholikesme )
     .then((response) => response.json())
     .then((responseJson) => {
      const filteredJson = responseJson.filter(item => item.wholikes.indexOf(deviceid) === -1);
       this.setState({
         _data: filteredJson,
         isRefreshing: false ,
       });
     })
     .catch((error) =>{
      this.closemyclaim()
     });

   }

   /**
    * Render a row
    */
   _renderRow = (claim, rowID) => {

     return (
       <Row
         // Pass movie object
         claim={claim}
         // Pass a function to handle row presses
         onPress={()=>{
           // Navigate to a separate movie detail screen
         }}
       />
     );

   }

   _update = () => {
     this.setState({
       isRefreshing: true ,
     });

     this._fetchData2
   }

   render() {
     return (
       <FlatList
         data={this.state._data}
         renderItem={({item: claim}) => { return (
           <Row
             // Pass movie object
             claim={claim}
             // Pass a function to handle row presses
             onPress={()=>{
               // Navigate to a separate movie detail screen
             }}
           />
         )}}
         ListHeaderComponent={() => <View style={{padding:20, paddingTop:37}}><Text style={{fontSize:33, fontFamily: 'Helvetica', color: 'white', letterSpacing: 1, shadowRadius: 13, shadowOpacity: 0.35, shadowColor: 'white'}}>They like you</Text></View>}
         keyExtractor={(item, index) => index}
         onRefresh={() => this._update}
         refreshing={this.state.isRefreshing}

       />
     );
   }
 }

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ListView, ActivityIndicator, RefreshControl   } from 'react-native';
import Constants from 'expo-constants';
import Row from './Row';
import { AsyncStorage } from 'react-native';

var deviceid
var wholikesme
var wholikesme2

var REQUEST_URL = 'http://192.168.0.107:8000/api/v1/claims/?name=';

 export default class SearchScreen extends Component {

   _retrieveData = async () => {
     try {
       deviceid = await AsyncStorage.getItem('deviceid');
       if (deviceid !== null) {
         REQUEST_URL = 'http://192.168.0.107:8000/api/v1/claims/?name=' + deviceid
         console.log("REQUEST_URL= " + REQUEST_URL);
         this._fetchData();
       }
     } catch (error) {
      console.log("NO DATA");
     }
   };

   constructor(props){
   super(props);
   this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
      // Used for RefreshControl
      isRefreshing: false,
      demoData: [],
    }
 }

   /**
    * Call _fetchData after component has been mounted
    */
   componentDidMount() {
     this._retrieveData();
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
      console.log(wholikesme)
      console.log(deviceid);
      this._fetchData2();
     })
     .catch((error) =>{
       console.error(error);
     });

   };




   /**
    * Prepare demo data for ListView component
    */
   _fetchData2 = () => {

     fetch("http://192.168.0.107:8000/api/v1/claims/?name=" + wholikesme )
     .then((response) => response.json())
     .then((responseJson) => {

       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(responseJson),
         // Data has been refreshed by now
         isRefreshing: false,
       });
     })
     .catch((error) =>{
       console.error(error);
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

   /**
    * Renders the list
    */
   render() {
     return (
       <ListView
         // Data source from state
         dataSource={this.state.dataSource}
         // Row renderer method
         renderRow={this._renderRow}
         renderHeader={() => <View style={{padding:20, paddingTop:37}}><Text style={{fontSize:33, fontFamily: 'Helvetica', color: 'white', letterSpacing: 1, shadowRadius: 13, shadowOpacity: 0.35, shadowColor: 'white'}}>They like you</Text></View>}
         // Refresh the list on pull down
         refreshControl={
           <RefreshControl
             refreshing={this.state.isRefreshing}
             onRefresh={this._fetchData}
           />
         }
       />
     );
   }
 }

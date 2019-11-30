import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList} from 'react-native';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Row from './RowChat';


var deviceid

 export default class MessagesScreen extends Component {

   static navigationOptions = {

   };

   constructor(props){
   super(props);
   this.state = {
      _data: null,
      isRefreshing: false,
      demoData: [],
    }
 }

   _retrieveData = async () => {
     try {
       deviceid = await AsyncStorage.getItem('deviceid');
        this._fetchData();
     } catch (error) {
      console.log("NO DATA");
     }
   };

   _fetchData = () => {
     fetch("http://192.168.0.107:8000/api/v1/chatsessions/?user1=" + deviceid + "&user2=" + deviceid)
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson)
       this.setState({
         _data: responseJson,
         isRefreshing: false ,
       });
     })
     .catch((error) =>{
        this.closemyclaim()
     });

   }

   _update = () => {
     this.setState({
       isRefreshing: true ,
     });

     this._fetchData
   }


 componentDidMount() {
   // Fetch Data
   this._retrieveData();
 }

   render() {
     return (
       <SafeAreaView style={{backgroundColor:"#131417", flex:1}}>
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
         ListHeaderComponent={() => <View style={{padding:20, paddingTop:37}}><Text style={{fontSize:33, fontFamily: 'Helvetica', color: 'white', letterSpacing: 1, shadowRadius: 13, shadowOpacity: 0.35, shadowColor: 'white'}}>You liked each other</Text></View>}
         keyExtractor={(item, index) => index}
         onRefresh={() => this._update}
         refreshing={this.state.isRefreshing}

       />
       </SafeAreaView>

     );
   }
 }

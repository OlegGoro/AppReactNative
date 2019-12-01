import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, NativeModules    } from 'react-native';
import Constants from 'expo-constants';
import Row from './Row';
import { AsyncStorage } from 'react-native';



var deviceid
var goal
var lookfor

 export default class SearchScreen extends Component {

   _retrieveData = async () => {
     try {
       deviceid = await AsyncStorage.getItem('deviceid');
       lookfor = await AsyncStorage.getItem('lookfor');
       this._fetchData();
     } catch (error) {
      console.log("NO DATA");
     }
   };

   constructor(props){
   super(props);
   this.state = {
      _data: null,
      isRefreshing: false,
      demoData: [],
    }
 }

   closemyclaim(){
     NativeModules.DevSettings.reload();
   }

   componentDidMount() {
     this._retrieveData()
     setInterval(this._fetchData, 200)
   }



   /**
    * Prepare demo data for ListView component
    */
   _fetchData = () => {
     fetch("http://192.168.0.107:8000/api/v1/claims/?iam=" + lookfor)
     .then((response) => response.json())
     .then((responseJson) => {
      const filteredJson = responseJson.filter(x => x.name !== deviceid)
      const filteredJson2 = filteredJson.filter(item => item.wholikes.indexOf(deviceid) === -1);

       this.setState({
         _data: filteredJson2,
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
   /**
    * Render a row
    */


   /**
    * Renders the list
    */
   render() {
     return (
       <FlatList
         data={this.state._data}
         renderItem={({item: claim}) => { return (
           <Row
             // Pass movie object
             claim={claim}

           />
         )}}
         ListHeaderComponent={() => <View style={{padding:20, paddingTop:37}}><Text style={{fontSize:33, fontFamily: 'Helvetica', color: 'white', letterSpacing: 1, shadowRadius: 13, shadowOpacity: 0.35, shadowColor: 'white'}}>Want to meet</Text></View>}
         keyExtractor={(item, index) => index}
         onRefresh={() => this._update}
         refreshing={this.state.isRefreshing}

       />
     );
   }
 }

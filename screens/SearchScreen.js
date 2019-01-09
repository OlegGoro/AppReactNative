import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ListView, ActivityIndicator, RefreshControl   } from 'react-native';
import { Constants } from 'expo';
import Row from './Row';


 export default class SearchScreen extends Component {

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
    * Store the data for ListView
    */

   /**
    * Call _fetchData after component has been mounted
    */
   componentDidMount() {
     // Fetch Data
     this._fetchData();
   }



   /**
    * Prepare demo data for ListView component
    */
   _fetchData = () => {
     fetch("http://192.168.1.173:8000/api/v1/claims/?iam__icontains=0")
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
   _renderRow = (movie) => {
     return (
       <Row
         // Pass movie object
         movie={movie}
         // Pass a function to handle row presses
         onPress={()=>{
           // Navigate to a separate movie detail screen
           this.props.navigator.push({
             name: 'movie',
             movie: movie,
           });
         }}
       />
     );
   }

   /**
    * Renders the list
    */
   render() {
     return (
       <ListView style={{backgroundColor:"black"}}
         // Data source from state
         dataSource={this.state.dataSource}
         // Row renderer method
         renderRow={this._renderRow}
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

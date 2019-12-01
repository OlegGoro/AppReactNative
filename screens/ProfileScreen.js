import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, NativeModules} from 'react-native';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';
import {SafeAreaView} from 'react-navigation';


var deviceid
var image
var pasteimage

const screen = Dimensions.get('window');

 export default class ProfileScreen extends Component {


   constructor(){
   super();
   this.state = {
      time: '60',
      goal: '1',
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

   closemyclaim = () => {
     NativeModules.DevSettings.reload();
   }

   _fetchData = () => {
     fetch("http://192.168.0.107:8000/api/v1/claims/?name=" + deviceid )
     .then((response) => response.json())
     .then((responseJson) => {
       data = responseJson[0]
       image = data.image
       esttime = Math.round (data.esttime)

       if (image !== null ) {
       test = image.split('/').slice(9,10);
       pasteimage = "http://192.168.0.107:8000/static/media/" + test
       console.log(pasteimage);
       } else {
         pasteimage = "https://doc.louisiana.gov/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
       }
       this.setState({
         time: esttime,
       });
       if (data.goal == 1){
         this.setState({
           goal: "Looking for sex",
         });
       } else {
         this.setState({
           goal: "Looking for talk",
         });
       }
     })
     .catch((error) =>{
       this.closemyclaim()
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

        <View style={{padding:20, paddingTop:37}}><Text style={{fontSize:33, fontFamily: 'Helvetica', color: 'white', letterSpacing: 1, shadowRadius: 13, shadowOpacity: 0.35, shadowColor: 'white'}}>My entire</Text></View>

       <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 15}}>

         <View style={styles.block}>
           <View style={{paddingRight: 10, paddingTop: 10, paddingBottom:10, paddingLeft:10}}>
             <Text style={{color: "white", fontSize: 18, textAlign: 'left', alignSelf: 'flex-start'}}> {this.state.goal} </Text>
           </View>
           <View ></View>
               <ImageBackground
                 source={{uri: pasteimage}}
                 style={styles.imageBackground}
                 >
                 <View style={{flex: 6}}>
                 </View>
                   <View style={{position: 'absolute', bottom: -30, left: 0, right: 0}}>
                     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                       <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
                       </View>
                       <View style={{flex:4, alignItems: 'center', justifyContent: 'center'}}>
                       <TouchableOpacity onPress={this._addlike}>
                         <Image source={require("./Cross.png")} style={{ width: 35, height: 35}}   />
                         </TouchableOpacity>
                       </View>
                       <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
                       </View>
                     </View>
                   </View>
                 </ImageBackground>
               <View style={{flex: 2, padding: 15, paddingTop: 45}}><Text style={{color:'white', fontFamily: 'Helvetica', fontSize:15,}}>Attention Social Media Geeks! @garyvee is an absolute #MustFollow on Twitter! @AskAaronLee @PostPlanner http://bit.ly/1tvyiv6</Text></View>
             </View>
           </View>

       <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
         <View style={styles.miniblock}>
           <Text style={{color: "white", fontSize: 33}}>{this.state.time} minutes left</Text>
         </View>
       </View>

       </SafeAreaView>
     );
   }
 }

 const styles = StyleSheet.create({
   // Row
   row: {
     padding: 20,                   // Add padding at the bottom
   },
   // Background image
   imageBackground: {
     flex: 8,         // Divide screen height by 3
     justifyContent: 'center',           // Center vertically
     alignItems: 'stretch',
   },
   block: {
     height: screen.height / 1.7,          // Divide screen height by 3
     justifyContent: 'center',           // Center vertically
     alignItems: 'stretch',
     borderRadius: 5,
     shadowOpacity: 0.8,
     shadowRadius: 10,
     shadowColor: 'black',
     shadowOffset: { height: 7, width: 0 },   // Center horizontally
     backgroundColor: '#202329',

   },
   miniblock: {
     padding: 20,
     justifyContent: 'center',           // Center vertically
     alignItems: 'center',
     borderRadius: 5,
     shadowOpacity: 0.8,
     shadowRadius: 10,
     shadowColor: 'black',
     shadowOffset: { height: 7, width: 0 },   // Center horizontally
     backgroundColor: '#202329',

   },
   // Shared text style
   text: {
     color: '#fff',                      // White text color
     backgroundColor: 'transparent',     // No background
     fontFamily: 'Avenir',               // Change default font
     fontWeight: 'bold',                 // Bold font
     // Add text shadow
     textShadowColor: '#222',
     textShadowOffset: { width: 1, height: 1 },
     textShadowRadius: 4,
   },
   // Movie title
   title: {
     fontSize: 22,                       // Bigger font size
   },
   // Rating row
   rating: {
     flexDirection: 'row',               // Arrange icon and rating in one line
   },
   // Certified fresh icon
   icon: {
     flex: 1,     // Set height
                     // Add some margin between icon and rating
   },
   // Rating value
   value: {
     fontSize: 16,                       // Smaller font size
   },
 });

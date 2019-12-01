import React from 'react';
import { Button, ImageBackground , View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ImagePicker } from 'expo';
import { Constants } from 'expo';
import { ButtonGroup } from 'react-native-elements';
import { StackActions, NavigationActions, SafeAreaView } from 'react-navigation'; // Version can be specified in package.json
import { AsyncStorage } from 'react-native';


import "@expo/vector-icons";

export default class HelloScreen extends React.Component {

  _nextscreen = () => {
    this.props.navigation.navigate('Welcome');
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('firstlaunch', "1");
      this.props.navigation.navigate('Welcome');
    } catch (error) {
      // Error saving data
    }
  };
  _check = async () => {
    try {
      firstlaunch = await AsyncStorage.getItem('firstlaunch');
      if (firstlaunch == 1) {
        this._nextscreen()
      }
    } catch (error) {
      // Error saving data
    }
  };
  componentDidMount() {
    this._check();
  }

  render(){
    return (
      <SafeAreaView style={{backgroundColor:"black", flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 0}}>
          <Text style={{color: "white", fontSize: 55, letterSpacing: 5, fontWeight: 'bold'}}>FEELS</Text>
          <Text style={{color: "white", fontSize: 28, paddingTop:18}}>Find a person for meeting right now. No dead profiles.</Text>

        </View>
        <ImageBackground  source={require("../assets/first_screen_background.png")}  style={{marginTop: 0, flex: 1}} >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
            <TouchableOpacity style={{padding:15, height: 60, backgroundColor: 'white', borderRadius:100, width: 320}} onPress={this._storeData}>
             <Text style={{fontSize:22, color: 'black', textAlign: 'center'}}>Next</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground >
      </View>
      </SafeAreaView>
    );
  }
}

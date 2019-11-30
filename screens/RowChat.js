import React, { Component } from 'react';
import {
  Image,              // Renders background image
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Handles row presses
  View,
  ImageBackground,
  Dimensions,             // Container component
} from 'react-native';
import { AsyncStorage } from 'react-native';

// Detect screen size to calculate row height
const screen = Dimensions.get('window');
var deviceid;
var myname

export default class Row extends Component {



  _retrieveData = async () => {
    try {
      deviceid = await AsyncStorage.getItem('deviceid');
      console.log("DATA" + deviceid);
    } catch (error) {
     console.log("NO DATA");
    }
  };



componentDidMount() {
  // Fetch Data
  this._retrieveData();
}

  // Extract movie and onPress props passed from List component
  render({ claim } = this.props) {
    // Extract values from movie object
    const {users} = claim;
    chatusers = users;

  return (
      <View style={{flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 15, paddingBottom: 12}}>
        <View style={styles.block}>
          <View style={{flex: 1}}></View>
              <View style={{flex: 2, padding: 15, paddingTop: 45}}><Text style={{color:'white', fontFamily: 'Helvetica', fontSize:15,}}>Тестовый чат открыт</Text></View>
            </View>
          </View>

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
    flex: 2,         // Divide screen height by 3
    justifyContent: 'center',           // Center vertically
    alignItems: 'stretch',
  },
  block: {
    height: screen.height / 1.4,          // Divide screen height by 3
    justifyContent: 'center',           // Center vertically
    alignItems: 'stretch',
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

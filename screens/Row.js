import React, { Component } from 'react';
import {
  Image,              // Renders background image
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Handles row presses
  View,
  ImageBackground,              // Container component
} from 'react-native';
import Dimensions from 'Dimensions';

// Detect screen size to calculate row height
const screen = Dimensions.get('window');

export default class Row extends Component {

  // Extract movie and onPress props passed from List component
  render({ movie, onPress } = this.props) {
    // Extract values from movie object
    const {image} = movie;
    if (image !== null ) {
    test = image.split('/').slice(9,10);
    pasteimage = "http://192.168.1.173:8000/static/media/" + test
  } else {
    pasteimage = "https://doc.louisiana.gov/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
  }
  return (
      <View style={{flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 15, paddingBottom: 15}}>
            <ImageBackground imageStyle={{ borderRadius: 12 }}
              source={{uri: pasteimage}}
              style={styles.imageBackground}
              >
              <View style={{flex: 6}}>
              </View>
              <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', padding: 20}}>
              <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require("./Cross.png")} style={{ width: 35, height: 35 }} />
              </View>
              <View style={{flex:4, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require("./LikeIcon.png")} style={{ width: 65, height: 65 }} />
              </View>
              <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require("./km.png")} style={{ width: 35, height: 35 }} />
              </View>
              </View>
              </ImageBackground>
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
    height: screen.height / 2,          // Divide screen height by 3
    justifyContent: 'center',           // Center vertically
    alignItems: 'stretch',
    shadowRadius: 7,
    borderRadius: 12,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowColor: 'white',
    shadowOffset: { height: 7, width: 0 },   // Center horizontally
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

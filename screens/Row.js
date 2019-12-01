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
var myname;
var claimgoal;
var distance;
var lat2;
var lon2;

export default class Row extends Component {

  distance  =  (lat1,lon1,lat2,lon2) => {
  	var R = 6371; // km (change this constant to get miles)
  	var dLat = (lat2-lat1) * Math.PI / 180;
  	var dLon = (lon2-lon1) * Math.PI / 180;
  	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
  		Math.sin(dLon/2) * Math.sin(dLon/2);
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  	var d = R * c;
  	if (d>1) return Math.round(d)+"km";
  	else if (d<=1) return Math.round(d*1000)+"m";
  	return d;
  }



  _retrieveData = async () => {
    try {
      deviceid = await AsyncStorage.getItem('deviceid');
      longitude = await AsyncStorage.getItem('longitude');
      latitude = await AsyncStorage.getItem('latitude');
      distance = this.distance(latitude, longitude, lat2, lon2);
      this.setState({
        distance: distance,
      });
      if (claimgoal == 1){
        this.setState({
          goal: "Looking for sex",
        });
      } else {
        this.setState({
          goal: "Looking for talk",
        });
      }
    } catch (error) {
     console.log("NO DATA");
    }
  };

  constructor(){
  super();
  this.state = {
     goal: '1',
     distance: '5',
   }
  };

componentDidMount() {
  // Fetch Data
  this._retrieveData();
}

  // Extract movie and onPress props passed from List component
  render({ claim } = this.props) {
    // Extract values from movie object
    const {name, image, lookfor, lat, lon, goal} = claim;
    myname = name;
    claimgoal = goal;
    lat2 = lat;
    lon2 = lon;
    if (image !== null ) {
    test = image.split('/').slice(9,10);
    pasteimage = "http://192.168.0.107:8000/static/media/" + test
  } else {
    pasteimage = "https://doc.louisiana.gov/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
  }

  return (
      <View style={{flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 15, paddingBottom: 12}}>
        <View style={styles.block}>
        <View style={{paddingRight: 10, paddingTop: 10, paddingBottom:10, paddingLeft:10, flexDirection: 'row', alignContent: 'space-between'}}>
          <Text style={{color: "white", fontSize: 18, textAlign: 'left', alignSelf: 'flex-start'}}> {this.state.distance} /</Text>
          <Text style={{color: "white", fontSize: 18, textAlign: 'right', alignSelf: 'flex-end'}}>  {this.state.goal}  </Text>
        </View>
          <View></View>
              <ImageBackground
                source={{uri: pasteimage}}
                style={styles.imageBackground}
                >
                <View style={{flex: 6}}>
                </View>
                  <View style={{position: 'absolute', bottom: -30, left: 0, right: 0}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                      <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require("./Cross.png")} style={{ width: 35, height: 35 }} />
                      </View>
                      <View style={{flex:4, alignItems: 'center', justifyContent: 'center', shadowRadius: 10, shadowOpacity: 0.2, shadowColor: '#fcefef'}}>
                      <TouchableOpacity onPress={this._addlike}>
                        <Image source={require("./LikeIcon.png")} style={{ width: 70, height: 70}}   />
                        </TouchableOpacity>
                      </View>
                      <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require("./km.png")} style={{ width: 35, height: 35 }} />
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              <View style={{flex: 2, padding: 15, paddingTop: 45}}><Text style={{color:'white', fontFamily: 'Helvetica', fontSize:15,}}>Attention Social Media Geeks! @garyvee is an absolute #MustFollow on Twitter! @AskAaronLee @PostPlanner http://bit.ly/1tvyiv6</Text></View>
            </View>
          </View>

    );
  }

  _addlike = async () => {
      const data = new FormData();
      data.append("MyName", deviceid)
      data.append("ClaimName", myname)
      fetch("http://192.168.0.107:8000/api/v1/addlike/", {
        method: "PUT",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }).then(res => {
  console.log(res)
});
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

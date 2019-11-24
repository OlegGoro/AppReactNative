import React from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { ButtonGroup } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json




import "@expo/vector-icons";

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};

var deviceid = makeid(5);

export default class SearchScreen extends React.Component {



  state = {
    image: "https://facebook.github.io/react/logo-og.png",
    index: 0,
    index2: 0,
    index3: 0,
    index4: deviceid,
    buttonstate: 0,
    textbutton: "UPLOAD PHOTO",
    location: null,
    errorMessage: null
  }

  updateIndex = (index) => {
    this.setState({index})
  }
  updateIndex2 = (index2) => {
    this.setState({index2})
  }
  updateIndex3 = (index3) => {
    this.setState({index3})
  }


  render() {
    photo_is_chosen = 0;
    let { image } = this.state;
    const { selectedIndex } = this.state
    return (

      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}}>
        {image &&
          <Image source={{ uri: image }} style={{ flex: 1 }} />}

        </View>
        <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: 320, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: "white", fontSize:15, margin: 7}}>I AM</Text>
              <ButtonGroup
                selectedBackgroundColor="pink"
                onPress={this.updateIndex}
                selectedIndex={this.state.index}
                buttons={['Woman', 'Man']}
                containerStyle={styles.containerStyle}
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                selectedButtonStyle={styles.selectedButtonStyle}
                innerBorderStyle={{width: 0, color: "white"}}
                selectedTextStyle={styles.selectedTextStyle}
                 />
            </View>
            <View style={{width: 320, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: "white", fontSize:15, margin: 7}}>LOOKING FOR</Text>
              <ButtonGroup
                selectedBackgroundColor="pink"
                onPress={this.updateIndex2}
                selectedIndex={this.state.index2}
                buttons={['Woman', 'Man']}
                containerStyle={styles.containerStyle}
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                selectedButtonStyle={styles.selectedButtonStyle}
                innerBorderStyle={{width: 0, color: "white"}}
                selectedTextStyle={styles.selectedTextStyle}
                 />
            </View>
            <View style={{width: 320, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: "white", fontSize:15, margin: 7}}>GOAL</Text>
              <ButtonGroup
                selectedBackgroundColor="pink"
                onPress={this.updateIndex3}
                selectedIndex={this.state.index3}
                buttons={['Talk', 'Sex']}
                containerStyle={styles.containerStyle}
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                selectedButtonStyle={styles.selectedButtonStyle}
                innerBorderStyle={{width: 0, color: "white"}}
                selectedTextStyle={styles.selectedTextStyle}
                 />
            </View>
          </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.buttonStyle2} onPress={this._pickImage}>
               <Text style={styles.textStyle}>{this.state.textbutton}</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>

    );
  }


  _pickImage = async () => {
    if (photo_is_chosen == 0) {

      const { status: cameraPermission } = await Permissions.askAsync(Permissions.CAMERA);
      const { status: cameraRollPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (cameraPermission === 'granted' && cameraRollPermission === 'granted') {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.setState({ textbutton: "NEXT" });
        photo_is_chosen = 1;
      }
    }
  } else {

    const { status: locationPermission } = await Permissions.askAsync(Permissions.LOCATION)
    if (locationPermission == 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      longitude = location.coords.longitude;
      latitude = location.coords.latitude;

      const data = new FormData();
      data.append("name", this.state.index4)
      data.append("goal", this.state.index3)
      data.append("lookfor", this.state.index2)
      data.append("lat", latitude)
      data.append("lon", longitude)
      data.append("esttime", 1500)
      data.append("iam", this.state.index)
      data.append('image', );
      data.append("image", {uri: result.uri, name: "avatar.jpg", type: 'multipart/form-data'})
      fetch("http://192.168.0.107:8000/api/v1/addclaim/", {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }).then(res => {
  console.log(res)
});




    } else {
      alert ("Sorry. You need give location permissions")
    }


    this.props.navigation.navigate('Dashboard');
  }
}
}

const styles = StyleSheet.create({
  textStyle: {
  fontSize:20,
  color: 'black',
  textAlign: 'center'
  },

  buttonStyle2: {
  padding:15,
  height: 60,
  backgroundColor: 'white',
  borderRadius:100,
  width: 320,
},
    containerStyle: {
        height: 35,
        width: '100%',
        // borderTopRightRadius: 20,
        borderWidth: 1,
        backgroundColor: "black",
        marginTop: 0,
        borderRadius: 100
    },
    buttonStyle: {
        backgroundColor: "black",
        borderWidth: 0,
    },
    selectedButtonStyle: {
        backgroundColor: "white",
    },
    selectedTextStyle: {
       color: "black"
    }
});

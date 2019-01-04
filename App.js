import React from 'react';
import { StyleSheet, Text, View, Picker, Button, ScrollView, CameraRoll, PermissionsAndroid  } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     images: [],
     isCameraLoaded: false
    };
  }

  componentWillMount() {
    CameraRoll.getPhotos({first: 5}).then(
      (data) =>{
        const assets = data.edges;
        const images = assets.map((asset) => asset.node.image);
        this.setState({
          isCameraLoaded: true,
          images: images
        })
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  render() {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': 'Cool Photo App Camera Permission',
            'message': 'Cool Photo App needs access to your camera ' +
                       'so you can take awesome pictures.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera")
        } else {
          console.log("Camera permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
    requestCameraPermission();
      if (!this.state.isCameraLoaded) {
        return (
          <View>
            <Text>Loading ...</Text>
          </View>
          );
      }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.imageGrid}>
            { this.state.images.map((image) => <Image style={styles.image} source={{ uri: image.uri }} />) }
          </View>
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

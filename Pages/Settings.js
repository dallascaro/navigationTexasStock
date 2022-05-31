import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, SafeAreaView, FlatList, ScrollView,Image, Alert, ActivityIndicator, Share, Modal, Pressable,  TouchableOpacity, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { async } from '@firebase/util';

import RNPickerSelect from 'react-native-picker-select';
import { TextInput } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';


const Settings = () => {

  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');

  const [dimensions, setDimensions] = useState({window, screen});

  const [image, setImage] = useState(null);

  const  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    this.setState({ uploading: true });
    firebase
      .storage()
      .ref(`TestPictures/${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: '',
              progress: 0,
              images: allImages
            };
            AsyncStorage.setItem('images', JSON.stringify(allImages));
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        }
      );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage3 = async () => {
    console.log("Entered Upload Image");
    console.log(image.name);
      const imageRef =ref(storage,`assests/ProfilePicture/${image.name}`)
      uploadBytes(imageRef, image);
      console.log("Image Uploaded");
  }

  useEffect(() => {
    const screenSize = Dimensions.addEventListener(
      "change",
      ({window, screen}) => {
        setDimensions({window, screen});
      }
    );
    console.log(dimensions);
    return () => screenSize?.remove();
    
  })

  return (

    <View style={styles.container}>

      <View style  = {styles.headBannerEvents}>
          <View style = {styles.companyNamePlacement}>
        <Image style = {styles.profileCar} source = {require('../assets/CompanyLogo/TXStockRally.jpg')}/>
        </View>
        </View>

      <View>
        <Text>Notifications</Text>

        <Text>Privacy</Text>

       <Text>Help</Text>

       <Text>About</Text>

       <Text>Theme</Text>

      </View>

    <View>
     <TextInput>First Name</TextInput>
     <TextInput>Last Name</TextInput>
     <TextInput>Date of Birth</TextInput>
     <TextInput>Mobile Number</TextInput>
     <TextInput>Vehicle</TextInput>
     <TextInput>Year</TextInput>
     <TextInput>Model</TextInput>
     <TextInput>Modifications</TextInput>

     <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an image from camera roll</Text>
          </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage3}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage3}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
     
    </View>
  
  </View>
  );
}

  export default Settings;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#C4C4C4',
    },
    listView: {
      flex: 1,
      justifyContent: 'space-between',
      paddingRight: 10
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    listCategories: {
      backgroundColor: 'red'
    },
    listData: {
      backgroundColor: 'green'
    },
    title: {
      fontSize: 20
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 16,
    },
    headBanner: {
      flex: 1,
      width: 400,
      backgroundColor: '#222222',
      marginBottom: 200
    },
    headBannerEvents: {
      flex: .3,
      width: 400,
      backgroundColor: '#222222',
    },
    eventBanner: {
      flex: .2,
      width: 400,
      backgroundColor: '#C4C4C4',
      flexDirection: 'row'
    },
    companyName: {
      color: 'white',
      fontFamily: 'serif',
      fontSize: 35
    },
    companyNamePlacement: {
      paddingLeft: 60,
      paddingTop: 15
    },
    localEvents: {
      color: 'white',
      fontFamily: 'serif',
      fontSize: 20
    },
    eventName: {
      color: '#000000',
      fontFamily: 'serif',
      fontSize: 20,
    },
    cityView: {
      flexDirection: 'row'
    },
    eventText: {
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: 'sans-serif'
    },
    eventsProfilePost: {
      flexDirection: 'row'
    },
    picContentView: {
      flex: 2
    },
    carPics: {
      width: 400
    },
    profileCarView: {
      flex: 1
  
    },
    profileCar: {
      height: 200,
      width: 400
    },
    profilePictureView: {
      flex: .8,
      width: 400,
      backgroundColor: '#C4C4C4'
  
    },
    profilePicture: {
      height: 100,
      width: 100,
      borderRadius: 100/2
    },
    profileNamePictureView:{
        marginLeft: 150
    },
    profileOptionsView : {
      flexDirection: 'row',
      justifyContent: 'space-between',
     
    },
    profileSelection: {
      
    },
    eventsProfilePicture: {
      height: 50,
      width: 50,
      borderRadius: 50/2
    },
    eventsUserName: {
      fontSize: 25
    },
    eventFeed: {  
      flex: 1.4
    },
    eventDetails: {
  
    },
    carLoad: {
      backgroundColor: '#C4C4C4'
    },
    eventInfo: {
      backgroundColor: '#C4C4C4'
    },
    eventButton: {
      flex: .5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    choicesButton : {
      
    },
  
    signUpLogin: {
     flex: 1,
     marginTop: 100
    },
    loginInput: {
      backgroundColor: '#C9C9C9',
      color: '#000000',
      height: 40,
      width: 200,
    },
    loginButton: {
     flex: .5,
     flexDirection: 'row',
     marginTop: 100,
     justifyContent: 'space-between',
    },
    signUpButtonView: {
    paddingRight: 20,
    paddingBottom: 20,
    height: 100
    },
    localEventsInput: {
      backgroundColor: '#EFEEEE',
      color: '#000000',
      height: 51,
      width: 150,
      padding: 10
    },
    stateView: {
      marginTop: 30
      
    },
    footerContent: {
      flex: 2,
      height: 50,
      width: 400,
    },
    footerName: {
      color: 'white',
      fontSize: 25,
      paddingLeft: 120
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
    }
  });
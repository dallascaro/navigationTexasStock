import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, FlatList, Share, Modal, Pressable,  TouchableHighlight, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';

import RNPickerSelect from 'react-native-picker-select';

import { db, writeUserData } from "../firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import {windowHeight, windowWdith} from '../Utils/Dimensions';

const Events = ({navigation, item}) => {

  const window = Dimensions.get('screen').width;
  const screen = Dimensions.get('screen').height;

  const [dimensions, setDimensions] = useState({window, screen});

  const[userComment, setComment] = React.useState("Comment");

  const[userReport, setReport] = React.useState("Report");

  const[userEvent, setEvent] = React.useState("Event");

  const [city, setCity] = React.useState("City");
  const [state, setState] = React.useState("State");

  const [events, setEvents] = React.useState(null);

  const [userEmail, setEmail] = useState([]);

  const [eventPageNum] = React.useState(1);

  
  
  const PullLocations= async () => {
    //console.log("Location for data", location);
    const myDocLocation = collection(db, `Locations/States/${state}/${city}/Business/`)
    const snapShotLocation = await getDocs(myDocLocation);
    const snapListLocation = snapShotLocation.docs.map(doc => doc.data());
    setEvents(snapListLocation)
    //console.log(snapListLocation);
   // console.log("Location Events", events)
  }


  const goingToEvent = async () => { 
    // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Users Going Events"), {
  username: "Dallas",
  event: userEvent
});

console.log("Document written with ID: ", docRef.id);

  }

  const interestedInEvent = async () => { 
    // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Users Interested Events"), {
  username: "Jeremy",
  event: userEvent
});

console.log("Document written with ID: ", docRef.id);

  }


  const renderItem = ({ item }) => {
    return(
      <View style = {styles.eventsBackground}>
        <View style = {styles.eventsProfilePost}>
        <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
          <Text style = {styles. eventsUserName}>{item.username}</Text>
        </View>
      <Image style = {styles.carPics} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image>{item.url}</Image>
        <Text>{item.eventPic}</Text>

      

        <View  style = {styles.eventRender}>
        <Text style = {styles.eventText}>{item.businessName}</Text>
        </View>

        <View style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.address}</Text>
        </View>
       
        <View style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.link}</Text>
        </View>

        <View style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.email}</Text>
        </View>

        <View style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.phoneNumber}</Text>
        </View>

        <TouchableHighlight onPress={() => 
          navigation.navigate("Products", {
            address: item.address,
            businessName: item.businessName,
            email: item.email,
            link: item.link,
            phoneNumber: item.phoneNumber,
            state: state,
            city: city
          })
          }>
                  <View style={styles.goingButton}>
                    <Text style={styles.comment}>View Products</Text>
                  </View>
                </TouchableHighlight>
      </View>
    )
  }
 
  
    const [modalVisible, setModalVisible] = useState(false);
  
    const onShare = async (item) => {
      try {
        const result = await Share.share({
          message:
            'Check out this cool event!',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    
    return(
      <View  style = {styles.container} >

                <Image style = {styles.profileCar} source = {require('../assets/CompanyLogo/TXStockRally.jpg')}/>
      
          <Text style = {styles.eventName}>Local Events</Text>

            <View style = {styles.selection}>
            <TextInput style = {styles.selectionInput}
              onChangeText= {setState}>State</TextInput>
              <TextInput style = {styles.selectionInput}
                onChangeText= {setCity}>City</TextInput>
                <Button
            title='Call'
            onPress={PullLocations}></Button>
            </View>
          
              <Text style = {styles.locationName}>{city}{state}</Text>
          
            <FlatList style = {{ width: window, height: '100%'}}
              data = {events}
              renderItem = {renderItem}
              keyExtractor = {(idx) => idx.description}
              />
      </View>
    );
    
  }

  export default Events;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerView: { 
      flex: 1,
      backgroundColor: '#C4C4C4',
     },
    scroller: {
      backgroundColor: 'white'
    },
    selection:{
      flexDirection: 'row',
      backgroundColor: 'gray',
    },
    selectionInput:{
      width: 100,
      marginRight: 15
    },
    comment: {
        paddingLeft: 150,
        color: '#000000'
    },
    goingButton: {
      backgroundColor: '#D8232F',
      height: 30,
      borderRadius: 10,
    },
    interestedButton: {
      backgroundColor: '#FFFF00',
      height: 30,
      borderRadius: 10,
    },
    shareButton: {
      backgroundColor: '#00FF00',
      height: 30,
      borderRadius: 10
    },
    buttonText: {
      color: '#000000'
    },
    userInfo: {
      marginLeft: 100,
  },
  eventDetails: {
    flex: 1
  },
  events: {
    flex: 1
  },
  eventAppearance: {
    flexDirection: 'row'
  },
    headBanner: {
      flex: 1,
      width: 400,
      backgroundColor: '#222222',
    },
    headBannerEvents: {
      flex: .15,
      width: '100%',
      backgroundColor: '#222222',
    },
    eventBanner: {
      flex: 1,
      marginBottom: 100,
      width: 400,
      flexDirection: 'row'
    },
    Logo: {
      width: 400,
      height: 100,
    },
    companyName: {
      color: 'white',
      fontFamily: 'serif',
      fontSize: 35
    },
    companyNamePlacement: {
      paddingTop: 50
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
    locationName: {
      fontWeight: "bold",
      fontSize: 20,
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
      height: 150,
      width: 400
    },
    profilePictureView: {
      flex: 1,
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
    eventRender: {
      flexDirection: 'row'
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
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, FlatList, Share, Modal, Pressable,  TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';

import RNPickerSelect from 'react-native-picker-select';

import { db, writeUserData } from "../firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore/lite";

const Events = ({navigation}) => {

  const[userComment, setComment] = React.useState("Comment");

  const[userReport, setReport] = React.useState("Report");

  const[userEvent, setEvent] = React.useState("Event");

  const [location, setLocation] = React.useState("Location");

  const [locations, setLocations] = React.useState("Locations");

  const [userEmail, setEmail] = useState([]);

  const [eventList, setEventList] = useState([]);
  const [goingList, setGoingList] = useState([]);
  const [interestedList, setInterestedList] = useState([]);

  const [eventPageNum] = React.useState(1);

   //Call when component is rendered
   useEffect(() => {
    PullData();
    PullUserEmail();
  }, []);

  const renderUserEmail = ({ item }) => {
    return(
      <View>
        <Text>{item.email}</Text>
        <Text>{item.user_id}</Text>
      </View>
    )
  }

  const PullData = async () => {
    const myDoc = collection(db, 'Users Events')
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEventList(snapList)

    const goingMyDoc = collection(db, 'Users Going Events')
    const goingSnapShot = await getDocs(goingMyDoc);
    const goingSnapList = goingSnapShot.docs.map(doc => doc.data());
    setGoingList(goingSnapList)

  }

  const PullLocations= async () => {
    const myDoc = collection(db, "Locations")
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setLocations(snapList)
    console.log(snapList);
  }

  const PullUserEmail = async () => {
    const myDoc = collection(db, "UserIDs")
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEmail(snapList)
    console.log(snapList);
  }

  const reportContent = async () => { 
    // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Reported Events"), {
  eventName: "Event",
  user: userReport
});

console.log("Document written with ID: ", docRef.id);

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

        <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(modalVisible);
                }}
              >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
               
                <Text style = {styles.eventText}>{item.title}</Text>
                <Text style = {styles.eventText}>{item.date}</Text>
                <Text style = {styles.eventText}>{item.time}</Text>
                
                <Text style = {styles.eventText}>{item.username}</Text>
                  <Text style={styles.modalText}>Enter Why this content is being reported</Text>
                    <TextInput 
                     onChangeText = {setReport}>Enter Text</TextInput>

          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
                 <Button
                  title="Report!"
                  color='#D8232F'
                  onPress={reportContent}
                />
              <Text style={styles.textStyle}>End Report</Text>
            </Pressable>
                  
                

                </View>
              </View>
            </Modal>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Report Content</Text>
             
            </Pressable>

        <View  style = {styles.eventRender}>
        <Text style = {styles.eventText}>{item.title}</Text>
        </View>

        <View style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.date}</Text>
          <Text style = {styles.eventText}>{item.time}</Text>
        </View>
       
        <View style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.address}</Text>
          <Text style = {styles.eventText}>{item.city}</Text>
          <Text style = {styles.eventText}>{item.state}</Text>
        </View>

        <View style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.description}</Text>
          <Text style = {styles.eventText}>{item.username}</Text>
        </View>

        <Button
                  title="Comment!"
                  color='#D8232F'
                  onPress={() => navigation.navigate("Comments")}
                />


        <View style = {styles.eventButton}>

        <TouchableHighlight onPress={goingToEvent}>
                  <View style={styles.goingButton}>
                    <Text style={styles.buttonText}>Going To Event</Text>
                  </View>
                </TouchableHighlight>

        <TouchableHighlight onPress={interestedInEvent}>
                  <View style={styles.interestedButton}>
                    <Text style={styles.buttonText}>Interested</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={onShare}>
                  <View style={styles.shareButton}>
                    <Text style={styles.buttonText}>Share Event!</Text>
                  </View>
                </TouchableHighlight>

            </View>

      </View>
    )
  }
 
  
    const [modalVisible, setModalVisible] = useState(false);
  
    const onShare = async () => {
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
      <View  style = {styles.container}  >
        <View style  = {styles.headBannerEvents}>
          <View style = {styles.companyNamePlacement}>
        <Image style = {styles.profileCar} source = {require('../assets/CompanyLogo/TXStockRally.jpg')}/>
        </View>
        </View>
    
        <View style = {styles.headerView}>
       
     
        <Text style = {styles.eventName}>Local Events</Text>

        <View style = {styles.cityView}> 
           <TextInput style = {styles.localEventsInput}
          placeholder='Enter City Name'>
            City</TextInput>
            <TextInput style = {styles.localEventsInput}
          placeholder='Enter State Name'>
            State</TextInput>
          </View>

        <RNPickerSelect style={styles.scroller}
            onValueChange={
              (value) => setLocation(value)
            }
            items={[
                { label: 'Midland, Texas', value: 'Midland Texas' },
                { label: 'Odessa, Texas', value: 'Odessa Texas' },
                { label: 'Andrews, Texas', value: 'Andrews Texas' },
                { label: 'Monahans, Texas', value: 'Monahans Texas' },
                { label: 'Big Spring, Texas', value: 'Big Spring Texas' },
                { label: 'Fort Stockton, Texas', value: 'Fort Stockton Texas' },
                { label: 'El Paso, Texas', value: 'El Paso Texas' },
                { label: 'Seminole, Texas', value: 'Seminole Texas' },
                { label: 'San Angelo, Texas', value: 'San Angelo Texas' },
                { label: 'Abilene, Texas', value: 'Abilene Texas' },
                { label: 'Amarillo, Texas', value: 'Amarillo Texas' },
                { label: 'San Antonio, Texas', value: 'San Antonio Texas' },
                { label: 'Austin, Texas', value: 'Austin Texas' },
                { label: 'Houston, Texas', value: 'Houston Texas' },
                { label: 'Dallas, Texas', value: 'Dallas Texas' },
                { label: 'Fort Worth, Texas', value: 'Fort Worth Texas' },
                { label: 'Corpus Christi, Texas', value: 'Corpus Christi Texas' },
            ]}
        />
          

          <View style = {styles.locationView}>
          <Text style = {styles.locationName}>{location}</Text>
          </View>
        
        <ScrollView style = {styles.eventDetails} contentContainerStyle={{paddingBottom: 50}}>
            <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {goingList}
              renderItem = {renderItem}
              />
          </ScrollView>
        
        </View>
        
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
      backgroundColor: '#C4C4C4',
      marginTop: 100
     },
    scroller: {
      backgroundColor: 'white'
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
    flex: 1,
    backgroundColor: '#C4C4C4'
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
      flex: 1,
      width: 400,
      marginBottom: 100,
      backgroundColor: '#222222',
    },
    eventBanner: {
      flex: .2,
      marginBottom: 150,
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
    locationView: {
      paddingLeft: 125
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
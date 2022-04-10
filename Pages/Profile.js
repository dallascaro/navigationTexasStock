import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, Share, Modal, Pressable, TouchableHighlight} from 'react-native';
//import {Picker} from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import {getDownloadURL} from "firebase/storage";
import { db, pathReference2, profilePicRef, jeremyPic} from "../firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore/lite";
// To pick the file from local file system
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
import { async } from '@firebase/util';



const Profile = ({navigation}) => {

  const [eventList, setEventList] = useState([]);
  const [goingList, setGoingList] = useState([]);
  const [interestedList, setInterestedList] = useState([]);
  const [userEmail, setEmail] = useState([]);


  const PullData = async () => {
    const myDoc = collection(db, 'Users Events')
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEventList(snapList)

    const goingMyDoc = collection(db, 'Users Going Events')
    const goingSnapShot = await getDocs(goingMyDoc);
    const goingSnapList = goingSnapShot.docs.map(doc => doc.data());
    setGoingList(goingSnapList)

    const intestedMyDoc = collection(db, 'Users Intersted Events')
    const intestedSnapShot = await getDocs(intestedMyDoc);
    const interestedSnapList = intestedSnapShot.docs.map(doc => doc.data());
    setInterestedList(interestedSnapList)
  }

  const PullUserEmail = async () => {
    const myDoc = collection(db, "UserIDs")
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEmail(snapList)
    console.log(snapList);
  }


    //Call when component is rendered
    useEffect(() => {
      PullData();
    }, []);

    const renderUserEmail = ({ item }) => {
      return(
        <View>
          <Text>{item.email}</Text>
          <Text>{item.user_id}</Text>
        </View>
      )
    }

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
        <View>

          <Image>{item.url}</Image>
          <Text>{item.eventPic}</Text>

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

          <View style = {styles.eventButton}>

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

    return(
      <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">

        <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
        
        <ScrollView>
        <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {userEmail}
              renderItem = {renderUserEmail}
              />
        </ScrollView>
        <Button
                    title="UserData!"
                    color='#17E217'
                    onPress={PullUserEmail}
                    
                  />
        <Text>Attending</Text>
        
        </View>
        
        <ScrollView style = {styles.eventDetails}>
          <View>
            <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {goingList}
              renderItem = {renderItem}
              />
          </View>

          </ScrollView>
      </View>

      <View key="2">
      <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
        <ScrollView>
        <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {userEmail}
              renderItem = {renderUserEmail}
              />
        </ScrollView>
            <Text>Interested</Text>
        </View>

        <ScrollView style = {styles.eventDetails}>
          <View>
            <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {interestedList}
              renderItem = {renderItem}
              />
          </View>

          </ScrollView>
       
       
      </View>

      <View key="3">
      <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
        <ScrollView>
        <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {userEmail}
              renderItem = {renderUserEmail}
              />
        </ScrollView>
        </View>

        

<Button
                    title="Create Event!"
                    color='#17E217'
                    onPress={() => navigation.navigate("CreateEvent")}
                    
                  />

<ScrollView style = {styles.eventDetails}>
          <View>
            <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {eventList}
              renderItem = {renderItem}
              />
          </View>

          </ScrollView>
        
        
      </View>
    </PagerView>
    );
    
  }

  export default Profile;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerView: { 
     backgroundColor: '#C4C4C4'
    },
    pagerView: {
      flex: 1,
     
    },
    userInfo: {

    },
    eventRender: {
      flexDirection: 'row'
    },
    headBanner: {
      flex: 1,
      width: 400,
      backgroundColor: '#222222',
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
      fontFamily: 'sans-serif',
      marginRight: 5
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
    profileImage: {
      height: 50,
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
      borderRadius: 100/2,
      marginLeft: 150
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
      height: 100
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
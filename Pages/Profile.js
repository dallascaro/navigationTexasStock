import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, Share, Modal, Pressable, TouchableOpacity} from 'react-native';
//import {Picker} from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { db, pathReference, storage } from "../firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore/lite";
// To pick the file from local file system
import DocumentPicker from "react-native-document-picker";

const Profile = ({navigation}) => {

  const [eventList, setEventList] = useState([]);
  const [profileimage, setImage] = useState([]);
  
  const list = [];

  const events = [];

   // State Defination
   const [loading, setLoading] = useState(false);
   const [filePath, setFilePath] = useState({});
   const [process, setProcess] = useState("");

  const form = ['City', 'Date', 'Description', 'State', 'Time', 'Title', 'Username']
    const textInputComponents = form.map(type => <TextInput placeholder={type} />)


  const PullData = async () => {
    const myDoc = collection(db, 'Users Events')
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEventList(snapList)
  }

  const pullImage = async (img) => {
    setImage(e.target.files[0]);
  }
  

    //Call when component is rendered
    useEffect(() => {
      PullData();
    }, []);

    console.log( "Event List" ,eventList)

    const renderItem = ({ item }) => {
      return(
        <View>
          <Image style = {styles.profileCar} source = {require('../assets/Cars/chevyCamero.jpg')}/>
          <Text>{item.city}</Text>
          <Text>{item.date}</Text>
          <Text>{item.description}</Text>
          <Text>{item.state}</Text>
          <Text>{item.time}</Text>
          <Text>{item.title}</Text>
          <Text>{item.username}</Text>
        </View>
      )
    }

    const _chooseFile = async () => {
      // Opening Document Picker to select one file
      try {
        const fileDetails = await DocumentPicker.pick({
          // Provide which type of file you want user to pick
          type: [DocumentPicker.types.allFiles],
        });
        console.log(
          "fileDetails : " + JSON.stringify(fileDetails)
        );
        // Setting the state for selected File
        setFilePath(fileDetails);
      } catch (error) {
        setFilePath({});
        // If user canceled the document selection
        alert(
          DocumentPicker.isCancel(error)
            ? "Canceled"
            : "Unknown Error: " + JSON.stringify(error)
        );
      }
    };

    const _uploadFile = async () => {
      try {
        // Check if file selected
        if (Object.keys(filePath).length == 0)
          return alert("Please Select any File");
        setLoading(true);
  
        // Create Reference
        console.log(filePath.uri.replace("file://", ""));
        console.log(filePath.name);
        const reference = storage().ref(
          `/myfiles/${filePath.name}`
        );
  
        // Put File
        const task = reference.putFile(
          filePath.uri.replace("file://", "")
        );
        // You can do different operation with task
        // task.pause();
        // task.resume();
        // task.cancel();
  
        task.on("state_changed", (taskSnapshot) => {
          setProcess(
            `${taskSnapshot.bytesTransferred} transferred 
             out of ${taskSnapshot.totalBytes}`
          );
          console.log(
            `${taskSnapshot.bytesTransferred} transferred 
             out of ${taskSnapshot.totalBytes}`
          );
        });
        task.then(() => {
          alert("Image uploaded to the bucket!");
          setProcess("");
        });
        setFilePath({});
      } catch (error) {
        console.log("Error->", error);
        alert(`Error-> ${error}`);
      }
      setLoading(false);
    };
  

    return(
      <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">

        <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.jpg')}/>
        <Image style = {styles.profileImage} source = {pathReference}/>
            <Text>User Name</Text>
            <Text>Attending</Text>
          <Text>This is the content for the first page</Text>

          <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={_chooseFile}
              >
                <Text style={styles.buttonTextStyle}>
                  Choose Image (Current Selected:{" "}
                  {Object.keys(filePath).length == 0
                    ? 0
                    : 1}
                  )
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={_uploadFile}
              >
                <Text style={styles.buttonTextStyle}>
                  Upload File on FireStorage
                </Text>
              </TouchableOpacity>

        </View>
        
        <ScrollView style = {styles.eventDetails}>
          <View>
            <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {eventList}
              renderItem = {renderItem}
              />
          </View>

          </ScrollView>
      </View>

      <View key="2">
      <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.jpg')}/>
            <Text>User Name</Text>
            <Text>Interested</Text>
        <Text>This is the content for the second page</Text>
        </View>

        <ScrollView style = {styles.eventDetails}>
          <View>
            <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {eventList}
              renderItem = {renderItem}
              />
          </View>

          </ScrollView>
       
       
      </View>

      <View key="3">
      <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.jpg')}/>
            <Text>User Name</Text>
            <Text>My Events</Text>
        <Text>This is the content for the second page</Text>
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
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, Alert, FlatList, ActivityIndicator, Share, Modal, Pressable, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';
import { db, writeUserData } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import uuid from 'react-native-uuid';

const CreateEvent = ({navigation}) => {

  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');

  const [dimensions, setDimensions] = useState({window, screen});

  const[eventDate, setDate] = React.useState("Date");
  const[eventTime, setTime] = React.useState("Time");
  const[eventCity, setCity] = React.useState("City");
  const[eventState, setState] = React.useState("State");
  const[eventTitle, setTitle] = React.useState("Title");
  const[eventDescription, setDescription] = React.useState("Description");
  const[eventAddress, setAddress] = React.useState("Address");
  const [userEmail, setEmail] = useState([]);
  const [eventID, setEventID] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  

  const createEvent = async () => { 
    // Add a new document with a generated id.
    setEventID(uuid.v4())
    console.log("Event ID",eventID);
  const docRef = await addDoc(collection(db, `Events/${eventState}/${eventCity}`), {
  username: "Dallas",
  date: eventDate,
  time: eventTime,
  city: eventCity,
  state: eventState,
  title: eventTitle,
  description: eventDescription,
  address: eventAddress,
  eventID: eventID,
  timeOfCreation: currentDate
});
const ordersCol = collection(db, 'Users Events')
    const ordersSnapshot = await getDocs(ordersCol)
    const orderList = ordersSnapshot.docs.map(doc => doc.data());

    console.log(orderList)
console.log("Document written with ID: ", docRef.id);

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
      PullUserEmail();
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      setCurrentDate(
        date + '/' + month + '/' + year 
        + ' ' + hours + ':' + min + ':' + sec
      );
    }, []);

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

  
  const renderUserEmail = ({ item }) => {
    return(
      <View>
        <Text>{item.email}</Text>
        <Text>{item.user_id}</Text>
      </View>
    )
  }


    return(
      <View  style = {styles.container}  >

        <View style = {styles.headComment}>
          <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
          <View>
          <FlatList style = {{flex: 1, width: '70%', height: '100%'}}
              data = {userEmail}
              renderItem = {renderUserEmail}
              />
              
          </View>

          <View>
         
          </View>

        </View>

        <View style = {styles.commenView}>
        <Text style = {styles.comment}>Create Event</Text>
        </View>
       

        <View>
        <Image style = {styles.carPics} source = {require('../assets/Cars/FordMustang.jpg')}/>
        </View>


      <View style = {styles.commentSection}>

        <View style = {styles.eventData}>
          <Text style = {styles.eventText}>Date / Time</Text>
            <View style = {styles.eventInput}>
            <TextInput style = {styles.eventTextInput} 
            onChangeText = {setDate}>Date</TextInput>
            <TextInput style = {styles.eventTextInput} 
            onChangeText = {setTime}>Time</TextInput>
            </View>
        </View>

        <View style = {styles.eventData}>
          <Text style = {styles.eventText}>City / State</Text>
            <View style = {styles.eventInput}>
            <TextInput style = {styles.eventTextInput} 
            onChangeText = {setCity}>City</TextInput>
            <TextInput style = {styles.eventTextInput}
            onChangeText = {setState}>State</TextInput>
            </View>
        </View>  
          
        <View style = {styles.eventData}>
        <Text style = {styles.eventText}>Title / Desc</Text>
          <View style = {styles.eventInput}>
            <TextInput style = {styles.eventTextInput}
            onChangeText = {setTitle}>Title</TextInput>
            <TextInput style = {styles.eventTextInput}
            onChangeText = {setDescription}>Desc</TextInput>
         </View>
        </View>

        <View style = {styles.eventData}>
        <Text style = {styles.eventText}>Address     </Text>
          <View style = {styles.eventInput}>
            <TextInput style = {styles.eventTextInput}
            onChangeText = {setAddress}>Address</TextInput>
         </View>
        </View>

        
        <View style = {styles.eventButton}>
         
          <View style = {styles.eventDetails}>
            <Button
            title="Post"
            color='#17E217'
            onPress={createEvent} 
            />
          </View>
        
          </View>
         
       
        </View>
      
      </View>
    );
    
  }

  export default CreateEvent;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headComment: {
      flexDirection: 'row',
      width: 400,
      backgroundColor: '#C4C4C4',
      paddingTop: 20
    },
    comment: {
      width: 400,
      marginLeft: 180,
      fontWeight: 'bold',
      fontSize: 18
    },
    commenView: {
      backgroundColor: '#C4C4C4',
    },
    commentSection: {
      flex: 1,
      width: 400,
      backgroundColor: '#C4C4C4'
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
    eventData: {
      flexDirection: 'row',
      marginLeft: 50,
      marginTop: 20,
      marginBottom: 20
    },
    evenDescription: {
      marginRight: 75
    },
    eventInput: {
      flexDirection: 'row',
      paddingLeft: 10,

    },
    eventText: {
      marginLeft: 10
    },
    eventTextInput: {
      paddingRight: 40,
      backgroundColor: '#EFEEEE',
      height: 50,
      width: 100
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
      height: 80,
      width: 80,
      borderRadius: 80/2,
      marginLeft: 25
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
      flexDirection: 'row',
      marginBottom:100,
      marginLeft: 160,
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
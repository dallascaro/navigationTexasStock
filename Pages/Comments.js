import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, FlatList, Alert, ActivityIndicator, Share, Modal, Pressable, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';
import { db, auth } from "../firebase";
import { query, where, QueryDocumentSnapshot, QuerySnapshot, onSnapshot, setDoc, doc, collection, addDoc, serverTimestamp, getDocs} from "firebase/firestore";
import { async } from '@firebase/util';

const Comments = ({navigation, route}) => {

  const window = Dimensions.get('screen').width;
  const screen = Dimensions.get('screen').height;

  const {eventId, eventName, eventDate} = route.params;

  console.log(eventId, eventName, eventDate);

  const [dimensions, setDimensions] = useState({window, screen});

    const[userComment, setComment] = React.useState("Comment");
    const [userEmail, setEmail] = useState([]);

    const [userReplies, setReplies] = useState([]);

    const[userName, setUserName] = React.useState("UserName");

  //const[eventDate, setDate] = React.useState("Date");
  const[eventTime, setTime] = React.useState("Time");
  const[eventCity, setCity] = React.useState("City");
  const[eventState, setState] = React.useState("State");
  const[eventTitle, setTitle] = React.useState("Title");
  const[eventDescription, setDescription] = React.useState("Description");

  const [modalVisible, setModalVisible] = useState(false);

  const commentData = async ({route}) =>{
   

  }

  const PullUserComments = async () => {
    const myDoc = collection(db, 'Users Comments')
    const eventComments = query(myDoc, where('eventID', "==", eventId));
   
    const querySnapshot = await getDocs(eventComments);
      const commentList = querySnapshot.docs.map(doc => doc.data());
        setReplies(commentList)
        //console.log("Replies", userReplies);

   console.log("Posted Comments");
  }

    //Call when component is rendered
    useEffect(() => {
      PullUserComments();
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

  const renderItem = ({ item }) => {
    return(
      <View style = {styles.eventsBackground}>
        <View style = {styles.eventsProfilePost}>
        <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
          <Text style = {styles. eventsUserName}>{item.userEmail}</Text>
        </View>

        <View style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.comment}</Text>
        </View>
       
      </View>
    )
  }

    return(
      <View  style = {styles.container}  >
          <View style = {styles.topComment}>
              <Text style = {styles.comment}>Comments</Text>
          </View>

          <View style = {styles.passedInfo}>
              <Text style = {styles.passedInfoLook}>eventId: {JSON.stringify(eventId)}</Text>
              <Text style = {styles.passedInfoLook}>eventName: {JSON.stringify(eventName)}</Text>
              <Text style = {styles.passedInfoLook}>eventDate: {JSON.stringify(eventDate)}</Text>
          </View>


          <View style = {styles.commentSection}>
            <Text>Comments</Text>
                  <FlatList style = {{ width: window, height: '100%'}}
                        data = {userReplies}
                        renderItem = {renderItem}
                        keyExtractor = {(idx) => idx}
                      />
          </View>

          

      </View>
    );
  }

  export default Comments;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topComment: {
      flexDirection: 'row',
      width: 400,
      flex: .3,
      backgroundColor: 'black',
     
    },
    passedInfo: {
      flexDirection: 'column',
      flex: .2,
      width: 400,
      backgroundColor: 'black'
    },
    passedInfoLook: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 12,
      marginLeft: 50
    },
    userInfo: {
     
    },
  
    textStyle: {
      fontWeight: 'bold'
    },
    comments: {
      marginTop: 10
    },
    replies: {
      marginLeft: 75
    },
    replieSections: {
        flexDirection: 'row'
    },
    buttonView: {
flexDirection: 'row'
    },
    comment: {
      paddingTop: 50,
      paddingLeft: 20,
      fontWeight: 'bold',
      color: 'white',
      fontSize: 24
    },
    commentSection: {
      flex: 1,
      width: 400,
      backgroundColor: '#C4C4C4'
    },
    commentSectionTop:{
        flexDirection: 'column',
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
      
      fontSize: 15,
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
      fontSize: 18,
      fontWeight: "bold",
    },
    eventFeed: {  
      flex: 1.4
    },
    eventDetails: {
      marginRight: 80
    },
    carLoad: {
      backgroundColor: '#C4C4C4'
    },
    eventInfo: {
      backgroundColor: '#C4C4C4'
    },
    eventButton: {
      flex: .3,
      flexDirection: 'row',
      marginLeft: 100,
    },
    choicesButton : {
      
    },
    eventRender: {
      marginLeft: 100,
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
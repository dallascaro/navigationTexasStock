import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, Share, Modal, Pressable, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';
import { db, writeUserData } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const CreateBrand = ({navigation}) => {

  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');

  const [dimensions, setDimensions] = useState({window, screen});

  const[userName, setUserName] = React.useState("UserName");
  const[companyName, setCompanyName] = React.useState("CompanyName");
  const[companyCity, setCity] = React.useState("City");
  const[companyState, setState] = React.useState("State");
  const[companyAddress, setAddress] = React.useState("Address");
  const[companyDescription, setDescription] = React.useState("Description");
  const[websiteLink, setLink] = React.useState("Website");

  const createBrand = async () => { 
    // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Company Info"), {
  username: "Dallas",
  name: companyName,
  city: companyCity,
  state: companyState,
  address: companyAddress,
  description: companyDescription,
  link: websiteLink
});
const ordersCol = collection(db, 'Company Info')
    const ordersSnapshot = await getDocs(ordersCol)
    const orderList = ordersSnapshot.docs.map(doc => doc.data());

    console.log(orderList)
console.log("Document written with ID: ", docRef.id);

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

  }

    return(
      <View  style = {styles.container}  >

        <View style = {styles.headComment}>
          <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
          <Text style = {styles.comment}>Username</Text>
          <Text style = {styles.comment}>Create Brand</Text>
        </View>

        <View>
        <Image style = {styles.carPics} source = {require('../assets/Cars/FordMustang.jpg')}/>
        </View>


      <View style = {styles.commentSection}>

        <View style = {styles.eventData}>
          <Text style = {styles.eventText}>Name / Link</Text>
            <View style = {styles.eventInput}>
            <TextInput style = {styles.eventTextInput} 
            onChangeText = {setCompanyName}>Name</TextInput>
            <TextInput style = {styles.eventTextInput} 
            onChangeText = {setLink}>Link</TextInput>
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
        <Text style = {styles.eventText}>Address / Desc</Text>
          <View style = {styles.eventInput}>
            <TextInput style = {styles.eventTextInput}
            onChangeText = {setAddress}>Address</TextInput>
            <TextInput style = {styles.eventTextInput}
            onChangeText = {setDescription}>Desc</TextInput>
         </View>
        </View>

        <View style = {styles.eventButton}>
         
          <View style = {styles.eventDetails}>
            <Button
            title="Post"
            color='#17E217'
            onPress={createBrand} 
            />
          </View>
          <View>
          <Button
            title="Cancel"
            color='#D8232F'
            onPress={() => Alert.alert('Cancled Comment!')}
            />
          </View>
        
          </View>
         
       
        </View>
      
      </View>
    );
    
  }

  export default CreateBrand;

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
      paddingTop: 50,
      fontWeight: 'bold',
      fontSize: 18
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
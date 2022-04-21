import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, Share, Modal, Pressable, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';
import {auth} from '../firebase'
import { sendPasswordResetEmail } from "firebase/auth";
import { db, writeUserData } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";

const Home = ({ navigation }) => {

  const[email, setEmail] = React.useState("Email");
  const[password, setPassword] = React.useState("Password");

  const[user] = React.useState("User");

  const[userEmail] = React.useState("User Email");
  const[userId] =  React.useState("User ID");

  const [time, setTime] =React.useState("Time");
  const [date, setDate] =React.useState("Date");

  const [currentDate, setCurrentDate] = useState('');

  const onRegister = async () => {
    try {
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = credential.user.uid;
      console.log("User ID", uid)
      // your data here (dont forget to store the uid on the document)
      const user = {
        email: email,
        user_id: uid,
      };
      console.log(user)
  
      const docRef = await addDoc(collection(db, "UserIDs"), {
        email: email,
        user_id: uid,
      });

      const docRef2 = await addDoc(collection(db, "User Type"), {
        email: email,
        userType: 'Personal'
      });

      console.log("Document written with ID: ", docRef.id);
      console.log("Document written with ID: ", docRef2.id);

    } catch {
      console.log("Didnt add to database")
    }
    navigation.navigate("EventsT")
  };
  

  const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        console.log('User Created In')
        // ...

        const docRef =  addDoc(collection(db, "User SignIn"), {
          email: email,
          user_id: uid,
        });
      })
      .catch((error) => {
        console.log('User failed to be created')
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ..
      });

      navigation.navigate("EventsT")
  }

  const userLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
       user = userCredential.user;
      console.log('Signed In User')
      // ...
    })
    .catch((error) => {
      console.log('Failed to sign in User')
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // ..
  
      const docRef = addDoc(collection(db, "User SignIn"), {
        email: email,
        time: currentDate,
        signedIn: 'yes'
      });

      console.log("Document written with ID: ", docRef.id);
     
    });

    navigation.navigate("EventsT")

  }


  const forgotPassword = () => {

    console.log("reset email sent to " + email);
    sendPasswordResetEmail(auth, email, null)
        .then(() => {
            alert("reset email sent to " + email);
        })
        .catch(function (e) {
            console.log(e);
        });
};

useEffect(() => {
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

    return(
      <View style = {styles.container}>
         
         <View style = {styles.headBanner}>
              <Image style = {styles.Logo} source = {require('../assets/CompanyLogo/TXStockRally.jpg')} />
              <Image style = {styles.carPics} source = {require('../assets/Cars/FordMustang.jpg')}/>
           </View>
       
  
        <View style = {styles.signUpLogin}>
          <Text>Email</Text>
          <TextInput style = {styles.loginInput}
          onChangeText = {setEmail}
          placeholder='name@example.com'>
            </TextInput>
  
          <Text>Password</Text>
          <TextInput style = {styles.loginInput}
          onChangeText = {setPassword}
          placeholder='Min. 8 characters'
          secureTextEntry>
            </TextInput>

          <TouchableHighlight 
            onPress={forgotPassword}>
              <View style = {styles.forgotBussButton}>
                <Text style = {styles.forgotBussPadd}>Forgot Password</Text>
              </View>
            </TouchableHighlight>
 
        </View>

        <View style = {styles.BussinessLogin}>
          <TouchableHighlight
          onPress={() => navigation.navigate("BussHome")}>
            <View style = {styles.forgotBussButton}>
              <Text style = {styles.forgotBussPadd}>Bussiness Login</Text>
            </View>
          </TouchableHighlight>
        </View>
  
        <View style = {styles.loginButton}>
  
          <View style = {styles.signUpButtonView}>
            <TouchableHighlight style = {styles.signUpLoginTouch}
            onPress={onRegister}>
              <View style = {styles.forgotBussButton}>
                <Text style = {styles.signUpPadd}>Sign Up!</Text>
              </View>
            </TouchableHighlight>
          </View>
          
          <View style = {styles.signUpButtonView}>
          <TouchableHighlight style = {styles.signUpLoginTouch}
            onPress={userLogin}>
              <View style = {styles.forgotBussButton}>
                <Text style = {styles.loginPadd}>Login</Text>
              </View>
            </TouchableHighlight>
          </View>
          

        </View>

  
        <View style = {styles.footerContent}>
          <Text style = {styles.copyRight}>Copyright @ Texas Stock Rally</Text>
        </View>
  
      </View>
    );
  }

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headBanner: {
    flex: 1,
    width: 400
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
  forgotBussButton: {
    backgroundColor: '#D8232F',
    height: 30,
    borderRadius: 10
  },
  forgotBussPadd: {
    paddingLeft: 45,
    paddingTop: 7
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
  carPics: {
    width: 400,
  },
  Logo: {
    width: 400,
    height: 100,
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

  signUpLogin: {
   flex: 1,
   marginTop: 230,
   marginBottom: 70
  },
  signUpLoginTouch: {
    width: 100
  },
  signUpPadd: {
    paddingLeft: 20,
    paddingTop: 7
  },
  loginPadd: {
    paddingLeft: 25,
    paddingTop: 7
  },
  loginInput: {
    backgroundColor: '#C9C9C9',
    color: '#000000',
    height: 40,
    width: 200,
  },
  loginButton: {
   flex: .8,
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingTop: 30
  },
  signUpButtonView: {
  paddingRight: 10
  },
  forgotPassButtonView : {
     
  },
  BussinessLogin: {
   marginTop: 23,
   width: 200,
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
    flex: .7,
    width: 400,
    backgroundColor: "#222222"
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
  },
  buttonBorder: {
    borderRadius: 4,
   
  },
  copyRight: {
    color: 'white',
    fontSize: 20,
    marginTop: 50,
   marginLeft: 10
  }
});
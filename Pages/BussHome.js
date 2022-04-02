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

const BussHome = ({ navigation }) => {

  const[email, setEmail] = React.useState("Email");
  const[password, setPassword] = React.useState("Password");

  const onRegister = async () => {
    try {
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      const {uid} = credential;
      console.log(uid)
      // your data here (dont forget to store the uid on the document)
      const user = {
        email: email,
        user_id: uid,
      };
      console.log(user)
      await firestore().collection('Users').doc(uid).set(user);
    } catch {
      console.log("Didnt add to database")
    }
    navigation.navigate("EventsTB")
  };
  

  const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('User Created In')
        // ...
      })
      .catch((error) => {
        console.log('User failed to be created')
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ..
      });

      navigation.navigate("EventsTB")
  }

  const userLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
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
    });

    navigation.navigate("EventsTB")

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

    return(
      <View style = {styles.container}>
         
         <View style = {styles.headBanner}>
              <Image style = {styles.Logo} source = {require('../assets/CompanyLogo/TXStockRally.jpg')} />
              <Image style = {styles.carPics} source = {require('../assets/Cars/FordMustang.jpg')}/>
           </View>
       
  
        <View style = {styles.signUpLogin}>
          <Text>Bussiness Email</Text>
          <TextInput style = {styles.loginInput}
          onChangeText = {setEmail}
          placeholder='name@example.com'>
            </TextInput>
  
          <Text>Bussiness Password</Text>
          <TextInput style = {styles.loginInput}
          onChangeText = {setPassword}
          placeholder='Min. 8 characters'
          secureTextEntry>
            </TextInput>

            <Button style = {styles.buttonBorder}
            title="Forgot Password"
            color='#D8232F'
            onPress={forgotPassword}
          />
         
  
        </View>
  
        <View style = {styles.loginButton}>
  
          <View style = {styles.signUpButtonView}>
          <Button style = {styles.buttonBorder}
            title="Sign Up!"
            color='#D8232F'
            borderRadius = '10'
            onPress={onRegister}
          />
          </View>
          
          <View style = {styles.signUpButtonView}>
          <Button style = {styles.buttonBorder}
            title="Login"
            color='#D8232F'
            onPress={userLogin}
          />
          </View>

        
        </View>
  
        <View style = {styles.footerContent}>
          <Text style = {styles.copyRight}>Copyright @ Texas Stock Rally</Text>
        </View>
  
      </View>
    );
  }

export default BussHome;

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
   marginTop: 200,
   marginBottom: 55
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
   justifyContent: 'space-between',
   paddingTop: 10
  },
  signUpButtonView: {
  paddingRight: 20
  },
  forgotPassButtonView : {
     
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
    marginTop: 80,
   marginLeft: 10
  }
});
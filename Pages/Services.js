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

import { PayPalScriptProvider, PayPalButtons, Component } from "@paypal/react-paypal-js";
import { StripeProvider, initStripe, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { render } from 'react-dom';
import { fetchPublishableKey } from '../helper';
import { async } from '@firebase/util';
import { API_URL } from '../Config';

import {GooglePayButton, useGooglePay} from '@stripe/stripe-react-native';

import { GooglePay } from 'react-native-google-pay';

const Services = ({navigation}) => {

  const [servicesPageNum] = React.useState(3);

  const {
    isGooglePaySupported,
    initGooglePay,
    presentGooglePay,
  } = useGooglePay();

  const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

  const {confirmPayment, loading} = useConfirmPayment()
  const [name, setName] = useState('');

  const [publishableKey, setPublishableKey] = useState('');

  // Set the environment before the payment request
//GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);


  React.useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const publishableKey = await fetchPublishableKey()
    if(publishableKey) {
      setPublishableKey(publishableKey)
    }
  }

  const requestData = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        // stripe (see Example):
        gateway: 'stripe',
        gatewayMerchantId: '',
        stripe: {
          publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
          version: '2018-11-08',
        },
        // other:
        gateway: 'example',
        gatewayMerchantId: 'exampleGatewayMerchantId',
      },
      allowedCardNetworks,
      allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: '10',
      totalPriceStatus: 'FINAL',
      currencyCode: 'USD',
    },
    merchantName: 'Example Merchant',
  };

  const fetchPaymentIntentClientSecret = async () => {
    // Fetch payment intent created on the server, see above
    console.log("key", publishableKey)
    Alert.alert('Entered Client Secret')
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const { clientSecret } = await response.json();
   
    return clientSecret;
  };

  const pay = async () => {
    Alert.alert('Entered Pay Method')
    const clientSecret = await fetchPaymentIntentClientSecret();
   // Need to correct Fetch

    const { error } = await presentGooglePay({
      clientSecret,
      forSetupIntent: false,
    });

    if (error) {
      Alert.alert(error.code, error.message);
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    }
    Alert.alert('Success', 'The payment was confirmed successfully.');
  };

  const PullData = async () => {
    const myDoc = collection(db, 'Company Info')
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEventList(snapList)
  }

  const userProfile = async () => { 
    // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Profile Images"), {
  url: imageUrl
});

console.log("Document written with ID: ", docRef.id);

  }

  const payment = async () => {
    Alert.alert('Entered')
    
    const response = await fetch('${API_URL}/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PaymentMethodType: 'card',
        currnecy: 'usd'
      })
    })
    
    Alert.alert('Responded')
    const {clientSecret} = await response.json()

    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails: {name}
    })

    if(error) {
      Alert.alert("Error Code: ${error.code} ", error.message)
    }else if (paymentIntent) {
      Alert.alert("Success", 'Payment sucessful: ${paymentIntent.id}')
    }

  }

  const paymentIntent = async () => {

  const {paymentIntent} = await stripe.paymentIntents.create({
    amount: 500,
    currency: 'gbp',
    payment_method: 'pm_card_visa',
  });
}

    return (
      
      <StripeProvider  publishableKey={publishableKey}>
        <View style= {styles.container}>

          <View>
          <Text>Credit Card</Text>
          <TextInput style = {styles.userName}
          onChangeText={setName}>Insert First and Last Name</TextInput>
          </View>

          <CardField
          placeholder={{
            nummber: 'Insert Number 1234'
          }} 
          style = {styles.cardField} 
          />

          <Button
          title = "Pay Now"
          onPress={payment} disabled= {loading}></Button>
        </View>

        <View >
          <Button
            title = 'Pay'
            onPress={pay} ></Button>
        </View>
      </StripeProvider>
       
      )
    
  }

  export default Services;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardField: {
        width: '100%',
        height: 50,
        marginTop: 20
    },
    userName: {
      backgroundColor: 'gray',
      color: 'black'
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
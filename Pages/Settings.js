import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, SafeAreaView, FlatList, ScrollView,Image, Alert, ActivityIndicator, Share, Modal, Pressable,  TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';

const DATA = [
  {
    id: '1',
    title: 'Rims',
  },
  {
    id: '2',
    title: 'Tires',
  },
  {
    id: '3',
    title: 'Exhasut',
  },
  {
    id: '4',
    title: 'Decals',
  },
  {
    id: '5',
    title: 'Intakes',
  },
  {
    id: '6',
    title: 'Headers',
  },
  {
    id: '7',
    title: 'Rims',
  },
  {
    id: '8',
    title: 'Tires',
  },
  {
    id: '9',
    title: 'Exhasut',
  },
  {
    id: '10',
    title: 'Decals',
  },
];

const OPTIONS = [
  {
    id: '1',
    title: 'StoreOne',
  },
  {
    id: '2',
    title: 'StoreTwo',
  },
  {
    id: '3',
    title: 'StoreThree',
  },
  {
    id: '4',
    title: 'StoreFour',
  },
  {
    id: '5',
    title: 'StoreFive',
  }
];

const CONTENT = [
  {
    id: '1',
    title: 'Black Rims',
    link: 'https://www.americanmuscle.com/'
  },
  {
    id: '2',
    title: 'White Ball Tires',
    link: 'https://www.cjponyparts.com/'
  },
  {
    id: '3',
    title: 'Long head Exhasut',
    link: 'https://www.americanmuscle.com/'
  },
  {
    id: '4',
    title: 'Fire Decals',
    link: 'https://www.cjponyparts.com/'
  },
  {
    id: '5',
    title: 'Cold Air Intakes',
    link: 'https://www.americanmuscle.com/'
  },
  {
    id: '6',
    title: 'LongHeaders',
    link: 'https://www.cjponyparts.com/'
  },
];

const Item = ({ title, link }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}{link}</Text>
  </View>
);

const Settings = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} link = {item.link} />
  );

  const keyExtractor = (item) => item.id

  return (

    <View style={styles.container}>

    <SafeAreaView  style={styles.listView}>

      <FlatList horizontal ={true}
      style={styles.listCategories}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

  <FlatList horizontal ={true}
      style={styles.listCategories}
        data={OPTIONS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

      <FlatList
      style={styles.listData}
        data={CONTENT}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

    </SafeAreaView>

    </View>
  );
}

  export default Settings;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listView: {
      flex: 1,
      justifyContent: 'space-between',
      paddingRight: 10
    },
    listCategories: {
      backgroundColor: 'red'
    },
    listData: {
      backgroundColor: 'green'
    },
    title: {
      fontSize: 20
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 16,
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
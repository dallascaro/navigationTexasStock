import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, Share, Modal, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';

const Events = () => {

    const [state, setState] = useState([
  
    ])
  
    const [city, setCity] = useState([
      
    ])
  
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
       <View style = {styles.headBannerEvents}>
            <View style = {styles.companyNamePlacement}>
            <Image style = {styles.Logo} source = {require('../assets/CompanyLogo/TXStockRally.jpg')} />
            </View>
      </View>
  
      <View style = {styles.eventBanner}>
        <Text style = {styles.eventName}>Local Events</Text>
           
           <View style = {styles.cityView}> 
           <TextInput style = {styles.localEventsInput}
          placeholder='Enter City Name'>
            City</TextInput>
            <TextInput style = {styles.localEventsInput}
          placeholder='Enter State Name'>
            State</TextInput>
          </View>
      </View>
  
  
  
      <View style = {styles.picContentView}>
          <ScrollView>
        <View>
  
          <View style = {styles.eventsProfilePost}>
          <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.jpg')}/>
            <Text style = {styles. eventsUserName}>User Name</Text>
          </View>
  
  
              <Image style = {styles.carPics} source = {require('../assets/Cars/FordMustang.jpg')}/>
              <ActivityIndicator style = {styles.carLoad}
                size="large" color="#0000ff">
              </ActivityIndicator>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Content has been reported");
                  setModalVisible(!modalVisible);
                  }}
                >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter Why this content is being reported</Text>
                    <TextInput>Enter Text</TextInput>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
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
  
              <View style = {styles.eventInfo}>
                <Text style = {styles.eventText}>Cars and Coffee</Text>
                <Text style = {styles.eventText}>Mon, Jan 4 9:00am-12:00pm</Text>
                <Text style = {styles.eventText}>2040 W Cuthbert Ave, Midland, TX</Text>
  
                <View style = {styles.eventButton}>
                  
                  <Button
                    title="Going to Event!"
                    color='#D8232F'
                    onPress={() => Alert.alert('Going!')}
                  />
                  <Button
                    title="Interested!"
                    color='#FFFF00'
                    onPress={() => Alert.alert('Interested!')}
                  />
                   <Button
                    title="Share Event!"
                    color='#00FF00'
                    onPress={onShare}
                  />
                </View>
              </View>
        </View>
  
            <View>
  
            <View style = {styles.eventsProfilePost}>
          <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.jpg')}/>
            <Text style = {styles. eventsUserName}>User Name</Text>
          </View>
  
            <Image style = {styles.carPics} source = {require('../assets/Cars/DodgeChallenger.jpg')}/>
            <ActivityIndicator style = {styles.carLoad}
                size="large" color="#0000ff">
              </ActivityIndicator>
  
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Content has been reported");
                  setModalVisible(!modalVisible);
                  }}
                >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Why this content is being reported</Text>
              <TextInput>Enter Text</TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
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
  
            <View style = {styles.eventInfo}>
                <Text style = {styles.eventText}>Cars and Coffee</Text>
                <Text style = {styles.eventText}>Mon, Jan 4 9:00am-12:00pm</Text>
                <Text style = {styles.eventText}>2040 W Cuthbert Ave, Midland, TX</Text>
                <View style = {styles.eventButton}>
                <Button
                    title="Going to Event!"
                    color='#D8232F'
                    onPress={() => Alert.alert('Going!')}
                  />
                  <Button
                    title="Interested!"
                    color='#FFFF00'
                    onPress={() => Alert.alert('Interested!')}
                  />
                  <Button
                    title="Share Event!"
                    color='#00FF00'
                    onPress={onShare}
                  />
                </View>
              </View>
            </View>
           
            <View>
  
            <View style = {styles.eventsProfilePost}>
          <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.jpg')}/>
            <Text style = {styles. eventsUserName}>User Name</Text>
          </View>
  
              <Image style = {styles.carPics} source = {require('../assets/Cars/chevyCamero.jpg')}/>
              <ActivityIndicator style = {styles.carLoad}
                size="large" color="#0000ff">
              </ActivityIndicator>
  
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Content has been reported");
                  setModalVisible(!modalVisible);
                  }}
                >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Why this content is being reported</Text>
              <TextInput>Enter Text</TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
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
  
              <View style = {styles.eventInfo}>
                <Text style = {styles.eventText}>Cars and Coffee</Text>
                <Text style = {styles.eventText}>Mon, Jan 4 9:00am-12:00pm</Text>
                <Text style = {styles.eventText}>2040 W Cuthbert Ave, Midland, TX</Text>
                <View style = {styles.eventButton}>
                <Button style = {styles.choicesButton}
                    title="Going to Event!"
                    color='#D8232F'
                    onPress={() => Alert.alert('Going!')}
                  />
                  <Button style = {styles.choicesButton}
                    title="Interested!"
                    color='#FFFF00'
                    onPress={() => Alert.alert('Interested!')}
                  />
                   <Button
                    title="Share Event!"
                    color='#00FF00'
                    onPress={onShare}
                  />
                </View>
              </View>
            </View>
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
    headBanner: {
      flex: 1,
      width: 400,
      backgroundColor: '#222222',
    },
    headBannerEvents: {
      flex: .4,
      width: 400,
      backgroundColor: '#222222',
    },
    eventBanner: {
      flex: .2,
      width: 400,
      backgroundColor: '#C4C4C4',
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
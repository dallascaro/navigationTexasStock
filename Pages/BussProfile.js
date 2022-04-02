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

const BussProfile = ({navigation}) => {

  const [eventList, setEventList] = useState([]);
  const [profileImage, setImage] = useState([]);

  
  const [singleFile, setSingleFile] = useState('');

  const list = [];

  const events = [];

  const [imageUrl, setImageUrl] = useState([]);

  const [imagePic, setImagePic] = useState([]);

  // Download file
const profilePicture = getDownloadURL(jeremyPic).then((x) => {
  setImageUrl(x);
  console.log(imageUrl);

})

const selectOneFile = async () => {
  //Opening Document Picker for selection of one file
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      //There can me more options as well
      // DocumentPicker.types.allFiles
       type : [DocumentPicker.types.images]
      // DocumentPicker.types.plainText
      // DocumentPicker.types.audio
      // DocumentPicker.types.pdf
    });
    //Printing the log realted to the file
    console.log('res : ' + JSON.stringify(res));
    console.log('URI : ' + res.uri);
    console.log('Type : ' + res.type);
    console.log('File Name : ' + res.name);
    console.log('File Size : ' + res.size);
    //Setting the state to show single file attributes
    setSingleFile(res);
  } catch (err) {
    //Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      //If user canceled the document selection
      alert('Canceled from single doc picker');
    } else {
      //For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
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

  const PullUserData = async () => {
    const myDoc = collection(db, "Profile Images")
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setImage(snapList)
  }


    //Call when component is rendered
    useEffect(() => {
      PullData();
    }, []);

    const renderItem = ({ item }) => {
      return(
        <View>
           <Image style = {styles.profileCar} source = {{imageUrl}}/>
           <Image style = {styles.profileCar} source = {{imagePic}}/>

          <Image>{item.url}</Image>
          <Text>{item.name}</Text>
          <Text>{item.state}</Text>
          <Text>{item.city}</Text>
          <Text>{item.address}</Text>
          <Text>{item.description}</Text>
          <Text>{item.logourl}</Text>
          <Text>{item.username}</Text>
        </View>
      )
    }

    return(
      <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">

        <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
        <Image style = {styles.profileImage} source = {imageUrl}/>

        {/*To show single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectOneFile}>
          {/*Single file selection button*/}
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        {/*Showing the data of selected Single file*/}
        <Text style={styles.textStyle}>
          File Name: {singleFile.name ? singleFile.name : ''}
          {'\n'}
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.size ? singleFile.size : ''}
          {'\n'}
          URI: {singleFile.uri ? singleFile.uri : ''}
          {'\n'}
        </Text>
        <View
          style={{
            backgroundColor: 'grey',
            height: 2,
            margin: 10
          }} />


        <Button
                    title="User!"
                    color='#17E217'
                    onPress={userProfile}
                    
                  />
                 
            <Text>User Name</Text>
            <Text>Attending</Text>
          <Text>This is the content for the first page</Text>
         
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
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
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
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
            <Text>User Name</Text>
            <Text>My Events</Text>
        <Text>This is the content for the second page</Text>
        </View>

        

<Button
                    title="Create Brand!"
                    color='#17E217'
                    onPress={() => navigation.navigate("CreateBrand")}
                    
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

  export default BussProfile;

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
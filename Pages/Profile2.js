import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, Share,Pressable, FlatList, Modal} from 'react-native';
//import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {  TouchableOpacity } from 'react-native-gesture-handler';
import { auth, db} from '../firebase';
//import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { windowWidth,windowHeight } from '../Utils/Dimensions';
import * as ImagePicker from 'expo-image-picker';
//import { Constants } from 'expo-constants';
//import { Platform } from 'expo-modules-core';
//import { async } from '@firebase/util';
import {storage } from "../firebase";
import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';
import Animated from 'react-native-reanimated';
//import { backgroundColor, borderTopColor, transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
//import { isTranslateY, opacity } from 'react-native-redash';

const Profile = ({navigation, props}) => {
  const[profileTab, setProfileTab]=useState(null);
  const [attendingFeed, setAttending]= useState(null)
  const attending = 'Attending', interested = 'Interested', myEvents = 'My Events';
  const [status, setStatus] = useState(attending)
  const [interestedFeed, setInterested]= useState(null)
  const [dataSwitch, setDataSwitch] = useState(attendingFeed)
  const [image, setImage] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [imageUpload, setImageUpload] = useState("");
  const [animation, setAnimation]= useState(new Animated.Value(0))
  const [coverUpload, setCoverUpload]= useState("");

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  
  const GetAttending = async () =>{
    const attendingCol = collection(db, 'Users Events');
     const attendingSnapshot = await getDocs(attendingCol);
     const attendingList = attendingSnapshot.docs.map(doc => doc.data());
     setAttending(attendingList)
   }
     useEffect(() =>{
    GetAttending()
  }, [])

  console.log(attendingFeed)
    const GetInterested = async () =>{
    const interestedCol = collection(db, 'Users Intersted Events');
    const interestedSnapshot = await getDocs(interestedCol);
    const interestedList = interestedSnapshot.docs.map(doc => doc.data());
    setInterested(interestedList)
  }

  useEffect(()=>{
    GetInterested()
  }, [])

  const choosePhotoFromLibrary = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
      })
      console.log(result + "This is in picker function");
      const imageUri = result.uri;
      setImage(imageUri);
      alert(image + "after seleciton of pictuer");
    };
  //Upload Image From Phone
  const uploadImage = async () => {
    console.log(image);
    if (image == null)return;
    const imageRef = ref(storage, `profilePictures/${image.substring(image.lastIndexOf('/') + 1) + uuid4()}`);
    const response = await fetch(image);
    const blob = await response.blob();
    uploadBytes(imageRef, blob).then((res) => {
      getDownloadURL(res.ref).then((remoteURL) => {
        console.log(remoteURL)
        setImageUpload(remoteURL)
        alert(imageUpload + "after upload")
      })
      
      const profileDoc = setDoc(doc(db, "Profile Images", auth.currentUser.uid),{
        profilePic: imageUpload,
      });
    });

  }

  const uploadCoverImage = async () => {
    console.log(image);
    if (image == null)return;
    const imageRef = ref(storage, `coverPictures/${image.substring(image.lastIndexOf('/') + 1) + uuid4()}`);
    const response = await fetch(image);
    const blob = await response.blob();
    uploadBytes(imageRef, blob).then((res) => {
      getDownloadURL(res.ref).then((remoteURL) => {
        console.log(remoteURL)
        setCoverUpload(remoteURL)
        alert(coverUpload)
      })
      
      const coverDoc = setDoc(doc(db, "Cover Images", auth.currentUser.uid),{
        coverPic: coverUpload,
      });
    });

  }
  
  
  const pullProfilePic = async () => {
    const profileImagesRef = doc(db, "Profile Images", auth.currentUser.uid);
    const profilePicSnapshot = await getDoc(profileImagesRef);
      if (profilePicSnapshot.exists()) {
        const getPicture = profilePicSnapshot.data();
        setProfilePhoto(getPicture)
        
      }else{
        alert("Photo did not set")
      }
  };
  useEffect(()=>{
    pullProfilePic()
  }, [imageUpload])

  const pullCoverPic = async () => {
    const coverImagesRef = doc(db, "Cover Images", auth.currentUser.uid);
    const coverPicSnapshot = await getDoc(coverImagesRef);
      if (coverPicSnapshot.exists()) {
        const getPicture = coverPicSnapshot.data();
        setCoverPhoto(getPicture)
        
      }else{
        alert("Photo did not set")
      }
  };
  useEffect(()=>{
    pullCoverPic()
  }, [coverUpload])
  
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

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
  
  const renderItem = ({ item }) => {
    return (
      <View>
  
          <View style = {styles.eventsProfilePost}>
          <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
            <Text style = {styles. eventsUserName}>{item.username}</Text>
          </View>
  
  
              <Image style = {styles.carPics} source = {require('../assets/Cars/FordMustang.jpg')}/>
              <ActivityIndicator style = {styles.carLoad}
                size="large" color="#0000ff">
              </ActivityIndicator>
              
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.textStyle}>Report Content</Text>
              </Pressable>
  
              <View style = {styles.eventInfo}>
                <Text style = {styles.eventText}>{item.description}</Text>
                <Text style = {styles.eventText}>{item.date}</Text>
                <Text style = {styles.eventText}>{item.city}</Text>
  
                <View style = {styles.eventButton}>

                  <TouchableOpacity onPress={() => Alert.alert('Going!')} style = {styles.goingButton}>
                    <Text style = {styles.eventButtonText}>Going</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => Alert.alert('Interested')} style = {styles.interestedButton}>
                    <Text style = {styles.eventButtonText}>Interested</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onShare} style = {styles.eventButtonContainer}>
                    <Text style = {styles.eventButtonText}>Share</Text>
                  </TouchableOpacity>

                </View>
              </View>
        </View>
      )
  }
  
  
  const setStatusSelection = status =>{
      setStatus(status)
      if(status === attending){
        setDataSwitch(attendingFeed)
      }
      if(status === interested){
        setDataSwitch(interestedFeed)
      }
  }
  useEffect(()=> {
    setStatusSelection
  }, [])
  
  const [openModal, SetOpenModal]= useState(false);
  const [openmodal2, setOpenModal2] = useState(false);
  const AnimatedBottomSheet = ({open, onClose}) =>{
    if (!open) return null;
    return(
    <Animated.View style={styles.bottomSheet}>
      <View style={{alignItems: 'center', marginTop: 3}}>
      <Text style={{fontSize: 20}}>Upload Profile Photo</Text>
      </View>
      <View style={{marginVertical: 10}}>
      <TouchableOpacity style={styles.modalbuttonContainer} onPress={choosePhotoFromLibrary}>
        <Text>Choose From Gallery</Text>
      </TouchableOpacity>
      </View>
      <View style={{marginVertical: 10}}>
      <TouchableOpacity style={styles.modalbuttonContainer} onPress={uploadImage}>
        <Text>Submit</Text>
      </TouchableOpacity>
      </View>
      
      <View style={{marginVertical: 10}}>
      <TouchableOpacity style={styles.modalbuttonContainer} onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'white', width: '100%', height: '53%', justifyContent: 'center', }}>
      <Image style={styles.imagePreview} source = {{uri: image}}/>
      </View>
    </Animated.View>
    )
    
  };
  const AnimatedBottomSheet2 = ({open, onClose}) =>{
    if (!open) return null;
    return(
    <Animated.View style={[{transform: [{ translateY: 0 }]}, styles.bottomSheet]}>
      <View style={{alignItems: 'center', marginTop: 3}}>
      <Text style={{fontSize: 20}}>Upload Cover Photo</Text>
      </View>
      <View style={{marginVertical: 10}}>
      <TouchableOpacity style={styles.modalbuttonContainer} onPress={choosePhotoFromLibrary}>
        <Text>Choose From Gallery</Text>
      </TouchableOpacity>
      </View>
      <View style={{marginVertical: 10}}>
      <TouchableOpacity style={styles.modalbuttonContainer} onPress={uploadCoverImage}>
        <Text>Submit</Text>
      </TouchableOpacity>
      </View>
      
      <View style={{marginVertical: 10}}>
      <TouchableOpacity style={styles.modalbuttonContainer} onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'white', width: '100%', height: '53%', justifyContent: 'center', }}>
      <Image style={styles.imagePreview} source = {{uri: image}}/>
      </View>
    </Animated.View>
    )
    
  };

  const changeStates = () =>{
    SetOpenModal(false);
    setImage(false)
    setOpenModal2(false);
  }


  console.log(imageUpload)
    return( 
      <View  style = {styles.container}>
        
      <View style = {styles.profileCarView} >
        <TouchableOpacity onPress={() => setOpenModal2(true)}>
          <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        </TouchableOpacity>
      </View>
  
      <View style = {styles.profilePictureView} >
        <View style ={{ width: '20%', alignSelf: 'center', paddingTop: 6}}>
            <TouchableOpacity style = {{alignSelf: 'center', borderRadius: 100/2}} onPress ={() => SetOpenModal(true)}>
            <Image style = {styles.profilePicture} source = {{uri: profilePhoto.profilePic}}/>
            </TouchableOpacity>
        </View>
      
            <Text style={{alignSelf:'center'}}>{auth.currentUser.email}</Text>
        <View style = {styles.profileOptionsView}>
          <TouchableOpacity style={[styles.profileButtons,  status ===  attending && {borderBottomColor: 'white',borderRadius:5 }]}
            onPress={() => setStatusSelection(attending)}>
              <Text>{attending}</Text>
          </TouchableOpacity>

            <TouchableOpacity style={[styles.profileButtons, status ===  interested && {borderBottomColor: 'white',borderRadius:5}]}
            onPress={() => setStatusSelection(interested)}>
            <Text>{interested}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.profileButtons, status ===  myEvents && {borderBottomColor: 'white',borderRadius:5}]}
            onPress={() => setStatusSelection(myEvents)}>
            <Text>{myEvents}</Text>
          </TouchableOpacity>
          </View>
      </View>
        <View style = {styles.eventFeed}>
        <FlatList
          style={{ width: windowWidth, height: '100%', backgroundColor: 'red'}}
          data={dataSwitch}
          keyExtractor={(idx) => idx.description}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
          <AnimatedBottomSheet open={openModal} onClose={changeStates}></AnimatedBottomSheet>
          <AnimatedBottomSheet2 open={openmodal2} onClose={changeStates}></AnimatedBottomSheet2>
        </View>
      
    );
    
  }

  export default Profile;

  const styles = StyleSheet.create({
    container: {
      
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth,
      height: windowHeight,
      backgroundColor: "blue"
    },

    bottomSheet:{
      position: 'absolute',
      bottom: 0,
      width: windowWidth -20,
      height: 600,
      backgroundColor: 'white',
      marginHorizontal: 10,
      alignItems: "center",
      borderWidth: 4,
      borderRadius: 20
      },

    previewView:{
      backgroundColor: '#C4C4C4'
    },
    goingButton: {
      backgroundColor: '#17E217',
      height:30,
      width: 70,
      borderRadius: 5,
      marginRight: 5,
      marginVertical:2,
      alignItems: 'center',
      justifyContent:'center'
    },
    eventButtonText:{
      fontSize: 16,
      fontWeight: 'bold',
      width: 105,
      height: 21,
      textAlign: 'center',
      
    },

    imagePreview:{
      alignSelf: 'center',
      width:250,
      height:250
    },
    interestedButton:{
      backgroundColor: '#FFFF00',
      height:30,
      width: 75,
      borderRadius: 5,
      marginRight: 5,
      marginVertical:2,
      alignItems: 'center',
      justifyContent:'center',
      
    },
    eventButtonContainer: {
      backgroundColor: '#D8232F',
      height:30,
      width: 70,
      borderRadius: 5,
      marginRight: 5,
      marginVertical:2,
      alignItems: 'center',
      justifyContent:'center'

    },
    
    modalbuttonContainer:{
      height:35,
      width: 300,
      backgroundColor:'#D8232F',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 2
    },

    profileTabs:{
      backgroundColor:'orange'
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
      height: '20%',
      width: windowWidth
    },
    profileCar: {
      width: windowWidth
      
    },
    profilePictureView: {
      flex: .35,
      width: '100%',
      backgroundColor: '#C4C4C4',
    },
    profileButtons:{
      height: '100%',
      borderBottomWidth: 5,
      borderRadius: 5,
      justifyContent: 'space-evenly',
      paddingBottom: 5,
      marginBottom:2,
      
    },
    profilePicture: {
      height: 75,
      width: 75,
      borderRadius: 100/2,
      alignSelf: 'center',
      
    },
    profileNamePictureView:{
        
    },
    profileOptionsView : {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 30,
      backgroundColor:'#C4C4C4',
      paddingHorizontal: 15,
      marginTop: 9
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
      flex: 1.4,
      backgroundColor: 'pink',
      width: windowWidth
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
      justifyContent: 'flex-end', 
      backgroundColor: 'black'

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
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet, ScrollView,Image, Alert, ActivityIndicator, SafeAreaView, Share, Modal, Pressable, TouchableHighlight, TouchableOpacity, Platform} from 'react-native';
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
import { db, pathReference2, profilePicRef, jeremyPic, storage, storageRef} from "../firebase";
import { uploadBytes, ref } from '@firebase/storage';
import { collection, getDocs, addDoc} from "firebase/firestore/lite";
// To pick the file from local file system
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
import { async } from '@firebase/util';

//import ImagePicker from 'react-native-image-crop-picker';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth';
import {v4} from "react-native-uuid"

const Profile = ({navigation}) => {

  
  const[userComment, setComment] = React.useState("Comment");

  const[userReport, setReport] = React.useState("Report");

  const [eventList, setEventList] = useState([]);
  const [goingList, setGoingList] = useState([]);
  const [interestedList, setInterestedList] = useState([]);
  const [userEmail, setEmail] = useState([]);

  const [image, setImage] = useState(null);

  const [imageName, setImageName] = useState();

  const [currentDate, setCurrentDate] = useState('');

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [profilePageNum] = React.useState(2);

  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

 

  const PullData = async () => {
    const myDoc = collection(db, 'Users Events')
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEventList(snapList)

    const goingMyDoc = collection(db, 'Users Going Events')
    const goingSnapShot = await getDocs(goingMyDoc);
    const goingSnapList = goingSnapShot.docs.map(doc => doc.data());
    setGoingList(goingSnapList)

    const intestedMyDoc = collection(db, 'Users Intersted Events')
    const intestedSnapShot = await getDocs(intestedMyDoc);
    const interestedSnapList = intestedSnapShot.docs.map(doc => doc.data());
    setInterestedList(interestedSnapList)
  }

  const SignOut = async () => {
    const docRef =  addDoc(collection(db, "User SignOut"), {
      email: userEmail,
      time: currentDate,
      signedIn: 'no'
    });
    navigation.navigate("Home")
  }

  const PullUserEmail = async () => {
    const myDoc = collection(db, "UserIDs")
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEmail(snapList)
    console.log(snapList);
  }

  const reportContent = async () => { 
    // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Reported Events"), {
  eventName: "Event",
  user: userReport
});

console.log("Document written with ID: ", docRef.id);

  }

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };

  const  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    this.setState({ uploading: true });
    firebase
      .storage()
      .ref(`TestPictures/${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: '',
              progress: 0,
              images: allImages
            };
            AsyncStorage.setItem('images', JSON.stringify(allImages));
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        }
      );
  };

  const uploadImage2 = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage(null);
  };

  const uploadImage3 = async () => {
    console.log("Entered Upload Image");
      const imageRef = ref(storage, 'assests/ProfilePicture/${imageUpload.name + v4()}');
      uploadBytes(imageRef, image);
      console.log("Image Uploaded");
  }

    //Call when component is rendered
    useEffect(() => {
      PullData();
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

    const [modalVisible, setModalVisible] = useState(false);
    

    const renderUserEmail = ({ item }) => {
      return(
        <View>
          <Text>{item.email}</Text>
          <Text>{item.user_id}</Text>
        </View>
      )
    }

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

    const interestedInEvent = async () => { 
      // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "Users Interested Events"), {
    username: "Jeremy",
    event: userEvent
  });
  
  console.log("Document written with ID: ", docRef.id);
  
    }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    

    const renderItem = ({ item }) => {

      
      return(
        <View style = {styles.eventsBackground}>
          <View style = {styles.eventsProfilePost}>
          <Image style = {styles.eventsProfilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
            <Text style = {styles. eventsUserName}>{item.username}</Text>
          </View>
        <Image style = {styles.carPics} source = {require('../assets/Cars/FordMustang.jpg')}/>
          <Image>{item.url}</Image>
          <Text>{item.eventPic}</Text>

          <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(modalVisible);
                  }}
                >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  <Text style = {styles.eventText}>{item.title}</Text>
                  <Text style = {styles.eventText}>{item.date}</Text>
                  <Text style = {styles.eventText}>{item.time}</Text>
                  <Text style = {styles.eventText}>{item.username}</Text>
                    <Text style={styles.modalText}>Enter Why this content is being reported</Text>
                      <TextInput 
                       onChangeText = {setReport}>Enter Text</TextInput>

            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                   <Button
                    title="Report!"
                    color='#D8232F'
                    onPress={reportContent}
                  />
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

          <View  style = {styles.eventRender}>
          <Text style = {styles.eventText}>{item.title}</Text>
          </View>

          <View style = {styles.eventRender}>
            <Text style = {styles.eventText}>{item.date}</Text>
            <Text style = {styles.eventText}>{item.time}</Text>
          </View>
         
          <View style = {styles.eventRender}>
            <Text style = {styles.eventText}>{item.address}</Text>
            <Text style = {styles.eventText}>{item.city}</Text>
            <Text style = {styles.eventText}>{item.state}</Text>
          </View>

          <View style = {styles.eventRender}>
            <Text style = {styles.eventText}>{item.description}</Text>
            <Text style = {styles.eventText}>{item.username}</Text>
          </View>

          <Button
                    title="Comment!"
                    color='#D8232F'
                    onPress={() => navigation.navigate("Comments")}
                  />


          <View style = {styles.eventButton}>

          <TouchableHighlight onPress={interestedInEvent}>
                  <View style={styles.interestedButton}>
                    <Text >Interested</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={onShare}>
                  <View style={styles.shareButton}>
                    <Text>Share Event!</Text>
                  </View>
                </TouchableHighlight>

              </View>

        </View>
      )
    }

    return(
      <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">

        <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
        
        <ScrollView style = {styles.userInfo}>
        <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {userEmail}
              renderItem = {renderUserEmail}
              />
        </ScrollView>

        <Button
                    title="Sign Out!"
                    color='#D8232F'
                    onPress={SignOut}
                  />
       
        <Text style = {styles.pageName}>Attending</Text>
        
        </View>
        
        <ScrollView style = {styles.eventDetails}>
          <View>
            <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {goingList}
              renderItem = {renderItem}
              />
          </View>

          </ScrollView>
      </View>

      <View key="2">
      <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
        <ScrollView style = {styles.userInfo}>
        <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {userEmail}
              renderItem = {renderUserEmail}
              />
        </ScrollView>

        

    <View style = {styles.imageContainer}>
    <Text>Interested</Text>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage3}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
    </View>

            

    
          
        </View>

        <ScrollView style = {styles.eventDetails}>
          <View>
            <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {interestedList}
              renderItem = {renderItem}
              />
          </View>

          </ScrollView>

          
       
       
      </View>

      <View key="3">
      <View style = {styles.headerView}>
        <Image style = {styles.profileCar} source = {require('../assets/Cars/FordMustang.jpg')}/>
        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
        <ScrollView style = {styles.userInfo}>
        <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {userEmail}
              renderItem = {renderUserEmail}
              />
        </ScrollView>

        <Text  style = {styles.pageName}>My Events</Text>
        </View>

      

        

<Button
                    title="Create Event!"
                    color='#17E217'
                    onPress={() => navigation.navigate("CreateEvent")}
                    
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

  export default Profile;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      marginTop: 30
    },
    headerView: { 
     backgroundColor: '#C4C4C4'
    },
    pagerView: {
      flex: 1,
     
    },
    userInfo: {
        marginLeft: 100,
       
    },
    pageName: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    eventsBackground: {
      backgroundColor: '#C4C4C4'
    },
    eventRender: {
      flexDirection: 'row'
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
    interestedButton: {
      backgroundColor: '#FFFF00',
      height: 30,
      borderRadius: 10,
    },
    shareButton: {
      backgroundColor: '#00FF00',
      height: 30,
      borderRadius: 10
    },
    buttonText: {
    
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
      fontFamily: 'sans-serif',
      marginRight: 5
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
    },
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
  });
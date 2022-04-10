import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Picker, StyleSheet, ScrollView,Image, FlatList, Alert, ActivityIndicator, Share, Modal, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-gesture-handler';
import { db, writeUserData } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";

const Comments = ({navigation}) => {

    const[userComment, setComment] = React.useState("Comment");
    const [userEmail, setEmail] = useState([]);

    const [userReplies, setReplies] = useState([]);

    const[userReport, setReport] = React.useState("Report");

    const[userName, setUserName] = React.useState("UserName");

  const[eventDate, setDate] = React.useState("Date");
  const[eventTime, setTime] = React.useState("Time");
  const[eventCity, setCity] = React.useState("City");
  const[eventState, setState] = React.useState("State");
  const[eventTitle, setTitle] = React.useState("Title");
  const[eventDescription, setDescription] = React.useState("Description");

  const [modalVisible, setModalVisible] = useState(false);
  

  const PostData = async () => { 
    // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "User Replies"), {
  username: userName,
  comment: userComment
});
const userReplies = collection(db, 'User Replies')
    const repliesSnapshot = await getDocs(userReplies)
    const repliesList = repliesSnapshot.docs.map(doc => doc.data());
    setReplies(repliesList)
    console.log(repliesList)
console.log("Document written with ID: ", docRef.id);

  }

  const PullUserEmail = async () => {
    const myDoc = collection(db, "UserIDs")
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setEmail(snapList)
    console.log(snapList);
  }

  const PullUserComments = async () => {
    const myDoc = collection(db, 'User Replies')
    const snapShot = await getDocs(myDoc);
    const snapList = snapShot.docs.map(doc => doc.data());
    setReplies(snapList)
    console.log(snapList);
  }


  const renderUserEmail = ({ item }) => {
     
    return(
      <View>
        <Text>{item.email}</Text>
        <Text>{item.user_id}</Text>
      </View>
    )
  }

  const renderComment = ({ item }) => {
    return(
   
     <View>
        <Text>{item.username}</Text>
        <Text>{item.comment}</Text>
     </View>

    )
  }

    return(
      <View  style = {styles.container}  >

        <View style = {styles.topComment}>
            <Text style = {styles.comment}>Comments</Text>
        </View>

        <View style = {styles.commentSection}>
            <View style = {styles.commentSectionTop}>
                
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
              <Text style={styles.modalText}>Type out reply</Text>
              <TextInput
              onChangeText = {setComment}>Enter Text</TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                  
                 <Button
                    title="Comment!"
                    color='#D8232F'
                    onPress={PostData}
                  />
                <Text style={styles.textStyle}>Close Comment</Text>
              </Pressable>
              
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
        
        </Pressable>
      
            </View>

            <View style = {styles.commentSectionTop}>

<View style = {styles.replieSections}>

<Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>

<View style = {styles.userInfo}>
<FlatList style = {{flex: 1, width: '100%', height: '100%'}}
      data = {userEmail}
      renderItem = {renderUserEmail}
      />
</View>
<ScrollView>
<FlatList style = {{flex: 1, width: '100%', height: '100%'}}
      data = {userReplies}
      renderItem = {renderComment}
      />
</ScrollView>
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
      <Text style={styles.modalText}>Type out reply</Text>
      <TextInput
      onChangeText = {setComment}>Enter Text</TextInput>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
         <Button
            title="Comment!"
            color='#D8232F'
            onPress={PostData}
          />
        <Text style={styles.textStyle}>Close Comment</Text>
      </Pressable>
    </View>
  </View>
</Modal>
<Pressable
  style={[styles.button, styles.buttonOpen]}
  onPress={() => setModalVisible(true)}
>
  <Text style={styles.textStyle}>Reply</Text>
</Pressable>
    </View>
</View>

<View style = {styles.commentSectionTop}>

<View style = {styles.replieSections}>

<Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
          
<View>
<FlatList style = {{flex: 1, width: '100%', height: '100%'}}
      data = {userEmail}
      renderItem = {renderUserEmail}
      />
</View>
<ScrollView>
<FlatList style = {{flex: 1, width: '100%', height: '100%'}}
      data = {userReplies}
      renderItem = {renderComment}
      />
</ScrollView>
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
      <Text style={styles.modalText}>Type out reply</Text>
      <TextInput
      onChangeText = {setComment}>Enter Text</TextInput>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
         <Button
            title="Comment!"
            color='#D8232F'
            onPress={PostData}
          />
        <Text style={styles.textStyle}>Close Comment</Text>
      </Pressable>
    </View>
  </View>
</Modal>
<Pressable
  style={[styles.button, styles.buttonOpen]}
  onPress={() => setModalVisible(true)}
>
  <Text style={styles.textStyle}>Reply</Text>
</Pressable>
    </View>
</View>

            <View style = {styles.commentSectionTop}>

        <View style = {styles.replieSections}>

        <Image style = {styles.profilePicture} source = {require('../assets/ProfilePicture/profilePic.png')}/>
        
        <View>
        <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {userEmail}
              renderItem = {renderUserEmail}
              />
        </View>

        <ScrollView>
        <FlatList style = {{flex: 1, width: '100%', height: '100%'}}
              data = {userReplies}
              renderItem = {renderComment}
              />
        </ScrollView>
        
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
              <Text style={styles.modalText}>Type out reply</Text>
              <TextInput
              onChangeText = {setComment}>Enter Text</TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                 <Button
                    title="Comment!"
                    color='#D8232F'
                    onPress={PostData}
                  />
                <Text style={styles.textStyle}>Close Comment</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Reply</Text>
        </Pressable>
            </View>
        </View>

        </View>

       

        <Button
                    title="UserData!"
                    color='#17E217'
                    onPress={PullUserEmail}
                    
                  />

<Button
                    title="Comments!"
                    color='#17E217'
                    onPress={PullUserComments}
                    
                  />
      
      
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
    userInfo: {
       
    },
    replieSections: {
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
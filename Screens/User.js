import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_STORAGE, db } from '../firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { doc, collection, getDocs, query} from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Spinner} from "../Components/Spinner"
import ExportButton from '../Components/ExportData';

export default function Users({ userData }) {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfilePicture, setUserProfilePicture] = useState(null)
  const [workouts, setWorkouts] = useState([])

  const { width } = Dimensions.get('window');
  const buttonWidth = width * 0.8; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        setUser(currentUser);

        const profilePictureRef = ref(FIREBASE_STORAGE, `Users/${currentUser.uid}/profile_picture.png`);
        const url = await getDownloadURL(profilePictureRef);
        setUserProfilePicture(url);
        
        console.log(url)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // Redirect or perform any additional actions after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  return (
    <View style={styles.container}>
      
      <Spinner isLoading={isLoading} /> 
      {!isLoading && ( // Conditionally render content if not loading
        <>
          <View style={styles.settingsContainer}>
          <Text style={{ fontSize: 20, color: "white" }}>Account Details</Text>

            <Text style={{ fontSize: 20, color: "white" }}></Text>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
              <Ionicons name="settings-sharp" size={32} color="white" />
            </TouchableOpacity>
          </View>

          
            <View style={styles.usersContainer}>
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePictureBorder}>
                {/* Profile picture */}
                {userProfilePicture && (
                  <Image source={{ uri: userProfilePicture}} style={styles.profilePicture} />
                )}
              </View>
            </View>
              <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
                <View style={[styles.column, { flex: 0.35 }]}>
                  <Text style={[styles.text]}>Name: </Text>
                </View>
                <View style={[styles.column, { flex: 0.65 }]}>
                  <Text style={styles.text}>{userData.name}</Text>
                </View>
              </View>
              <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
                <View style={[styles.column, { flex: 0.35 }]}>
                  <Text style={[styles.text]}>Email:</Text>
                </View>
                <View style={[styles.column, { flex: 0.65 }]}>
                  <Text style={styles.text}>{user.email}</Text>
                </View>
              </View>
              <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
                <View style={[styles.column, { flex: 0.35 }]}>
                  <Text style={[styles.text]}>Gender:</Text>
                </View>
                <View style={[styles.column, { flex: 0.65 }]}>
                  <Text style={styles.text}>{userData.gender}</Text>
                </View>
              </View>
              <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
                <View style={[styles.column, { flex: 0.35 }]}>
                  <Text style={[styles.text]}>Weight: </Text>
                </View>
                <View style={[styles.column, { flex: 0.65 }]}>
                  <Text style={styles.text}>{userData.weight}</Text>
                </View>
              </View>
              <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
                <View style={[styles.column, { flex: 0.35 }]}>
                  <Text style={[styles.text]}>Coach Code </Text>
                </View>
                <View style={[styles.column, { flex: 0.65 }]}>
                  <Text style={styles.text}>{userData.coachCode}</Text>
                </View>
              </View>
              {/* <View style={styles.row}>
                <View style={[styles.itemContainer, { width: 175, marginRight: 10 }]}>
                  <View style={[styles.column, { alignItems: "center" }]}>
                    <Text style={[styles.text, { paddingTop: 35 , paddingBottom: 35}]}>7 sessions this week!</Text>
                  </View>
                </View>
                <View style={[styles.itemContainer, { width: 175 }]}>
                  <View style={[styles.column, { alignItems: "center" }]}>
                    <Text style={styles.text}>Account created 291 days ago</Text>
                  </View>
                </View>
              </View> */}
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button,{ width: buttonWidth },{backgroundColor:'#66AEC5'} ]} onPress={handleSignOut} >
              <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
              
              <ExportButton width={buttonWidth} data={workouts}/>
              </View>
              <View style={styles.itemContainer}>
                <View style={[styles.column, { alignItems: "center" }]}>
                  {/* <Image style={styles.image} source={require('../assets/avatar-female.png')} /> */}
                </View>
              </View>
            </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F283A",
    paddingTop: 80,
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  usersContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 100,
    paddingTop: 10,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#2B2D42",
    borderRadius: 15,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 400,
  },
  column: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  profilePictureContainer: {
    width: 120,
    height: 120, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  profilePictureBorder: {
    width: 110, 
    height: 110, 
    borderRadius: 50, 
    backgroundColor: '#66AEC5', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50, 
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#030303', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  
})
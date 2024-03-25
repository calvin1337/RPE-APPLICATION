import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FIREBASE_AUTH } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Spinner} from "../Components/Spinner"

export default function Users({ userData }) {
  const firebaseImageUrl = 'https://firebasestorage.googleapis.com/v0/b/rpe-app-cc0c7.appspot.com/o/image1.png?alt=media&token=b719b3ac-8fe1-42ff-9a44-03d735e8891f';

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        setUser(currentUser);
        // Fetch sessions data from Firebase and calculate sessions for this week
        const today = new Date();
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
        const sessionsRef = FIREBASE_DB.ref('sessions'); // Replace 'sessions' with your Firebase database reference
        sessionsRef.orderByChild('userId').equalTo(currentUser.uid).once('value', (snapshot) => {
          let count = 0;
          snapshot.forEach((childSnapshot) => {
            const sessionDate = new Date(childSnapshot.val().date);
            if (sessionDate >= startOfWeek && sessionDate <= endOfWeek) {
              count++;
            }
        });
        setSessionsThisWeek(count);
      });


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        if (userData !== null) {
          setIsLoading(false);
        }
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

  const navigation = useNavigation();

  const navigateToSettings = () => {
    // Navigate to the Settings screen
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      
      <Spinner isLoading={isLoading} /> 
      {!isLoading && ( // Conditionally render content if not loading
        <>
          <View style={styles.settingsContainer}>
            <Text style={{ fontSize: 20, color: "white" }}></Text>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
              <Ionicons name="settings-sharp" size={32} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <Text style={{ fontSize: 20, color: "white", paddingLeft: 30, paddingBottom: 25 }}>Account Details</Text>
            <View style={styles.usersContainer}>
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
              <View style={styles.row}>
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
              </View>
              <Button title="Sign Out" onPress={handleSignOut} />
              <View style={styles.itemContainer}>
                <View style={[styles.column, { alignItems: "center" }]}>
                  {/* <Image style={styles.image} source={require('../assets/avatar-female.png')} /> */}
                </View>
              </View>
            </View>
          </ScrollView>
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
    borderRadius: 15
  }})
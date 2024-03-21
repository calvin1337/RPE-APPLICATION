import { View, Text, ImageBackground, StyleSheet, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../firebase';


export default function User({ userData }) {
  const firebaseImageUrl = 'https://firebasestorage.googleapis.com/v0/b/rpe-app-cc0c7.appspot.com/o/image1.png?alt=media&token=b719b3ac-8fe1-42ff-9a44-03d735e8891f';

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    setUser(currentUser);
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
    <ImageBackground source={{ uri: firebaseImageUrl }} style={styles.backgroundImage}>
    
      <Text style={styles.text}>User Page</Text>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1F283A' }}>
      <Text style={{ color: 'white' }}>User Page</Text>
      {user && (
        <View>
          <Text style={styles.label}>Email: {user.email}</Text>
          <Text style={styles.label}>Name: {userData.name}</Text>
          <Text style={styles.label}>Gender: {userData.gender}</Text>
          <Text style={styles.label}>Weight: {userData.weight}</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </View>
      )}
    </View>
    </ImageBackground>
  )
}
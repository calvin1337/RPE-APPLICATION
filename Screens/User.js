import { View, Text, ImageBackground, Button, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 45, 66, 0.7)'
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
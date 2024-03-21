import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../firebase';

export default function User({ userData }) {
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
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    marginBottom: 10, 
  },
});
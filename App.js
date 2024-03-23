import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Navigation from './Navigation';
import { FIREBASE_AUTH, db } from './firebase'; 
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(async (user) => {
      setUser(user); 

      if (user) {
        
        try {
          const userDocRef = doc(db, 'Users', user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            setUserData(userDocSnapshot.data()); 
          } else {
            console.log('User data not found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null); 
      }
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Navigation user={user} userData={userData} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F283A',
  },
});


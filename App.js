import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Navigation from './Navigation';
import { FIREBASE_AUTH, db } from './firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { Spinner } from './Components/Spinner';

export default function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);


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
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
    <Spinner isLoading={isLoading} />
      {!isLoading && (
        <Navigation user={user} userData={userData} /> 
      )}    
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F283A',
  },
});


import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react'


export default function User() {
  const firebaseImageUrl = 'https://firebasestorage.googleapis.com/v0/b/rpe-app-cc0c7.appspot.com/o/image1.png?alt=media&token=b719b3ac-8fe1-42ff-9a44-03d735e8891f';

  return (
    <ImageBackground source={{ uri: firebaseImageUrl }} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.text}>User Page</Text>
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
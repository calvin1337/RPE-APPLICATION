import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

export const RPELogo = () => {
  return(
    <View style={styles.logoContainer}>
        <Image
        source={{uri: "https://firebasestorage.googleapis.com/v0/b/rpe-app-cc0c7.appspot.com/o/logo2.png?alt=media&token=089691ad-9c1a-4f48-8d7d-04d67979c552"}}
        style={styles.logo}
        resizeMode="contain" 
      />
</View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 70, 
    width: 100,
    resizeMode: 'cover', 
  },
});
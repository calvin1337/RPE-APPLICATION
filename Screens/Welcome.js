import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.8; 

export default function Home({ setSignedIn} ) {
  const navigation = useNavigation();

  const guestLoginButton = () => {
    setSignedIn(true);
  };

  const getStartedButton = () => {
    navigation.navigate("GenderPick")
  };
  
    return (
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1553969546-6f7388a7e07c?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.backgroundImage}> 
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button,{ width: buttonWidth }, {backgroundColor: '#AEAEAE'}]} onPress={guestLoginButton}>
            <Text style={styles.buttonText}>Guest Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{ width: buttonWidth }, {backgroundColor:'#66AEC5'}]} onPress={getStartedButton}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(43, 45, 66, 0.7)'
    },
    bottomContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 40,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginVertical: 10,
    },
    buttonText: {
      color: '#030303', 
      fontWeight: 'bold',
      textAlign: 'center'
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', 
    },
  
   
  });
  

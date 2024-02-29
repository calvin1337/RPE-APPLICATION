import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.4; 
const plusButtonWidth = width * 0.5;

export default function AddPhoto( ) {

  
  
    return (
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1579156618590-01d6ca62403d?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.backgroundImage}> 
      <View style={styles.container}>
      <View style={styles.topContainer}>
      <Text style={{textAlign:'center', margin: 10, color: '#EDF2F4', fontSize: 20, fontWeight: 'bold'}}>Add Photo!</Text>
      <Text style={{textAlign:'center', margin: 10, color: '#EDF2F4', fontSize: 14, fontWeight:'300'}}>Adding a photo will help you customise your account and will help your coach identify you quicker.</Text>      
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.plusButton} >
        <Ionicons name="add" size={100} color="white" style={{textAlign: 'center', width: plusButtonWidth,  }}/>
        </TouchableOpacity>
        </View>
      </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button,{ width: buttonWidth }, {backgroundColor:'#66AEC5'}]}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 100, 
      backgroundColor: 'rgba(43, 45, 66, 0.7)'
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 40, 
      left: 0,
      right: 0,
      alignItems: 'center',
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
    plusButton: {
      width: plusButtonWidth,
      height: plusButtonWidth, 
      borderRadius: plusButtonWidth / 2, 
      backgroundColor: 'rgba(27, 23, 39, 0.8)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      marginTop: 100,
      alignItems: 'center',
    }
  
   
  });
  

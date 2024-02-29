import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.5; 

export default function GenderPick() {
  
  const navigation = useNavigation();
  const selectGender = (gender) => {
    navigation.navigate('WeightPicker', { Gender: gender });

  }

  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.backgroundImage}> 

    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => selectGender("Male")}>
        <Ionicons name="man" size={100} color="white" style={{textAlign: 'center', width: buttonWidth,  }}/>
        <Text style={{textAlign:'center', margin: 10, color: 'white'}}>Male</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => selectGender("Female")}>
        <Ionicons name="woman" size={100} color="white" style={{textAlign: 'center', width: buttonWidth }} />
        <Text style={{textAlign:'center', margin: 10, color: 'white'}}>Female</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 45, 66, 0.7)'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  button: {
    width: buttonWidth,
      height: buttonWidth, 
      borderRadius: buttonWidth / 2, 
      backgroundColor: 'rgba(27, 23, 39, 0.8)',
      alignItems: 'center',
      justifyContent: 'center',
    
  },
  buttonContainer: {
    marginTop: 100
  }
 
});
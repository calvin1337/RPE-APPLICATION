import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';


const { width } = Dimensions.get('window');
const buttonWidth = width * 0.4; 

export default function CreateAccount({ route, setSignedIn }) {

  const [checked, setChecked] = useState(false);

  const { Gender, Weight, Email, Password } = route.params;
  
  const createUserAccount = () => {
    setSignedIn(true)
  }
  
    return (
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.backgroundImage}> 
      <View style={styles.container}>
      <View style={styles.topContainer}>
      <Text style={{textAlign:'center', margin: 10, color: '#EDF2F4', fontSize: 20, fontWeight: 'bold'}}>Check Your Information</Text>
      <View style={styles.infoContainer}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Email:</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Email}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Password:</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Password}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Gender:</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Gender}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Weight:</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Weight}</Text>
        </View>
        </View>
        <View style={styles.checkboxContainer}>
        { <TouchableOpacity onPress={() => setChecked(!checked)}>
                <Ionicons
                  name={checked ? 'checkbox' : 'checkbox-outline'}
                  size={24}
                  color={checked ? '#66AEC5' : '#EDF2F4'}
                />
          </TouchableOpacity>
        }
        </View>
      
      </View>
      </View>
      <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button,{ width: buttonWidth }, {backgroundColor:'#66AEC5'}]} onPress={() => createUserAccount(true)}>
            <Text style={styles.buttonText}>Create Account</Text>
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
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', 
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
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    column: {
      flex: 1,
      marginHorizontal: 5,
      padding: 10,
      alignItems: 'center',
      alignItems: 'flex-start'
    },
    text: {
      margin: 10, 
      color: '#EDF2F4', 
      fontSize: 14, 
      fontWeight: 'bold',
    
      
    },
    infoContainer: {
      paddingTop: 40
    },
    label: {
      marginLeft: 8,
      fontSize: 16,
    },
    checkboxContainer: {

    }
    
  });
  
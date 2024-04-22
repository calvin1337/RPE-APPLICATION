import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton';
import * as ImagePicker from 'expo-image-picker';
import { RPELogo } from '../Components/Logo';



const { width } = Dimensions.get('window');
const buttonWidth = width * 0.8; 
const plusButtonWidth = width * 0.5;



export default function AddPhoto( { route }) {

  const { Gender, Weight, Email, Password } = route.params;
  const [selectedImage, setSelectedImage] = useState(null)
  const navigation = useNavigation();



  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the photo library is required to pick an image.');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });
  
    console.log('ImagePicker result:', result); 
  
    if (result.cancelled) {
      console.log('Image selection cancelled');
    } else if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log('URI undefined or unexpected result');
    }
  };

  const savePhoto = () => {
    const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg';
    const profilePicture = selectedImage || defaultImageUrl;
    navigation.navigate('LoginInfo', { Gender: Gender, Weight: Weight, Email: Email, Password: Password, ProfilePicture: profilePicture  });
    
  };

    return (
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1579156618590-01d6ca62403d?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.backgroundImage}> 
      <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <RPELogo />
      <View style={styles.topContainer}>
      <Text style={{textAlign:'center', margin: 40, color: '#EDF2F4', fontSize: 20, fontWeight: 'bold'}}>Add Photo!</Text>
      <Text style={{textAlign:'center', margin: 10, color: '#EDF2F4', fontSize: 14, fontWeight:'300'}}>Adding a photo will help you customise your account and will help your coach identify you quicker.</Text>      
      <View style={styles.buttonContainer}>
      {/* Add Photo */}
      <TouchableOpacity onPress={pickImage} style={styles.plusButton}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Ionicons name="add" size={100} color="white" />
        )}
      </TouchableOpacity>
        </View>
      </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button,{ width: buttonWidth }, {backgroundColor:'#66AEC5'}]} onPress={() => savePhoto("")}>
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
      marginTop: 50,
      alignItems: 'center',
    },
    selectedImage: {
      width: plusButtonWidth,
      height: plusButtonWidth,
      borderRadius: plusButtonWidth / 2, 
    },
  
   
  });
  

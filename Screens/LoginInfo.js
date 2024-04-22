import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground, TextInput, HighlightedText } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FIREBASE_AUTH, FIREBASE_STORAGE, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from "react";
import BackButton from '../Components/BackButton';
import { RPELogo } from '../Components/Logo';


const { width } = Dimensions.get("window");
const buttonWidth = width * 0.8;
const inputWidth = width * 0.8;

export default function LoginInformation({ route  }) {
  const [email, setEmail] = useState("");
  const [usersName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  const [emailError, setEmailError] = useState("")
  const { Gender, Weight, ProfilePicture } = route.params;
  const [checked, setChecked] = useState(false);
  
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH
  

  // Function to save email and password
  const saveLoginInformation = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('UserCredential:', userCredential);
      const user = userCredential.user;
      const userId = user.uid;
      const userDocRef = doc(db, 'Users', userId);

      
      const code = generateCoachCode()
      
      const userData = {
        name: usersName,
        weight: Weight,
        gender: Gender,
        coachCode: code
      };

      setDoc(userDocRef, userData)
      uploadProfilePicture(userId, ProfilePicture)
      
        .then(() => {
          console.log("User data saved successfully!");
          
        })
        .catch((error) => {
          console.error("Error saving user data: ", error);
        });
      
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("Firebase Error Code:", error.code);
      switch (errorCode) {
        case "auth/invalid-email":
          setEmailError("Invalid Email Address")
          setPasswordError("");
          break;
        case "auth/email-already-in-use":
          setEmailError("Email address is already in use");
          setPasswordError("");
          break;
        case "auth/weak-password":
          setPasswordError("The password is too weak");
          setEmailError("")
          break;
        case "auth/missing-password":
          setPasswordError("Please enter a password");
          setEmailError("")
        default:
          break;
      }
    });
  };

  const uploadProfilePicture = async (userId, profilePictureUri) => {
    
    const storageRef = ref(FIREBASE_STORAGE, `Users/${userId}/profile_picture.png`);

    try {
      const response = await fetch(profilePictureUri);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, { contentType: 'image/png' });
      console.log('Profile picture uploaded successfully.');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const generateCoachCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomCode = Array.from({ length: 4 }, () => 
    characters.charAt(Math.floor(Math.random() * characters.length))).join('');

    const currentDate = new Date()
    const day = currentDate.getDate()
    const year = currentDate.getYear()

    code = randomCode + day + year
    return code
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <RPELogo />
        <View style={styles.topContainer}>
          <Text
            style={{
              textAlign: "center",
              margin: 20,
              color: "#EDF2F4",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Enter Login Information
          </Text>
          <View style={styles.inputContainer}>
           
            <TextInput
              style={[styles.input, { width: inputWidth }]}
              value={usersName}
              onChangeText={setName}
              placeholder="Enter your name"
              autoCapitalize="none"
              placeholderTextColor="#EDF2F4"
            />
            {emailError ? (
            <Text style={styles.error}>{emailError}</Text> 
          ) : <Text></Text>}
          </View>
          <View style={styles.inputContainer}>
            
            <TextInput
              style={[styles.input, { width: inputWidth }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#EDF2F4"
            />
            {emailError ? (
            <Text style={styles.error}>{emailError}</Text> 
          ) : <Text></Text>}
          </View>
          <View style={styles.inputContainer}>
            
            
            <TextInput
              style={[styles.input, { width: inputWidth }]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={true}
              placeholderTextColor="#EDF2F4"
            />
            {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text> 
          ) : <Text></Text>}
          </View>
          
        
        <View style={styles.testStyle}>
        <Text style={styles.label}>Can update this information later</Text>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Gender: {Gender}</Text>
            <Text style={styles.infoLabel}>Weight: {Weight}</Text>
          </View>
        </View>
        <View style={styles.checkboxContainer}>
        { <TouchableOpacity onPress={() => setChecked(!checked)}>
                <Ionicons
                  name={checked ? 'checkbox' : 'square'}
                  size={24}
                  color={checked ? '#66AEC5' : '#EDF2F4'}
                />
          </TouchableOpacity>
        }
        <Text style={styles.checkboxLabel}>Tick this box if you would like to receive emails with news. updates amd upcoming events</Text>
        </View>
        </View>
        <View style={styles.testStyle}>
        <View style={styles.infoContainer}>
        <Text style={styles.checkboxLabel}>
      By creating an account, you are accepting our{' '} 
      <Text style={{ color: '#FF9A62', fontWeight: 'bold', textDecorationLine: 'underline' }}>Terms</Text>
      {' '} and your data may be used for studies by Napier.
    </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { width: buttonWidth },
              { backgroundColor: "#66AEC5" },
            ]}
            onPress={() => saveLoginInformation("")}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(43, 45, 66, 0.7)",
    height: "100%",
  },
  bottomContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingBottom: 40,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#030303",
    fontWeight: "bold",
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  topContainer: {
    alignItems: "center",
    width: "100%",
    paddingTop: 100,
  },
  inputContainer: {
    marginTop: 20,
    // marginBottom: 40,
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    color: "#EDF2F4",
  },
  input: {
    borderWidth: 1,
    borderColor: '#1B1727',
    borderRadius: 15, 
    padding: 10,
    fontSize: 16,
    height: 50,
    color: '#EDF2F4',
    backgroundColor: "#1B1727",
  },
  error: {
    color: 'red',
    fontSize: 14, 
    textAlign: 'center',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: "#1B1727",
   
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    alignItems: 'flex-start',
    
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: inputWidth,
    paddingHorizontal: 20,
    backgroundColor: "#2B2D42",
    borderRadius: 15, 
    
  },
  infoLabel: {
    fontSize: 16,
    color: "#EDF2F4",
    textAlign: 'center', 
    alignContent: 'center' 
  },
  testStyle: {
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },
  checkboxContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: inputWidth,
  },
  checkboxLabel: {
    fontSize: 10,
    color: "#EDF2F4",
  }
  
});

import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FIREBASE_AUTH } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";


const { width } = Dimensions.get("window");
const buttonWidth = width * 0.4;
const inputWidth = width * 0.8;

export default function LoginInformation({ route, setSignedIn  }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  const [emailError, setEmailError] = useState("")
  const { Gender, Weight } = route.params;
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH
  

  // Function to save email and password
  const saveLoginInformation = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('UserCredential:', userCredential);
      setSignedIn(true)
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

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text
            style={{
              textAlign: "center",
              margin: 10,
              color: "#EDF2F4",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Login Information
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
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
            <Text style={styles.label}>Password:</Text>
            
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
        <Text style={styles.label}>Check if this information is correct</Text>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Gender: {Gender}</Text>
            <Text style={styles.infoLabel}>Weight: {Weight}</Text>
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
        <Text style={styles.infoLabel}>Checkbox text</Text>
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
  }
});

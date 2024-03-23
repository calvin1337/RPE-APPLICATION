import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import BackButton from '../Components/BackButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.8;
const inputWidth = width * 0.8;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      
      errorCode = error.code
      console.log(errorCode)
      switch (errorCode) {
        case "auth/invalid-email":
          setError("Invalid Email Address")
          break;
        case "auth/missing-password":
          setError("Enter Password")
        case "auth/invalid-credential":
          setError("Incorrect Email or Password")
        default:
          setError("")
          break;
      }
    }
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1423068657086-889315a2eba8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
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
            Please enter your login
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
          </View>
          <Text style={styles.error}>{error}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { width: buttonWidth },
              { backgroundColor: "#66AEC5" },
            ]}
            onPress={handleSignIn} 
                      >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { width: buttonWidth },
              { backgroundColor: "#AEAEAE" },
            ]}
            
          >
            <Text style={styles.buttonText}>Forgot Password</Text>
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
    marginTop: 40,
    marginBottom: 40,
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
});
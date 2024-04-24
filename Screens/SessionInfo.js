import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Button, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RPELogo } from '../Components/Logo';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton';



export default function SessionInfo() {

  const navigation = useNavigation();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [toggleDontShowAgain, setToggleDontShowAgain] = useState(false)

  const handleDontShowAgain = () => {
    setToggleDontShowAgain(!toggleDontShowAgain)
  };

  const handleContinue = () => {
    navigation.navigate('HomePage')
    setDontShowAgain(toggleDontShowAgain)
  }



  return (
    <View style={styles.container}>
      <RPELogo />
      <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.settingsContainer}>
          <Text style={{ fontSize: 20, color: "white" }}>Session RPE Information</Text>
            <Text style={{ fontSize: 20, color: "white" }}></Text>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
              <Ionicons name="settings-sharp" size={32} color="white" />
            </TouchableOpacity>
          </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Before Starting Please Read!</Text>
        <Text style={styles.infoText}>
          This information can be found in the settings for future reference.
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>What is Session RPE?</Text>
        <Text style={styles.infoText}>
          Session Rating of Perceived Exertion (Session RPE) is a method used to quantify the intensity of a training session based on an individual's perception of effort.
        </Text>
        <Text style={styles.infoText}>
          It's a subjective measure that considers both the intensity and duration of exercise. Athletes rate their overall exertion level on a scale typically ranging from 1 to 10, with 1 being very low exertion and 10 being maximal exertion.
        </Text>
        <Text style={styles.infoText}>
          This subjective rating is multiplied by the duration of the session to calculate the session's overall training load.
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How is Session RPE used?</Text>
        <Text style={styles.infoText}>
          Session RPE can help coaches and athletes monitor and adjust training intensity to optimize performance and prevent overtraining.
        </Text>
        <Text style={styles.infoText}>
          By tracking Session RPE over time, athletes can identify trends in their training load and make informed decisions about their workout plans.
        </Text>
        <Text style={styles.infoText}>
          Additionally, coaches can use Session RPE to prescribe appropriate training loads for individual athletes based on their perceived exertion levels, helping to tailor workouts to their specific needs and goals.
        </Text>
        
      </View>
      <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to Use Session RPE Application</Text>
          <Text style={styles.infoText}>
            1. Select Session RPE: Start by selecting the perceived exertion level for your training session. You can do this by tapping on the corresponding buttons provided on the screen. Each button represents a different level of exertion, ranging from 1 (very low) to 10 (maximal).
          </Text>
          <Text style={styles.infoText}>
            2. Enter Workout Time: After selecting the Session RPE, enter the duration of your workout session in minutes using the input field provided. This helps calculate the overall training load for your session.
          </Text>
          <Text style={styles.infoText}>
            3. Add Workout: Once you've selected the Session RPE and entered the workout time, tap the "Add Workout" button to save your session to the app. You'll receive a confirmation message once the workout has been successfully added.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={handleDontShowAgain}>
          <Ionicons name={toggleDontShowAgain ? 'checkbox' : 'square'} size={24} color="white" />
          <Text style={styles.checkboxLabel}>Don't Show Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{ width: "100%" },{backgroundColor:'#66AEC5'} ]} onPress={() => handleContinue()}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F283A",
    
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    marginTop: 100,
    padding: 20
  },
  scrollView: {
    flex: 1,
  },
  usersContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 100,
    paddingTop: 10,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#2B2D42",
    borderRadius: 15,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 400,
  },
  column: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 4,
  },
  infoContainer: {
    marginBottom: 10,
    padding: 20
  },
  infoTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  checkboxLabel: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    paddingHorizontal: 20
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
})
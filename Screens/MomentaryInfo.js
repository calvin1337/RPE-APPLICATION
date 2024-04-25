import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Button, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RPELogo } from '../Components/Logo';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function MomentaryInfo() {

  const navigation = useNavigation();
  const [toggleDontShowAgain, setToggleDontShowAgain] = useState(false)


  const handleDontShowAgain = async () => {
    setToggleDontShowAgain(!toggleDontShowAgain)
  };

  const handleContinue = async () => {
    try {
      let dontShow = ""
      if (toggleDontShowAgain) {
        dontShow = "true";
        } else {
        dontShow = "false";
        setToggleDontShowAgain(false)
        }
      
      await AsyncStorage.setItem('dontShowAgainMomentary', dontShow);
    } catch (error) {
      console.error('Error saving dontShowAgain state:', error);
    }
    navigation.navigate("MRPE")

  };

  

  return (
    <View style={styles.container}>
      <RPELogo />
      <BackButton onPress={() => navigation.goBack()}/>
          <View style={styles.settingsContainer}>
          <Text style={{ fontSize: 20, color: "white" }}>Momentary RPE Information</Text>
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
        <Text style={styles.infoTitle}>What is Borg RPE Scale?</Text>
        <Text style={styles.infoText}>
          The Borg Rating of Perceived Exertion (RPE) Scale is a method used to gauge the intensity of physical activity based on an individual's subjective perception of effort.
        </Text>
        <Text style={styles.infoText}>
          It's a scale ranging from 6 to 20, where 6 indicates no exertion at all and 20 represents maximum exertion.
        </Text>
        <Text style={styles.infoText}>
          Users rate their perceived exertion level during exercise, considering factors such as heart rate, breathing, and overall feelings of exertion.
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How is Borg RPE Scale used?</Text>
        <Text style={styles.infoText}>
          The Borg RPE Scale is employed in various fields, including sports training, clinical settings, and research, to assess and regulate exercise intensity.
        </Text>
        <Text style={styles.infoText}>
          Athletes and individuals can use the scale to communicate their perceived exertion to trainers, coaches, or healthcare providers, facilitating appropriate adjustments to training programs or treatment plans.
        </Text>
        <Text style={styles.infoText}>
          Moreover, researchers utilize the Borg RPE Scale to collect data on perceived exertion levels during physical activity, aiding in the analysis of exercise tolerance, performance, and physiological responses.
        </Text>
        
      </View>
      <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to Use Momentary RPE Application</Text>
          <Text style={styles.infoText}>
            1. Select RPE: Begin by selecting the perceived exertion level (RPE) for your momentary assessment. Tap on the buttons representing different RPE levels ranging from 6 (no exertion) to 20 (maximal exertion).
          </Text>
          <Text style={styles.infoText}>
            2. Track Time: As you perform your activity, start the stopwatch by tapping the "Start" button. The timer will begin counting the duration of your workout session. If you need to pause the stopwatch, tap the "Pause" button.
          </Text>
          <Text style={styles.infoText}>
            3. Record Entries: After each interval of your workout, tap the "Add Time Entry" button to record your RPE along with the time elapsed since the last entry. This helps in tracking your exertion levels throughout the session.
          </Text>
          <Text style={styles.infoText}>
            4. Finish Workout: Once you've completed your workout, tap the "Finish Workout" button. Confirm your action, and the app will save your workout data, including RPE levels and workout durations, for future reference.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={handleDontShowAgain}>
          <Ionicons name={toggleDontShowAgain ? 'checkbox' : 'square'} size={24} color="white" />
          <Text style={styles.checkboxLabel}>Don't Show Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{ width: "100%" },{backgroundColor:'#66AEC5'} ]} onPress={() => handleContinue(toggleDontShowAgain)}>
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
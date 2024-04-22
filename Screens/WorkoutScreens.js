import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { RPELogo } from "../Components/Logo";
import BackButton from "../Components/BackButton";
import { justExport } from "../Components/ExportData";


export default function WorkoutHome() {

  const navigation = useNavigation();



  
  return (
    <View style={styles.container}>
      <RPELogo />
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.settingsContainer}>
        <Text style={{ fontSize: 20, color: "white" }}>View Workouts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
        <Ionicons name="settings-sharp" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sportsContainer}>
          
            <View style={styles.column}>
              <View style={styles.item}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RPEWorkouts')} >
                
                      <Text style={styles.overlayText}>RPE Workouts</Text>
                   
                  
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.item}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RPEWorkouts')} >
                
                      <Text style={styles.overlayText}>Momentary RPE Workouts</Text>
                   
                  
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.item}>
                <TouchableOpacity style={styles.button} onPress={() => justExport()} >
                
                      <Text style={styles.overlayText}>Export Data</Text>
                   
                  
                </TouchableOpacity>
              </View>
            </View>
            
        
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#1F283A",
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    marginTop: 100,
    padding: 20,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  sportsContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%"
  },
  
  column: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: 150,
    width: '90%',
    backgroundColor: 'rgba(27, 23, 39, 0.8)',
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    
  },

  button: {
    width: "100%"
  },
  overlayText: {
    color: '#EDF2F4',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center"
  },
  
});

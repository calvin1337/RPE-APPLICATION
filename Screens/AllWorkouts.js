import React from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../Components/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';



export default function MyWorkouts(){
  const navigation = useNavigation();
  return(
    <View style={styles.container}>
    <BackButton onPress={() => navigation.goBack()} />
    <View style={styles.settingsContainer}>
    <Text style={{ fontSize: 20, color: "white" }}>My Workouts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
        <Ionicons name="settings-sharp" size={32} color="white" />
      </TouchableOpacity>
    </View>
    <ScrollView style={styles.scrollView}>
      <View style={styles.workoutContainer}>
      <View style={[styles.column, styles.infoColumn]}><Text style={styles.text}>Date</Text></View>
      <View style={[styles.column, styles.infoColumn]}><Text style={styles.text}>Workout</Text></View>
      <View style={[styles.column, styles.infoColumn]}><Text style={styles.text}>RPE</Text></View>
      <View style={[styles.column, styles.iconColumn]}>
        <TouchableOpacity >
          <Ionicons name="trash" size={32} color="white" />
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
    
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F283A',
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    marginTop: 100,
    padding: 20,
  },
  text: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  workoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  column: {
    height: 50, 
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoColumn: {
    flex: 2,
    marginRight: 5,
  },
  iconColumn: {
    flex: 1,
    marginRight: 5, 
  },
  text: {
    color: '#FFFFFF',
  },

});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import { RPELogo } from '../Components/Logo';

export default function Settings() {
  const navigation = useNavigation();

  const navigateToRPE = () => {
    navigation.navigate('RPE');
  };

  const navigateToWhenTrackWorkout = () => {
    navigation.navigate('WhenTrackWorkout');
  };

  const navigateToWhoAccessMyData = () => {
    navigation.navigate('WhoAccessMyData');
  };

  const navigateToUserToCoach = () => {
    navigation.navigate('UserToCoach');
  };

  const navigateToSafelyStoreData = () => {
    navigation.navigate('SafelyStoreData');
  };

  return (
    <View style={styles.container}>
      <RPELogo/>
      <BackButton onPress={() => navigation.goBack()} />

      <View style={styles.settingsContainer}>
        <Text style={{ fontSize: 20, color: "white" }}>Settings</Text>
       
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.usersContainer}>
          <View style={styles.itemContainer}>
          <TouchableOpacity onPress={navigateToRPE}>
            <View >
              <Text style={styles.text}>What is RPE? </Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
          <TouchableOpacity onPress={navigateToWhenTrackWorkout}>
            <View >
              <Text style={styles.text}>When should I use the app to track my workout?</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
          <TouchableOpacity onPress={navigateToWhoAccessMyData}>
            <View >
              <Text style={styles.text}>Who can access my data ?</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
          <TouchableOpacity onPress={navigateToUserToCoach}>
            <View >
              <Text style={styles.text}>How do I change from user to coach?</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
          <TouchableOpacity onPress={navigateToSafelyStoreData}>
            <View >
              <Text style={styles.text}>How can I safely store my data?</Text>
            </View>
          </TouchableOpacity>
          </View>


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
    padding: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%"
  },
  usersContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 100,
    paddingTop: 10,
    width: "100%"
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#2B2D42",
    borderRadius: 15,
    marginBottom: 25,
    height: 70,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 4,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});

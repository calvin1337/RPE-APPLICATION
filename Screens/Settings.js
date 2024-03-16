import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';

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

  const navigateToFAQ = () => {
    navigation.navigate('FAQ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, color: "white", paddingLeft: 50 }}>Setting</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.usersContainer}>
          <TouchableOpacity onPress={navigateToRPE}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>What is RPE? </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={navigateToWhenTrackWorkout}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>When should I use the app to track my workout?</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={navigateToWhoAccessMyData}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Who can access my data ?</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={navigateToUserToCoach}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>How do I change from user to coach?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToFAQ}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>How can I safely store my data?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToFAQ}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Can I delete my account?</Text>
            </View>
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
    paddingTop: 80,
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
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

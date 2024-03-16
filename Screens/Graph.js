import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToPrivacy = () => {
    navigation.navigate('Privacy');
  };

  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
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
          <TouchableOpacity onPress={navigateToProfile}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Profile</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={navigateToPrivacy}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Privacy</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={navigateToNotifications}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Notifications</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={navigateToFAQ}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>FAQ</Text>
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

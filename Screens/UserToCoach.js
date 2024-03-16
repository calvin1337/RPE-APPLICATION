import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import BackButton from "../Components/BackButton";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React,{ useState } from "react";

export default function UserToCoach() {
  const navigation = useNavigation();

  const navigateToSettings = () => {
    // Navigate to the Settings screen
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, color: "white", paddingLeft: 50 }}>How do I change from user to coach?</Text>
        <TouchableOpacity onPress={navigateToSettings}>
          <Ionicons name="settings-sharp" size={32} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.usersContainer}>
          
            <View style={styles.itemContainer}>
            <View style={[styles.column, { alignItems: "center" }]}>
            <Text style={[styles.text]}>Coaches will change their account type in their profile. This will be for
                    verification purposes and to ensure data is not easily accessed by those who
                    should not see it.


                    </Text>
                     </View>
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will add space between the items horizontally
    maxWidth: 400,
  },  
  column: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 15,
  },
});
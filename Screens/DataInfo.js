import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Button, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RPELogo } from '../Components/Logo';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton';




export default function DataUsage() {

  const navigation = useNavigation();

  

  return (
    <View style={styles.container}>
      <RPELogo />
      <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.settingsContainer}>
          <Text style={{ fontSize: 20, color: "white" }}>Data Usage Information</Text>
            <Text style={{ fontSize: 20, color: "white" }}></Text>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
              <Ionicons name="settings-sharp" size={32} color="white" />
            </TouchableOpacity>
          </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <View style={styles.infoContainer}>
  <Text style={styles.infoTitle}>Data Usage</Text>
  <Text style={styles.infoText}>
    We take your privacy seriously. This application collects and stores only
    necessary data required for its functionality.
  </Text>
  <Text style={styles.infoText}>
    Any data collected is used solely for the purpose of improving user
    experience and is never shared with third parties.
  </Text>
  <Text style={styles.infoText}>
    Your data is securely stored and encrypted to ensure its confidentiality.
  </Text>
</View>
<View style={styles.infoContainer}>
  <Text style={styles.infoTitle}>About Us</Text>
  <Text style={styles.infoText}>
    This application was developed by students at Edinburgh Napier University.
  </Text>
  <Text style={styles.infoText}>
    We are committed to delivering a seamless and enjoyable user experience.
  </Text>
  <Text style={styles.infoText}>
    If you have any concerns or questions about your data, please feel free to
    reach out to us.
  </Text>
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
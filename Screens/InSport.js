import { View, Text, StyleSheet, ScrollView } from "react-native";
import BackButton from "../Components/BackButton";
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import TimePicker from "../Components/TimePicker";

export default function InSport({navigation, route}) {
  const { selectedSport } = route.params;
  return (
    <View style={styles.container}>
      
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
       <View style={styles.settingsContainer}>
        <Text style={{ fontSize: 20, color: "white" }}>{selectedSport}</Text>
        <Ionicons name="settings-sharp" size={32} color="white" />
      </View>
      <View style={styles.RPEcontainer}>
      <View style={styles.row}>
        <Text style={styles.text}>0. Rest</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>1. Very Very Easy</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>2. Easy</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>3. Moderate</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>4. Somewhat Hard</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>5. Hard</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>6. - </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>7. Very Hard</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>8. - </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>9. - </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>10. Maximal</Text>
      </View>

    </View>
    <View style={styles.inputContainer}>
      <TimePicker />
    </View>
    <View style={styles.inputContainer}>
    <Text style={styles.text}>Workout: {selectedSport}</Text>
    </View>
    </ScrollView>
    </View>
  )
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
  },
  RPEcontainer: {
    padding: 20,
    margin:25,
    backgroundColor: '#1B1727',
    borderRadius: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  text:{
    color: '#FFFFFF'
  }, 
  inputContainer: {
    padding: 20,
    margin:25,
    backgroundColor: '#1B1727',
    borderRadius: 15,
    textAlign: 'center'
  },
  scrollView: {
    height: "100%",
    marginBottom: 50,
  }
})
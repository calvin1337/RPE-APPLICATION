import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React,{ useState } from "react";
import { RPELogo } from "../Components/Logo";


export default function Home() {

  const navigation = useNavigation();



  return (
    <View style={styles.container}>
      <RPELogo />
      <View style={styles.settingsContainer}>
        <Text style={{ fontSize: 20, color: "white" }}>Select An Option</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
        <Ionicons name="settings-sharp" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sportsContainer}>
          <View style={styles.row}>
            <View style={styles.item}>
              <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
              <ImageBackground
                  source={{ uri: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }} 
                  style={styles.item}
                  imageStyle={styles.itemImage}
                >
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>Session RPE</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <TouchableOpacity onPress={() => navigation.navigate('MRPE')} >   
              <ImageBackground
                  source={{ uri: "https://blog.nasm.org/hubfs/rpe-scale.jpg" }} 
                  style={styles.item}
                  imageStyle={styles.itemImage}
                >   
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>Momentary RPE</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
          <View style={styles.item}>
              <TouchableOpacity onPress={() => navigation.navigate('WorkoutHome')} >
              <ImageBackground
                  source={{ uri: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} 
                  style={styles.item}
                  imageStyle={styles.itemImage}
                >
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>Workout History</Text>
                  </View>
                  </ImageBackground>
              </TouchableOpacity>
            </View> 
            <View style={styles.item}>
              <TouchableOpacity  >
              <ImageBackground
                  source={{ uri: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} 
                  style={styles.item}
                  imageStyle={styles.itemImage}
                >
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>Coach</Text>
                  </View>
                  </ImageBackground>
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
    // borderWidth: 1,
    // borderColor: 'white',
    // borderRadius: 5,
    paddingBottom: 100,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  item: {
    width: 150,
    height: 250,
    backgroundColor: "#2B2D42",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  itemText: {
    color: "white",
    fontSize: 16,
  },
  itemImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(43, 45, 66, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  overlayText: {
    color: '#EDF2F4',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

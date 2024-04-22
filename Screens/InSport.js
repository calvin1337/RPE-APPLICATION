import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, Modal, Alert } from 'react-native';
import BackButton from '../Components/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';
import { db,FIREBASE_AUTH  } from '../firebase';
import { RPELogo } from '../Components/Logo';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.8; 

export default function InSport({ navigation, route }) {
  const { selectedSport } = route.params;
  const [selectedRPE, setSelectedRPE] = useState(5);
  const [selectedTime, setSelectedTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleInfoClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRPESelection = (value) => {
    setSelectedRPE(value === selectedRPE ? null : value);
  };



  const renderRPEButton = (value, label) => {
    return (
      <TouchableOpacity
        key={value}
        style={[styles.row, selectedRPE === value && styles.selected]}
        onPress={() => handleRPESelection(value)}
      >
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  };


  const addWorkout = async () => {
    try {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (!currentUser) {
            console.log('User not authenticated');
            return;
        }

        const userId = currentUser.uid;

        const workoutTime = parseInt(selectedTime);
        if (isNaN(workoutTime) || workoutTime <= 0) {
            console.log('Invalid workout time');
            return;
        }

        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString();


        const workoutData = {
            sport: selectedSport,
            RPE: selectedRPE,
            time: workoutTime,
            date: date,
            time: time,
            load: (selectedRPE * workoutTime)
        };

        const userDocRef = doc(db, 'Users', userId)
        const workoutsCollectionRef = collection(userDocRef, 'Workouts');
        await addDoc(workoutsCollectionRef, workoutData); 

        Alert.alert(
          'Workout Added',
          'Your workout entry has been successfully added!',
          [
              { 
                text: 'OK',
                onPress: () => {
                  setSelectedTime('');
                }
              }
          ]
        ); 
    } catch (error) {
        console.error('Error adding workout: ', error);
    }
};


  



  return (
    <View style={styles.container}>
      <RPELogo />
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.settingsContainer}>
        <Text style={{ fontSize: 20, color: "white" }}>Add RPE</Text>
        <TouchableOpacity onPress={handleInfoClick}>
        <Ionicons name="information-circle" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View style={styles.RPEcontainer}>
        <Text style={{ fontSize: 16, color: "white", textAlign: 'center',borderBottomWidth: 1, borderBottomColor: "white", marginBottom: 5  }}>Rating: Perceived Exertion Level</Text>
          {renderRPEButton(1, '1. Rest')}
          {renderRPEButton(2, '2. Minimal Exertion')}
          {renderRPEButton(3, '3. Very Light Exertion')}
          {renderRPEButton(4, '4. Light Exertion')}
          {renderRPEButton(5, '5. Moderate Exertion')}
          {renderRPEButton(6, '6. Moderate to Hard Exertion')}
          {renderRPEButton(7, '7. Hard Exertion')}
          {renderRPEButton(8, '8. Very Hard Exertion')}
          {renderRPEButton(9, '9. Very, Very Hard Exertion')}
          {renderRPEButton(10, '10. Maximal Exertion')}
        </View>
        <Text style={styles.label}>Enter your workout time in minutes</Text>
        <View style={styles.inputContainer}>
          
          <TextInput
            style={[styles.input, { width: buttonWidth }]}
            value={selectedTime}
            onChangeText={setSelectedTime}
            placeholder="Enter workout time"
            keyboardType="numeric"
            placeholderTextColor="#EDF2F4"
          />
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button,{ width: buttonWidth },{backgroundColor:'#66AEC5'} ]} onPress={addWorkout} >
        
            <Text style={styles.buttonText}>Add workout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{ width: buttonWidth },{backgroundColor:'#66AEC5'} ]} onPress={() => navigation.navigate("RPEWorkouts")}>
        
            <Text style={styles.buttonText}>Edit workouts</Text> 
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>RPE Information</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
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
  RPEcontainer: {
    padding: 20,
    margin: 25,
    backgroundColor: '#1B1727',
    borderRadius: 15,
    flex:1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 10,
  },
  selected: {
    backgroundColor: '#66AEC5', 
  },
  text: {
    color: '#FFFFFF',
  },
  inputContainer: {
    padding: 20,
    margin: 25,
    backgroundColor: '#1B1727',
    borderRadius: 15,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#030303', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    color: "#EDF2F4",
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: '#1B1727',
    borderRadius: 15, 
    padding: 10,
    fontSize: 16,
    height: 50,
    color: '#EDF2F4',
    backgroundColor: "#1B1727",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
  },
  
});


import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import BackButton from '../Components/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';
import { db, FIREBASE_AUTH } from '../firebase';
import { RPELogo } from '../Components/Logo';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.8;

export default function MomentaryRPE({ navigation }) {
  const [selectedRPE, setSelectedRPE] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeEntries, setTimeEntries] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const handleInfoClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRPESelection = (value) => {
    setSelectedRPE(value === selectedRPE ? null : value);
  };

  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  const resumeStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
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

  const addTimeEntry = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const formattedTime = `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;
    setTimeEntries([...timeEntries, formattedTime]);
  };

  return (
    <View style={styles.container}>
      <RPELogo />
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.settingsContainer}>
        <Text style={{ fontSize: 20, color: "white" }}>Track Momentary RPE</Text>
        <TouchableOpacity onPress={handleInfoClick}>
          <Ionicons name="information-circle" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.header}>Begin Workout</Text>
        <Text style={styles.timeText}>{time}s</Text>
        <View style={styles.timerButtonContainer}>
          {running ? (
            <TouchableOpacity
              style={[styles.timerButton, styles.pauseButton]}
              onPress={pauseStopwatch}
            >
              <Text style={styles.timerButtonText}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.timerButton, styles.startButton]}
                onPress={startStopwatch}
              >
                <Text style={styles.timerButtonText}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timerButton, styles.resetButton]}
                onPress={resetStopwatch}
              >
                <Text style={styles.timerButtonText}>Reset</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View style={styles.workoutContainer}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Time</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>RPE</Text>
            </View>
          </View>
          {timeEntries.map((entry, index) => (
            <View style={styles.row} key={index}>
              <View style={styles.column}>
                <Text style={styles.text}>{entry}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>{selectedRPE}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.RPEcontainer}>
          <Text style={{ fontSize: 16, color: "white", textAlign: 'center', borderBottomWidth: 1, borderBottomColor: "white", marginBottom: 5 }}>Rating: Perceived Exertion Level</Text>
          {renderRPEButton(6, ' 6. No Exertion At All')}
          {renderRPEButton(7, ' 7. Minimal Exertion')}
          {renderRPEButton(8, ' 8. ')}
          {renderRPEButton(9, ' 9. ')}
          {renderRPEButton(10, '10. ')}
          {renderRPEButton(11, '11. ')}
          {renderRPEButton(12, '12. ')}
          {renderRPEButton(13, '13. ')}
          {renderRPEButton(14, '14. ')}
          {renderRPEButton(15, '15. ')}
          {renderRPEButton(16, '16. ')}
          {renderRPEButton(17, '17. ')}
          {renderRPEButton(18, '18. ')}
          {renderRPEButton(19, '19. Almost Maximal Exertion')}
          {renderRPEButton(20, '20. Maximal Exertion')}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { width: buttonWidth }, { backgroundColor: '#66AEC5' }]}
            onPress={addTimeEntry}
          >
            <Text style={styles.buttonText}>Add Time Entry</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth }, { backgroundColor: '#50C878' }]}>
            <Text style={styles.buttonText}>Finish Workout</Text>
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
            <Text style={styles.modalText}>Momentary RPE Information</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga consequatur incidunt mollitia ut accusantium necessitatibus corrupti voluptates reiciendis veniam blanditiis, nulla velit labore similique quas inventore. Ipsam ullam modi culpa officia, ducimus quos, error esse numquam amet est nulla id.
            </Text>
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
  timerContainer: {
    alignItems: 'center', 
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
  header: { 
    fontSize: 30, 
    color: "white", 
    marginBottom: 10, 
}, 
timeText: { 
    fontSize: 48, 
    color: "white"
}, 
timerButtonContainer: { 
    flexDirection: 'row', 
    marginTop: 20, 
    marginBottom: 20
}, 
timerButton: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 5, 
}, 
startButton: { 
    backgroundColor: '#2ecc71', 
    marginRight: 10, 
}, 
resetButton: { 
    backgroundColor: '#e74c3c', 
    marginRight: 10, 
}, 
pauseButton: { 
    backgroundColor: '#f39c12', 
}, 
resumeButton: { 
    backgroundColor: '#3498db', 
}, 
timerButtonText: { 
    color: 'white', 
    fontSize: 16, 
}, 
workoutContainer: {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  margin: 25,
  backgroundColor: '#1B1727',
  borderRadius: 15,
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10, 
},
column: {
  flex: 1,
  marginHorizontal: 5,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
},


});


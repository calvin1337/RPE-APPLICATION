import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, Alert } from 'react-native';
import BackButton from '../Components/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, collection, addDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, FIREBASE_AUTH } from '../firebase';
import { RPELogo } from '../Components/Logo';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.8;

export default function MomentaryRPE({ navigation }) {
  const [selectedRPE, setSelectedRPE] = useState(6);
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
      const elapsedTimeInSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTime(elapsedTimeInSeconds);
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
    setTimeEntries([])
  };


  const renderRPEButton = (value, label) => {
    return (
      <View>
      <TouchableOpacity
        key={value}
        style={[styles.row, selectedRPE === value && styles.selected]}
        onPress={() => handleRPESelection(value)}
      >
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
      </View>
    );
  };
    

  const addTimeEntry = () => {
      const currentDate = new Date();
      const actualTime = currentDate.toLocaleTimeString();
      let startTime
      let workoutTime
      let interval
      if (timeEntries.length === 0) {
          workoutTime = time;
          startTime = time
          interval = 1
      } else {
          const previousEntry = timeEntries[timeEntries.length - 1]
          startTime = time
          workoutTime = time - previousEntry.startTime 
          interval = previousEntry.interval + 1
      }
      const hours = Math.floor(workoutTime / 3600);
      const minutes = Math.floor((workoutTime % 3600) / 60);
      const seconds = workoutTime % 60;
      const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
      
      setTimeEntries([...timeEntries, { workoutTime: workoutTime, rpe: selectedRPE, actualTime: actualTime, startTime: startTime, interval: interval, formattedWorkoutTime: formattedTime  }]);
  };
  
  const handleFinishWorkout = () => {
    Alert.alert(
        'Finish Workout',
        'Are you sure you want to finish your workout?',
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Finish',
                onPress: () => {
                    addWorkout()
                }
            }
        ]
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

      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      const totalLength = `${hours}h ${minutes}m ${seconds}s`;


      const workoutData = {
        date: date,
        workout: timeEntries,
        totalLength: totalLength
      }

      const userDocRef = doc(db, 'Users', userId)
      const workoutsCollectionRef = collection(userDocRef, 'MomentaryWorkouts');
      
      const docRef = await addDoc(workoutsCollectionRef, workoutData);

      const workoutId = docRef.id;
      await updateDoc(docRef, { id: workoutId });
      
      
      Alert.alert(
        'Workout Added',
        'Your workout entry has been successfully added!',
        [
            { 
              text: 'OK',
              onPress: () => {
                resetStopwatch()
              }
            }
        ]
      );
      
  } catch (error) {
      console.error('Error adding workout: ', error);
  }
  }


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
        <Text style={styles.timeText}>
          {time >= 3600 ? `${Math.floor(time / 3600)}h ` : ''}
          {time >= 60 ? `${Math.floor((time % 3600) / 60)}m ` : ''}
          {`${time % 60}s`}
        </Text>
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
              <Text style={styles.entryText}>Interval</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.entryText}>Time of Entry</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.entryText}>Workout Length</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.entryText}>RPE</Text>
            </View>
          </View>
          {timeEntries.map((entry, index) => (
            <View style={styles.row} key={index}>
              <View style={styles.column}>
                <Text style={styles.entryText}>{entry.interval}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.entryText}>{entry.actualTime}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.entryText}>
                <Text style={styles.entryText}>
                  {entry.workoutTime >= 3600 ? `${Math.floor(entry.workoutTime / 3600)}h ` : ''}
                  {entry.workoutTime >= 60 ? `${Math.floor((entry.workoutTime % 3600) / 60)}m ` : ''}
                  {`${entry.workoutTime % 60}s`}
                </Text>
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.entryText}>{entry.rpe}</Text>
              </View>
            </View>
          ))}
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
        <TouchableOpacity 
          style={[styles.button, { width: buttonWidth }, { backgroundColor: '#50C878' }, timeEntries.length === 0 && styles.disabledButton]} 
          onPress={handleFinishWorkout} 
          disabled={timeEntries.length === 0}>
          <Text style={styles.buttonText}>{timeEntries.length === 0 ? "No Workout" : "Finish Workout"}</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.RPEcontainer}>
          {/* <Text style={{ fontSize: 16, color: "white", textAlign: 'center', borderBottomWidth: 1, borderBottomColor: "white", marginBottom: 5 }}>Rating: Perceived Exertion Level</Text> */}
          {renderRPEButton(6, '6. No Exertion At All')}
          {renderRPEButton(7, '7. Minimal Exertion')}
          {renderRPEButton(8, '8. Minimal Effort')}
          {renderRPEButton(9, '9. Very Light')}
          {renderRPEButton(10, '10. Light')}
          {renderRPEButton(11, '11. Fairly Light')}
          {renderRPEButton(12, '12. Moderate')}
          {renderRPEButton(13, '13. Somewhat Hard')}
          {renderRPEButton(14, '14. Hard')}
          {renderRPEButton(15, '15. Hard (Heavy)')}
          {renderRPEButton(16, '16. Very Hard')}
          {renderRPEButton(17, '17. Very Hard (Very Heavy)')}
          {renderRPEButton(18, '18. Extremely Hard')}
          {renderRPEButton(19, '19. Almost Maximal Exertion')}
          {renderRPEButton(20, '20. Maximal Exertion')}
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
          <Text style={styles.modalHeader}>
              Borg RPE Scale Timer
          </Text>
          <Text style={styles.modalText}>
          1. Select RPE: Begin by selecting the perceived exertion level (RPE) for your momentary assessment. Tap on the buttons representing different RPE levels ranging from 6 (no exertion) to 20 (maximal exertion).

          </Text>
          <Text style={styles.modalText}>
          2. Track Time: As you perform your activity, start the stopwatch by tapping the "Start" button. The timer will begin counting the duration of your workout session. If you need to pause the stopwatch, tap the "Pause" button.

          </Text>
          <Text style={styles.modalText}>
          3. Record Entries: After each interval of your workout, tap the "Add Time Entry" button to record your RPE along with the time elapsed since the last entry. This helps in tracking your exertion levels throughout the session.

          </Text>
          <Text style={styles.modalText}>
          4. Finish Workout: Once you've completed your workout, tap the "Finish Workout" button. Confirm your action, and the app will save your workout data, including RPE levels and workout durations, for future reference.

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
    height:"100%",
    paddingHorizontal: 10,
  },
  selected: {
    backgroundColor: '#66AEC5', 
  },
  text: {
    color: '#FFFFFF',
    width: "100%",
    fontSize: 20,
    margin:5
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
    color: 'white', 
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

disabledButton: {
  opacity: 0.5,
},
entryText:{
  color: "white",
  textAlign: "center"
},
modalHeader: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
modalText: {
  fontSize: 16,
  marginBottom: 5,
},


});


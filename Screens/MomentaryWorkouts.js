import React, {useState, useEffect} from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../Components/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { db, FIREBASE_AUTH } from '../firebase';
import { doc, onSnapshot} from 'firebase/firestore';
import { RPELogo } from '../Components/Logo';




export default function MomentaryWorkouts(){

  const navigation = useNavigation();
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (!currentUser) {
          console.log('User not authenticated');
          return;
        }
        const userId = currentUser.uid;
        const userDocRef = doc(db, 'Users', userId);
        const workoutsRef = collection(userDocRef, 'MomentaryWorkouts');
        const unsubscribe = onSnapshot(workoutsRef, (snapshot) => {
          const workoutsData = snapshot.docs.map((doc) => doc.data());
          const formattedData = workoutsData
          .map(workout => {
              const [day, month, year] = workout.date.split('/');
              const workoutDate = new Date(`${year}-${month}-${day}`);
              return { ...workout };
          })
          .sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('/');
            const [dayB, monthB, yearB] = b.date.split('/');
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateB - dateA;
        })
          console.log(formattedData)
          setWorkouts(formattedData);
          
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching workouts: ', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDeleteButton = (index) => {
    console.log(index)
  }

  const handleWorkoutPress = (workoutIndex) => {
    if (expandedWorkout === workoutIndex) {
      setExpandedWorkout(null); 
    } else {
      setExpandedWorkout(workoutIndex);
    }
  };

  return(
    <View style={styles.container}>
      <RPELogo />
    <BackButton onPress={() => navigation.goBack()} />
    <View style={styles.settingsContainer}>
    <Text style={{ fontSize: 20, color: "white" }}>Momentary RPE Workouts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
        <Ionicons name="settings-sharp" size={32} color="white" />
      </TouchableOpacity>
    </View>
    
      <View style={styles.workoutContainer}>
      <View style={[styles.column, styles.infoColumn]}><Text style={styles.headerText}>Date Of Workout</Text></View>
      
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <View>
        {workouts.map((workout, index) => (
          <View key={index}>
          <View style={[styles.workoutHeaderRow]} >
            <TouchableOpacity style={styles.infoColumn} onPress={() => handleWorkoutPress(index)}>
              <Text style={styles.text}>{workout.date}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleWorkoutPress(index)}>
              <Ionicons name={expandedWorkout === index ? 'arrow-up-circle' : 'arrow-down-circle'} size={32} color="white" />
            </TouchableOpacity>
          </View>
            {expandedWorkout === index && (
              <View style={styles.expandedWorkoutContainer}>
                <View style={[styles.expandedWorkoutRow, styles.expandedHeaderRow]}>
              <View style={styles.column}>
                <Text style={styles.expandedText}>Interval</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.expandedText}>Time of Entry</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.expandedText}>Workout Length</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.expandedText}>RPE</Text>
              </View>
              </View>
               {workout.workout.map((entry, index) => (
                <View key={index} style={styles.expandedWorkoutRow}>
                  <View style={styles.column}>
                    <Text style={styles.expandedText}>{entry.interval}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.expandedText}>{entry.actualTime} </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.expandedText}>{entry.workoutTime}s</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.expandedText}>{entry.rpe}</Text>
                  </View>
                  
                </View>
                
              ))}
              <TouchableOpacity style={styles.buttonContainer} onPress={() => handleDeleteButton(workouts)}>
              <Text style={[styles.button, {backgroundColor:'#e74c3c'}]}>Delete Entry</Text>
              </TouchableOpacity>
            </View>
            
            )}
          </View>
        ))}
      </View>
      
    </ScrollView>
    
  </View>
  )
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
  text: {
    color: '#FFFFFF',
    fontSize: 16
  },
  scrollView: {
    flex: 1,
    
  },
  workoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#66AEC5'
  },
  column: {
    height: 50, 
    justifyContent: 'center',
    flex: 1,
    margin: 5,
  },
  infoColumn: {
    flex: 2,
    marginRight: 5,
  },
  iconColumn: {
    flex: 1,
    marginRight: 5, 
    
  },
  headerText: {
    color: '#FFFFFF',
    
    fontSize: 16
  },
  rowsContainer: {
    marginTop: 10,
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },

 expandedWorkoutRow: {
  flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
 },
  expandedWorkoutContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(27, 23, 39, 0.8)',
    
  },
  expandedText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  

});
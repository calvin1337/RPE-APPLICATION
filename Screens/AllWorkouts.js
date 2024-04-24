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




export default function MyWorkouts(){

  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState([]);

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
        const workoutsRef = collection(userDocRef, 'Workouts');

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
          setWorkouts(formattedData);
          
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching workouts: ', error);
      }
    };

    fetchWorkouts();
  }, []);

  return(
    <View style={styles.container}>
      <RPELogo />
    <BackButton onPress={() => navigation.goBack()} />
    <View style={styles.settingsContainer}>
    <Text style={{ fontSize: 20, color: "white" }}>Session RPE Workouts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
        <Ionicons name="settings-sharp" size={32} color="white" />
      </TouchableOpacity>
    </View>
    
      <View style={styles.workoutContainer}>
      <View style={[styles.column, styles.infoColumn]}><Text style={styles.headerText}>Date</Text></View>
      <View style={[styles.column, styles.infoColumn]}><Text style={styles.headerText}>Workout</Text></View>
      <View style={[styles.column, styles.infoColumn]}><Text style={styles.headerText}>RPE</Text></View>
      <View style={[styles.column, styles.iconColumn]}>
      <View style={[styles.column, styles.infoColumn]}><Text style={styles.headerText}>Delete</Text></View>

      </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <View style={styles.rowsContainer}>
    {workouts.map((workout, index) => (
      <View key={index} style={styles.workoutRow}>
        <View style={[styles.column, styles.infoColumn]}>
          <Text style={styles.text}>{workout.date}</Text>
        </View>
        <View style={[styles.column, styles.infoColumn]}>
          <Text style={styles.text}>{workout.sport}</Text>
        </View>
        <View style={[styles.column, styles.infoColumn]}>
          <Text style={styles.text}>{workout.RPE}</Text>
        </View>
        <View style={[styles.column, styles.iconColumn]}>
          <TouchableOpacity>
            <Ionicons name="trash" size={32} color="white" />
          </TouchableOpacity>
        </View>
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
    alignItems: 'center'
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
    
  },
  rowsContainer: {
    marginTop: 10,
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },

});
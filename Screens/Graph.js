import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { db, FIREBASE_AUTH } from '../firebase';
import { doc, query, getDocs, collection, onSnapshot } from 'firebase/firestore';



const { width } = Dimensions.get('window');
const buttonWidth = width * 0.5;




export default function AnalyticsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('Daily'); // Initialize with Daily
 // Initialize with Weekly
  const navigation = useNavigation();

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
          setWorkouts(workoutsData);
          console.log(workoutsData); // Log the updated workouts data
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching workouts: ', error);
      }
    };

    fetchWorkouts();
  }, []);

  const prepareChartData = () => {
    let filteredWorkouts = [...workouts];
    switch (selectedDuration) {
      case 'Weekly':
        filteredWorkouts = filterWorkoutsByWeeks(1);
        break;
      case 'Bi-Weekly':
        filteredWorkouts = filterWorkoutsByWeeks(2);
        break;
      case 'Monthly':
        filteredWorkouts = filterWorkoutsByWeeks(4);
        break;
      default:
        filteredWorkouts = [...workouts];
    }
  
    // Aggregate workouts by day
    const aggregatedWorkouts = {};
    filteredWorkouts.forEach(workout => {
      const date = workout.date;
      if (aggregatedWorkouts[date]) {
        aggregatedWorkouts[date] += workout.load;
      } else {
        aggregatedWorkouts[date] = workout.load;
      }
    });
  
    // Extract aggregated data for chart
    const labels = Object.keys(aggregatedWorkouts); 
    const data = Object.values(aggregatedWorkouts); 
    const colors = data.map(value => value > 1 ? `rgba(255, 0, 0, 0.8)` : `rgba(0, 122, 255, 0.5)`); // Different color for multiple workouts on the same day
    
    return {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
      }],
    };
  };
  

  const filterWorkoutsByWeeks = (weeks) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
    return workouts.filter((workout) => new Date(workout.date) >= startDate);
  };

  // Function to handle duration selection
  const selectDuration = (duration) => {
    setSelectedDuration(duration);
  };
  // Function to calculate total sum of loads
  const calculateTotalSum = () => {
    return workouts.reduce((total, workout) => total + workout.load, 0);
  };

  // Function to calculate average load
  const calculateAverage = () => {
    const totalSum = calculateTotalSum();
    const average = totalSum / workouts.length;
    return average.toFixed(2); // Round to 2 decimal points
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>Stats:</Text>
          <Text style={styles.text}>Weekly</Text>
          <Text style={styles.text}>Total Sum: {calculateTotalSum()}</Text>
          <Text style={styles.text}>Average: {calculateAverage()}</Text>
          <Text style={styles.text}>Sessions: {workouts.length}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.heading}>Graph Timescale:</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={() => selectDuration('Daily')}>
              <Text style={styles.buttonText}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectDuration('Weekly')}>
              <Text style={styles.buttonText}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectDuration('Bi-Weekly')}>
              <Text style={styles.buttonText}>Bi-Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectDuration('Monthly')}>
              <Text style={styles.buttonText}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal>
          <View style={styles.graph}>
            <BarChart
              data={prepareChartData()}
              width={width*1.2}
              marginVertical={40}
              height={400}
              chartConfig={{
                backgroundGradientFrom: 'rgba(27, 23, 39, 0.8)',
                backgroundGradientTo: 'rgba(27, 23, 39, 0.8)',
                barPercentage: 0.8,
                fillShadowGradient: `rgba(1, 122, 205, 1)`,
                fillShadowGradientOpacity: 1,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
                
              }}
              style={styles.chart}
              verticalLabelRotation={60}
              withInnerLines={false}
              showBarTops={true}
              showValuesOnTopOfBars={true}
            />
          </View>
        </ScrollView>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 45, 66, 0.7)',
    
  },
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 10,
    padding:20
  },
  box: {
    width: width*.9,
    backgroundColor: 'rgba(27, 23, 39, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 5,
  },
  graph: {
    
    //backgroundColor: 'rgba(27, 23, 39, 0.8)',
    borderRadius: 5,
    marginBottom: 10,
    
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(43, 45, 66, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%', // Adjust width to fit buttons evenly in a row
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

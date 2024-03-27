import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { db, FIREBASE_AUTH } from '../firebase';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import BackButton from "../Components/BackButton";

const { width } = Dimensions.get('window');

export default function AnalyticsPage() {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('Weekly'); // Initialize with Daily

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
    const labels = workouts.map(workout => workout.date); 
    const data = workouts.map(workout => workout.load); 
    return {
      labels,
      datasets: [{
        data,
        color: (opacity = 0.5) => `rgba(0, 122, 255, ${opacity})`, // Lighter blue color
      }],
    };
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
    <><View style={styles.backContainer}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={{ fontSize: 20, color: "white", paddingLeft: 140, paddingTop: 20 }}>Analytics</Text>

    </View>
    <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.container}>

          <View style={styles.box}>
            <Text style={styles.heading}>Stats:</Text>
            <Text style={styles.text}>{selectedDuration}</Text>
            <Text style={styles.text}>Total Sum: {calculateTotalSum()}</Text>
            <Text style={styles.text}>Average: {calculateAverage()}</Text>
            <Text style={styles.text}>Sessions: {workouts.length}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.heading}>Graph Timescale:</Text>
            <View style={styles.buttonGroup}>
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
                width={width * 1.4}
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
                  //fromZero: true, // Ensure bars start from zero
                }}
                style={styles.chart}
                verticalLabelRotation={60}
                withInnerLines={false}
                showBarTops={true}
                showValuesOnTopOfBars={true} // Display the load numbers above bars
              />
            </View>
          </ScrollView>

        </View>
      </ScrollView></>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1F283A",
  },
  backContainer: {
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    width: width * 1,
    backgroundColor: "#1F283A",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    padding:20,
    
  },
  box: {
    width: width*.9,
    backgroundColor: 'rgba(27, 23, 39, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 5,
  },
  graph: {
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


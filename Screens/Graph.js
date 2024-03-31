import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { db, FIREBASE_AUTH } from '../firebase';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import BackButton from "../Components/BackButton";
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

export default function AnalyticsPage() {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('Weekly'); // Initialize with Daily
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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

  // Function to handle start date selection
  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };
  
  // Function to handle end date selection
  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  
// Function to filter workouts based on selected date range
const filterWorkoutsByDateRange = () => {
  if (!startDate || !endDate) {

    return workouts;
  }


  const formattedWorkouts = workouts.map(workout => {
    const workoutDateParts = workout.date.split('/');
    const workoutDate = new Date(`${workoutDateParts[2]}-${workoutDateParts[0]}-${workoutDateParts[1]}`);


    const formattedDate = workoutDate.toLocaleDateString(); // Format date without timestamp
    return { ...workout, formattedDate };
  });

  const startDateParts = startDate.toLocaleDateString().split('/');
  const endDateParts = endDate.toLocaleDateString().split('/');
  const formattedStartDate = `${startDateParts[0]}/${startDateParts[1]}/${startDateParts[2]}`;
  const formattedEndDate = `${endDateParts[0]}/${endDateParts[1]}/${endDateParts[2]}`;
  const filteredWorkouts = formattedWorkouts.filter((workout) => {
    return workout.formattedDate >= formattedStartDate && workout.formattedDate < formattedEndDate;
  });

  

  return filteredWorkouts;
  
};


  
  
// Update prepareChartData function to use aggregated data
const prepareChartData = () => {
  const filteredWorkouts = filterWorkoutsByDateRange();
  if (!filteredWorkouts) return { labels: [], datasets: [{ data: [] }] }; // Return empty data if filteredWorkouts is null or undefined

  // Aggregate data based on selected duration
  const aggregatedData = filteredWorkouts.reduce((acc, workout) => {
    const date = workout.date;
    const load = workout.load;

    if (!acc[date]) {
      acc[date] = load; // If date does not exist in accumulator, add it
    } else {
      acc[date] += load; // If date exists in accumulator, add load to existing value
    }

    return acc;
  }, {});

  // Sort aggregated data by date and select the last 7 entries
  const sortedData = Object.entries(aggregatedData)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .slice(-7);

  const labels = sortedData.map(([date]) => date);
  const data = sortedData.map(([_, load]) => load);

  return {
    labels,
    datasets: [{
      data,
      color: (opacity = 0.5) => `rgba(0, 122, 255, ${opacity})`, // Lighter blue color
    }],
  };
};


  const selectDuration = (duration) => {
    setSelectedDuration(duration);
  
    // Calculate start and end dates based on the selected duration
    const today = new Date();
    let newStartDate = new Date();
    let newEndDate = new Date();
  
    if (duration === 'Weekly') {
      newStartDate.setDate(today.getDate() - 7); // Start date is 7 days before today
    } else if (duration === 'Bi-Weekly') {
      newStartDate.setDate(today.getDate() - 14); // Start date is 14 days before today
    } else if (duration === 'Monthly') {
      newStartDate.setMonth(today.getMonth() - 1); // Start date is 1 month before today
    }
  
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };
 

  // Function to calculate total sum of loads based on selected duration
const calculateTotalSum = (duration) => {
  const filteredWorkouts = filterWorkoutsByDateRange(duration);
  return filteredWorkouts.reduce((total, workout) => total + workout.load, 0);
};

// Function to calculate average load based on selected duration
const calculateAverage = (duration) => {
  const filteredWorkouts = filterWorkoutsByDateRange (duration);
  const totalSum = filteredWorkouts.reduce((total, workout) => total + workout.load, 0);
  return (totalSum / filteredWorkouts.length).toFixed(2);
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
            <Text style={styles.text}>Total Sum: {calculateTotalSum(selectedDuration)}</Text>
            <Text style={styles.text}>Average: {calculateAverage(selectedDuration)}</Text>
            <Text style={styles.text}>Sessions: {filterWorkoutsByDateRange().length}</Text>

          </View>


          <View style={styles.box}>
            <Text style={styles.heading}>Graph Timescale:</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => selectDuration('Weekly')}>
                <Text style={styles.buttonText}>Past Week</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => selectDuration('Bi-Weekly')}>
                <Text style={styles.buttonText}>Past 2-Weeks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => selectDuration('Monthly')}>
                <Text style={styles.buttonText}>Past Month</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView horizontal>
  <View style={styles.graph}>
  {prepareChartData().labels.length > 0 ? (
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
  ) : (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No data available.</Text>
      <Text style={styles.noDataText}>Please add workouts or change date selection</Text>
    </View>  )}
</View>

            </ScrollView>
            <View style={styles.datePickerContainer}>
            <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.datePickerButtonText}>{startDate ? startDate.toDateString() : 'Select start date'} - </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate ? startDate : new Date()}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}
            <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.datePickerButtonText}>{endDate ? endDate.toDateString() : 'Select end date'}</Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate ? endDate : new Date()}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}
          </View>
          

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
  noDataContainer: {
    alignItems: 'center',
  },
  noDataText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  
  datePickerButtonText:{
    color: 'white',
  },
});


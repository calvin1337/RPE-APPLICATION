import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { db, FIREBASE_AUTH } from '../firebase';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RPELogo } from '../Components/Logo';
import { Spinner } from '../Components/Spinner';

const { width } = Dimensions.get('window');

export default function AnalyticsPage() {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('Weekly'); 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [filteredWorkouts, setFilteredWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [barWidth, setBarWidth] = useState(0)


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
          
          
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching workouts: ', error);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    graphData();
  }, [workouts])

    const graphData = () => {
    let startDate, endDate;
    const currentDate = new Date();
    startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 7); 
    endDate = new Date(currentDate);
    console.log(startDate, endDate)
    filterWorkoutsByDate(startDate, endDate);
    }
    
  

    const filterWorkoutsByDate = (startDate, endDate) => {
      
      const filteredDates = workouts
          .filter(workout => {
              // Split the date string into day, month, and year
              const [day, month, year] = workout.date.split('/');
              // Construct a Date object with the year, month, and day in the correct order
              const workoutDate = new Date(`${year}-${month}-${day}`);
              console.log(workoutDate)
              return workoutDate >= startDate && workoutDate <= endDate;
          }).sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('/');
            const [dayB, monthB, yearB] = b.date.split('/');
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateA - dateB;
        })
          .map(workout => ({ date: workout.date, load: workout.load }));
      
          

      const data = {
        labels: filteredDates.map(workout => workout.date),
        datasets: [
            {
                data: filteredDates.map(workout => workout.load),
                color: (opacity = 0.5) => `rgba(0, 122, 255, ${opacity})`
            },
        ],
    };
      setFilteredWorkouts(data)
      const width = calculateChartWidth(data); 
      setBarWidth(width)
      
      setIsLoading(false);
      
  };

  const calculateChartWidth = (data) => {
    const barWidth = 10 ; // Adjust the width of each bar as needed
    const numDataPoints = data.labels.length;
    const screenWidth = Dimensions.get('window').width;
    const maxChartWidth = screenWidth * 0.9; // Maximum 90% of screen width
    const calculatedWidth = Math.max(numDataPoints * barWidth, maxChartWidth);
    return calculatedWidth;
  };
  
  const handleDateChange = (timescale) => {
    let startDate, endDate;

    // Get current date
    const currentDate = new Date();

    // Calculate start and end dates based on the selected timescale
    switch (timescale) {
        case "week":
            startDate = new Date(currentDate);
            startDate.setDate(startDate.getDate() - 7); // Subtract 7 days from current date
            endDate = new Date(currentDate);
            break;
        case "2-weeks":
            startDate = new Date(currentDate);
            startDate.setDate(startDate.getDate() - 14); // Subtract 14 days from current date
            endDate = new Date(currentDate);
            break;
        case "month":
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()); // Subtract 1 month from current date
            endDate = new Date(currentDate);
            break;
        default:
            // Handle default case
            break;
    }

    // Call your function to filter workouts by date with startDate and endDate
    filterWorkoutsByDate(startDate, endDate);
};
  
 
 

  return (
    <View style={styles.container}>
      <RPELogo />
      <View style={styles.settingsContainer}>
        <Text style={{ fontSize: 20, color: "white" }}>Analytics</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
        <Ionicons name="settings-sharp" size={32} color="white" />
        </TouchableOpacity>
      </View>
    
    

        


         

          {isLoading ? (
      <Spinner /> // Render the spinner if isLoading is true
    ) : (
      // Your component content when data is not loading
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.graphContainer}>
        <View style={styles.box}>
            <Text style={styles.heading}>Graph Timescale</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => handleDateChange("week")}>
                <Text style={styles.buttonText}>Past Week</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDateChange("2-weeks")}>
                <Text style={styles.buttonText}>Past 2-Weeks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDateChange("month")}>
                <Text style={styles.buttonText}>Past Month</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={styles.graph}>
              {filteredWorkouts.labels.length > 0 ? (
                <BarChart
                data={filteredWorkouts}
                width={barWidth} // Set the width dynamically
                height={450}
                chartConfig={{
                  backgroundGradientFrom: 'rgba(27, 23, 39, 0.8)',
                  backgroundGradientTo: 'rgba(27, 23, 39, 0.8)',
                  barPercentage: 0.2, // Adjusted bar width
                  fillShadowGradient: `rgba(1, 122, 205, 1)`,
                  fillShadowGradientOpacity: 1,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(1, 122, 205, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                style={styles.chart}
                verticalLabelRotation={90}
                withInnerLines={false}
                showBarTops={true}
                showValuesOnTopOfBars={true}
              />
              ) : (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No data available.</Text>
                  <Text style={styles.noDataText}>Please add workouts or change date selection</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    )}
       
          

        </View>
      
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    paddingBottom: 70,
    margin: 10
  },
  backContainer: {
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    width: width * 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#1F283A",
  },
  box: {
    width: width*.9,
    backgroundColor: 'rgba(27, 23, 39, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 5,
    alignItems: 'center',
  },
  graph: {
    marginTop: 10,
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
    borderRadius: 5,
    marginBottom: 10,
    margin: 5,
    alignItems: 'center',
    padding: 10,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
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
  settingsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    marginTop: 100,
    padding: 20,
    
  },
  graphContainer: {
    flex: 1,
    backgroundColor: 'rgba(27, 23, 39, 1)',
    borderRadius: 16,

  }
});


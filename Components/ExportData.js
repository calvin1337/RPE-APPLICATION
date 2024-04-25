import React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { FIREBASE_AUTH, db } from '../firebase';

// Function to fetch workouts data
const fetchWorkoutsData = async () => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser;
    const workoutsRef = collection(db, 'Users', currentUser.uid, 'Workouts');
    const workoutsSnapshot = await getDocs(workoutsRef);
    return workoutsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
// Session Convert 
const convertToCSV = (data) => {
  // Reorder the columns and remove "load" property
  const reorderedData = data.map(item => ({
    date: item.date,
    time: item.time,
    sport: item.sport,
    RPE: item.RPE
  }));

  const csvHeader = 'Date, Time, Sport, RPE\n';
  const csvData = reorderedData.map(item => Object.values(item).join(',')).join('\n');
  return csvHeader + csvData
};

const fetchMomentaryData = async () => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser;
    const workoutsRef = collection(db, 'Users', currentUser.uid, 'MomentaryWorkouts');
    const workoutsSnapshot = await getDocs(workoutsRef);
    return workoutsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Momentary Convert
const convertMomentaryToCSV = (data) => {
  const reorderedData = data.map(item => ({
    date: item.date,
    workouts: item.workout.map(workout => ({
      rpe: workout.rpe,
      interval: workout.interval,
      workoutTime: workout.workoutTime,
      actualTime: workout.actualTime
    }))
  }));
  
  // Create CSV header
  const csvHeader = 'Interval,Time of Entry, Workout Length(s), RPE\n';
  
  // Create CSV rows
  const csvRows = reorderedData.map(item => {
    const { date, workouts } = item;
    const dateRow = `Date,${date}\n`; // Date row
    const workoutRows = workouts.map(workout => `${workout.interval},${workout.actualTime}, ${workout.workoutTime}, ${workout.rpe}`).join('\n'); // Workouts rows
    return `${dateRow}${csvHeader}${workoutRows}\n`; 
  });
  
  // Combine all rows into CSV data
  const csvData = csvRows.join('\n');

  return csvData
};


// Function to export data to CSV file
const exportDataToCSV = async (data) => {
  try {
    const csv = convertToCSV(data);
    const fileUri = FileSystem.cacheDirectory + 'workouts.csv';
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
    return fileUri;
  } catch (error) {
    console.error('Error exporting data to CSV:', error);
    return null;
  }
};

const exportMomentaryDataToCSV = async (data) => {
  try {
    const csv = convertMomentaryToCSV(data);
    const fileUri = FileSystem.cacheDirectory + 'momentary-workouts.csv';
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
    return fileUri;
  } catch (error) {
    console.error('Error exporting data to CSV:', error);
    return null;
  }
}

// Function to share CSV file
const shareCSVFile = async (fileUri) => {
  try {
    await Sharing.shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Save CSV file' });
  } catch (error) {
    console.error('Error sharing CSV file:', error);
  }
};

const filterData = async (fetchedData) => {
  const formattedData = fetchedData
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
        return dateA - dateB;
    })

  return formattedData
} 

export const justExport = async () => {
  const fetchedData = await fetchWorkoutsData();

  const formatData = await filterData(fetchedData);

  // Export data to CSV file
  const csvFileUri = await exportDataToCSV(formatData);

  if (csvFileUri) {
    shareCSVFile(csvFileUri);
  }
}

export const exportMomentary = async () => {
  const fetchedData = await fetchMomentaryData();

  const formatData = await filterData(fetchedData)

  const csvFileUri = await exportMomentaryDataToCSV(formatData);

  if (csvFileUri) {
    shareCSVFile(csvFileUri);
  }
}

const ExportButton = ({width}) => {
  const handleExport = async () => {
    // Fetch workouts data
    const fetchedData = await fetchWorkoutsData();

    const formatData = await filterData(fetchedData);

    // Export data to CSV file
    const csvFileUri = await exportDataToCSV(formatData);

    // Share CSV file
    if (csvFileUri) {
      shareCSVFile(csvFileUri);
    }
  };

  return (<TouchableOpacity style={[styles.button,{ width: width },{backgroundColor:'#66AEC5'} ]} onPress={handleExport}>
    <Text style={styles.buttonText}>Export Data</Text>
  </TouchableOpacity>)
};


const styles = StyleSheet.create({ 
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,  
  },
  buttonText: {
    color: '#030303', 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExportButton;
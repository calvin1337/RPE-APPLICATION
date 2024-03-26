import React from 'react';
import { Button } from 'react-native';
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

const convertToCSV = (data) => {
  // Reorder the columns and remove "load" property
  const reorderedData = data.map(item => ({
    date: item.date,
    time: item.time,
    sport: item.sport,
    RPE: item.RPE
  }));

  const csvHeader = Object.keys(reorderedData[0]).join(',') + '\n';
  const csvData = reorderedData.map(item => Object.values(item).join(',')).join('\n');
  return csvHeader + csvData;
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

// Function to share CSV file
const shareCSVFile = async (fileUri) => {
  try {
    await Sharing.shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Save CSV file' });
  } catch (error) {
    console.error('Error sharing CSV file:', error);
  }
};

const ExportButton = () => {
  const handleExport = async () => {
    // Fetch workouts data
    const fetchedData = await fetchWorkoutsData();

    // Export data to CSV file
    const csvFileUri = await exportDataToCSV(fetchedData);

    // Share CSV file
    if (csvFileUri) {
      shareCSVFile(csvFileUri);
    }
  };

  return <Button title="Export Data" onPress={handleExport} />;
};

export default ExportButton;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BackButton from '../Components/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import TimePicker from '../Components/TimePicker';

export default function InSport({ navigation, route }) {
  const { selectedSport } = route.params;
  const [selectedRPE, setSelectedRPE] = useState(null);

  const handleRPESelection = (value) => {
    setSelectedRPE(value === selectedRPE ? null : value);
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

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.settingsContainer}>
          <Text style={{ fontSize: 20, color: 'white' }}>{selectedSport}</Text>
          <Ionicons name="settings-sharp" size={32} color="white" />
        </View>
        <View style={styles.RPEcontainer}>
          {renderRPEButton(0, '0. Rest')}
          {renderRPEButton(1, '1. Very Very Easy')}
          {renderRPEButton(2, '2. Easy')}
          {renderRPEButton(3, '3. Moderate')}
          {renderRPEButton(4, '4. Somewhat Hard')}
          {renderRPEButton(5, '5. Hard')}
          {renderRPEButton(6, '6. -')}
          {renderRPEButton(7, '7. Very Hard')}
          {renderRPEButton(8, '8. -')}
          {renderRPEButton(9, '9. -')}
          {renderRPEButton(10, '10. Maximal')}
        </View>
        <View style={styles.inputContainer}>
          <TimePicker />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Workout: {selectedSport}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#1F283A',
  },
  settingsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
    marginTop: 100,
    padding: 20,
  },
  RPEcontainer: {
    padding: 20,
    margin: 25,
    backgroundColor: '#1B1727',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
  selected: {
    backgroundColor: '#FFA07A', // Pastel orange
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
  scrollView: {
    height: '100%',
    marginBottom: 50,
  },
});

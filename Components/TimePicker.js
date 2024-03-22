import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const TimePicker = ({setSelectedTime}) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  useEffect(() => {
    if (selectedHour !== null && selectedMinute !== null) {
      const time = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
      setSelectedTime(time);

    }
  }, [selectedHour, selectedMinute]);

  const hours = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i,
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i,
  }));

  return (
    
    <View style={styles.inputContainer}>
      <Text style={styles.text}>Time: </Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select Hour', value: null}}
          items={hours}
          onValueChange={(value) => setSelectedHour(value)}
          style={pickerSelectStyles}
          value={selectedHour}
        />
        {selectedHour !== null && (
          <Text style={styles.selectedValuesText}>
            {selectedHour.toString().padStart(2, '0')}h
          </Text>
        )}
        <Text style={styles.colon}>:</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select Minute', value: null }}
          items={minutes}
          onValueChange={(value) => setSelectedMinute(value)}
          style={pickerSelectStyles}
          value={selectedMinute}
        />
        {selectedMinute !== null && (
          <Text style={styles.selectedValuesText}>
            {selectedMinute.toString().padStart(2, '0')} m
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color:'#FFFFFF'
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color:'#FFFFFF',
    
  },
  colon: {
    fontSize: 18,
    marginHorizontal: 5,
    color:'#FFFFFF'
  },
  selectedValuesText: {
    fontSize: 18,
    marginHorizontal: 5,
    color: '#FFFFFF'
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingRight: 30, 
    marginRight: 10,
    color: '#FFFFFF',
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    color:'#FFFFFF',
    borderRadius: 8,
    paddingRight: 30, 
    marginRight: 10,
    color: '#FFFFFF', 
  },
  
});

export default TimePicker;
